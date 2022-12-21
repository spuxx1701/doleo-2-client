import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import ENV from 'doleo-2-client/config/environment';
import ManagerService from './manager';
import { clean, valid, gt } from 'semver';
import NewsFeedService from './news-feed';

export interface LocalData {
  latestEncounteredVersion: string;
}

export default class LocalDataService extends Service {
  @service declare manager: ManagerService;
  @service declare newsFeed: NewsFeedService;

  getUnencounteredVersion(): string | undefined {
    const encounteredVersion =
      localStorage.getItem('doleo-encounteredVersion') || '';
    if (
      !valid(encounteredVersion) ||
      gt(
        clean(ENV.APP['version'] as string) as string,
        clean(encounteredVersion) as string
      )
    ) {
      return clean(ENV.APP['version'] as string) as string;
    }
    return undefined;
  }

  @action setEncounteredVersion() {
    localStorage.setItem(
      'doleo-encounteredVersion',
      (ENV.APP['version'] as string) || ''
    );
    this.newsFeed.newVersion = undefined;
    this.newsFeed.update();
  }
}
