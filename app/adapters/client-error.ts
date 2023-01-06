import ApplicationAdapter from './application';
import ENV from 'doleo-2-client/config/environment';

export default class ClientErrorAdapter extends ApplicationAdapter {
  host = ENV.apiUrl;
  namespace = 'telemetry';
}
