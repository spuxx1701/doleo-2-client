import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import Ember from 'ember';
import ENV from 'doleo-2-client/config/environment';
import LocalDataService from './local-data';

export interface Message {
  text: string;
  date?: Date;
  dateLocal?: string;
  level?: 'verbose' | 'info' | 'success' | 'warn' | 'error';
  stack?: string;
}

export default class ErrorHandlerService extends Service {
  @service declare localData: LocalDataService;

  @action initialize() {
    Ember.onerror = this.handleEmberError;
  }

  @action handleEmberError(error: Error) {
    if (this.localData.getEnabledTelemetry()) {
      fetch(`${ENV.apiUrl}/telemetry/client-errors`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
        }),
      });
    }
  }
}
