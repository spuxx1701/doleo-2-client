import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import Service, { service } from '@ember/service';
import ENV from 'doleo-2-client/config/environment';
import ManagerService from './manager';
import ModalService from './modal';
import { valid, gt } from 'semver';

const DATA_COOKIE_NAME = 'doleo-data';

export interface LocalData {
  latestEncounteredVersion: string;
}

export default class LocalDataService extends Service {
  @service declare cookies: any;
  @service declare manager: ManagerService;
  @service declare modal: ModalService;
  @service declare router: RouterService;

  data: LocalData = {
    latestEncounteredVersion: '1.0.0',
  };

  initialize() {
    this.read();
    this.compareVersion();
  }

  write(data: LocalData) {
    this.cookies.write(DATA_COOKIE_NAME, JSON.stringify(data), {
      sameSite: 'strict',
    });
  }

  read() {
    const cookie = this.cookies.read(DATA_COOKIE_NAME);
    try {
      if (!cookie) {
        this.compareVersion();
        this.write(this.data);
      } else {
        this.data = JSON.parse(cookie);
      }
    } catch (error) {
      this.write(this.data);
    }
  }

  compareVersion() {
    if (
      !valid(this.data.latestEncounteredVersion) ||
      gt(ENV.APP['version'] as string, this.data.latestEncounteredVersion)
    ) {
      this.modal.confirm({
        title: 'Es gibt Neuigkeiten!',
        text: "Es hat sich etwas geändert bei Doleo! Drücke 'OK', um mehr zu erfahren und um außerdem Deinen Cache zu leeren. Das Leeren des Cache kann notwendig sein, um alle Änderungen korrekt anzuzeigen.",
        icon: 'star',
        noLabel: 'Lass mich in Ruhe!',
        onYesClick: this.showChangesAndClearCache,
      });
    }
    this.write({
      ...this.data,
      latestEncounteredVersion: (ENV.APP['version'] as string) || '',
    });
  }

  @action async showChangesAndClearCache() {
    this.modal.hide();
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(async (name) => {
          await caches.delete(name);
        });
      });
      window.location.href = window.location.href + '/about';
    }
  }
}
