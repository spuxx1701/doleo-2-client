import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CustomStore extends Store {
  @service declare notifications: any;

  queue: any[] = [];
  @tracked hasUnsyncedChanges: boolean = false;
  @tracked syncInterval: number | undefined;

  initialize() {
    const that = this;
    window.onbeforeunload = function () {
      if (that.hasUnsyncedChanges) {
        return 'Du hast ungespeicherte Änderungen. Wenn Du jetzt die Seite verlässt, wirst Du diese verlieren. Möchtest Du fortfahren?';
      } else {
        return null;
      }
    };
  }

  async trySave(record: any) {
    try {
      await record.save();
      // throw new Error('Network request failed');
    } catch (error: any) {
      if (error.message === 'Network request failed') {
        this.addToQueue(record);
      } else {
        throw error;
      }
    }
  }

  addToQueue(record: any) {
    this.queue.push(record);
    if (this.queue.length === 1) {
      this.notifications.warning('Keine Verbindung. Verwende Offline-Modus.');
      this.startSyncInterval();
    }
  }

  @action async tryProcessQueue() {
    this.queue.forEach(async (record, index) => {
      console.log(record);
      try {
        await record.save();
        this.queue.splice(index, 1);
      } catch (error: any) {
        if (error.message === 'Network request failed') {
          return;
        } else {
          throw error;
        }
      }
    });
    if (this.queue.length === 0) {
      this.notifications.success('Synchronisierung abgeschlossen.');
      this.stopSyncInterval();
    }
  }

  @action startSyncInterval() {
    this.hasUnsyncedChanges = true;
    this.syncInterval = window.setInterval(this.tryProcessQueue, 5000);
  }

  @action stopSyncInterval() {
    window.clearInterval(this.syncInterval);
    this.hasUnsyncedChanges = false;
    this.syncInterval = undefined;
  }
}
