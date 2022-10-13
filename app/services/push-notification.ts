import Service, { service } from '@ember/service';
import ENV from 'doleo-2-client/config/environment';

export default class PushNotificationService extends Service {
  @service declare session: any;

  serviceWorkerRegistration: ServiceWorkerRegistration | undefined;
  pushSubscription: PushSubscription | undefined;

  apiEndpoint = 'pushSubscriptions';

  async initialize() {
    if (await this.checkSupportAndPermission()) {
      this.serviceWorkerRegistration = await this.registerServiceWorker();
      this.pushSubscription = await this.createSubscription(
        this.serviceWorkerRegistration
      );
      this.submitSubscription(this.pushSubscription);
    }
  }

  async registerServiceWorker() {
    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      `/service-workers/news-feed.js`
    );
    return serviceWorkerRegistration;
  }

  async createSubscription(
    serviceWorkerRegistration: ServiceWorkerRegistration
  ) {
    const activeSubscription =
      await serviceWorkerRegistration.pushManager.getSubscription();
    if (activeSubscription) await activeSubscription.unsubscribe();
    // if (activeSubscription) {
    // return activeSubscription;
    // } else {
    const publicVapidKey = ENV.APP['vapidPublicKey'] as string;
    const pushSubscription =
      await serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey),
      });
    return pushSubscription;
    // }
  }

  async submitSubscription(pushSubscription: PushSubscription) {
    if (this.session.isAuthenticated) {
      await fetch(`${ENV.apiUrl}/${this.apiEndpoint}`, {
        method: 'POST',
        body: JSON.stringify(pushSubscription),
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
        },
      });
    }
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

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
    if (!('serviceWorker' in navigator)) {
      console.warn(
        'Platform does not support service workers. Push notifications are disabled.'
      );
      return false;
    }
    if (!('PushManager' in window)) {
      console.warn(
        'Platform does not support Push API. Push notifications are disabled.'
      );
      return false;
    }
    if (!('Notification' in window)) {
      console.warn(
        'Platform does not support Web Notifications. Push notifications are disabled.'
      );
      return false;
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
