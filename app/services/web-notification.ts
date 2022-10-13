import Service from '@ember/service';

export default class WebNotificationService extends Service {
  async create(title: string, message: string) {
    if (await this.checkSupportAndPermission()) {
      return new Notification(title, {
        body: message,
        icon: '/assets/favicon.ico',
      });
    } else {
      return null;
    }
  }

  async checkSupportAndPermission() {
    if (!('Notification' in window)) {
      // Browser does not support web notifications.
      return;
    }
    if (Notification.permission === 'default') {
      await this.requestPermission();
    }
    if (Notification.permission === 'granted') return true;
    return false;
  }

  async requestPermission() {
    return await Notification.requestPermission();
  }
}
