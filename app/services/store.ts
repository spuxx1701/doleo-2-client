import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ManagerService from './manager';

export default class CustomStore extends Store {
  @service declare manager: ManagerService;
  @service declare notifications: any;

  queue: any[] = [];
  @tracked isSyncing: boolean = false;
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
    this.hasUnsyncedChanges = true;
    try {
      await record.save();
      if (this.queue.length === 0) this.hasUnsyncedChanges = false;
    } catch (error: any) {
      if (error.message === 'Network request failed') {
        this.addToQueue(record);
      } else {
        throw error;
      }
    }
  }

  async sync() {
    this.isSyncing = true;
    try {
      await this.tryProcessQueue();
    } catch (error) {
      this.notifications.error('Synchronisation fehlgeschlagen.');
    }
    this.isSyncing = false;
  }

  private addToQueue(record: any) {
    if (!this.queue.find(() => record)) this.queue.push(record);
    if (this.queue.length >= 1) {
      this.startSyncInterval();
    }
  }

  @action private async tryProcessQueue() {
    if (this.queue.length === 0) return;
    for (let i = 0; i < this.queue.length; i++) {
      const record = this.queue[i];
      try {
        await record.save();
        this.queue.splice(i, 1);
        i--;
      } catch (error: any) {
        if (error.message === 'Network request failed') {
          break;
        } else {
          throw error;
        }
      }
    }
    if (this.queue.length === 0) {
      this.stopSyncInterval();
    }
  }

  @action private startSyncInterval() {
    this.hasUnsyncedChanges = true;
    if (this.syncInterval === undefined) {
      this.syncInterval = window.setInterval(this.tryProcessQueue, 5000);
      this.notifications.warning('Keine Verbindung. Verwende Offline-Modus.');
    }
  }

  @action private stopSyncInterval() {
    if (this.syncInterval !== undefined) {
      window.clearInterval(this.syncInterval);
      this.hasUnsyncedChanges = false;
      this.syncInterval = undefined;
      this.notifications.success('Synchronisierung abgeschlossen.');
    }
  }
}
