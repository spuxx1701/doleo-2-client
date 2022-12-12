import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import ENV from 'doleo-2-client/config/environment';
import ManagerService from './manager';
import { clean, valid, gt } from 'semver';
import NewsFeedService from './news-feed';

const DATA_COOKIE_NAME = 'doleo-data';

export interface LocalData {
  latestEncounteredVersion: string;
}

export default class LocalDataService extends Service {
  @service declare cookies: any;
  @service declare manager: ManagerService;
  @service declare newsFeed: NewsFeedService;

  data: LocalData = {
    latestEncounteredVersion: 'unknown',
  };

  constructor() {
    super(...arguments);
    this.read();
  }

  write(data: LocalData) {
    this.cookies.write(DATA_COOKIE_NAME, JSON.stringify(data), {
      sameSite: 'strict',
    });
  }

  read() {
    const cookie = this.cookies.read(DATA_COOKIE_NAME);
    try {
      if (cookie) {
        this.data = JSON.parse(cookie);
      } else {
        this.write(this.data);
      }
    } catch (error) {
      this.write(this.data);
    }
  }

  getUnencounteredVersion(): string | undefined {
    if (
      !valid(this.data.latestEncounteredVersion) ||
      gt(
        clean(ENV.APP['version'] as string) as string,
        clean(this.data.latestEncounteredVersion) as string
      )
    ) {
      return clean(ENV.APP['version'] as string) as string;
    }
    return undefined;
  }

  @action rememberEncounteredVersion() {
    this.write({
      ...this.data,
      latestEncounteredVersion: (ENV.APP['version'] as string) || '',
    });
    this.newsFeed.newVersion = undefined;
    this.newsFeed.update();
  }
}
