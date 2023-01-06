import { Router } from '@ember/routing';
import Service, { inject as service } from '@ember/service';
import AccountService from './account';
import CustomStore from './custom-store';
import ErrorHandlerService from './error-handler';

export default class ManagerService extends Service {
  @service declare errorHandler: ErrorHandlerService;
  @service declare router: Router;
  @service declare session: any;
  @service declare account: AccountService;
  @service declare store: CustomStore;
  @service declare notifications: any;

  async initialize() {
    await this.errorHandler.initialize();
    this.applyDesign();
    this.enableCursorRippleEffect();
    this.store.initialize();
    try {
      await this.session.setup();
    } catch (error: any) {
      this.router.transitionTo('login');
    }
  }

  goTo(path: string) {
    this.router.transitionTo(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /**
   * (Re-)applies the active design.
   */
  public applyDesign() {
    const design = this.account.account?.selectedDesign || 0;
    const root = document.querySelector(':root') as any;
    const rootStyle = getComputedStyle(root);
    let color: 'pink' | 'blue' | 'green' | 'yellow';
    switch (design) {
      case 1:
        color = 'blue';
        break;
      case 2:
        color = 'green';
        break;
      case 3:
        color = 'yellow';
        break;
      default:
        color = 'pink';
    }
    const suffixes = ['bright', 'medium', 'dark'];
    for (const suffix of suffixes) {
      (root.style as any).setProperty(
        `--color-${suffix}`,
        rootStyle.getPropertyValue(`--${color}-${suffix}`)
      );
    }
    return color;
  }

  /**
   * Enables the ripple effect when the use clicks or taps somewhere on the viewport.
   */
  private enableCursorRippleEffect() {
    document.onclick = (event) => this.applyCursorRippleEffect(event);
  }

  /**
   * Applies a ripple effect when the user clicks or taps somewhere on the viewport.
   * @param event The event object.
   */
  private applyCursorRippleEffect(event: MouseEvent) {
    const ripple = document.createElement('div');

    ripple.className = 'ripple';
    document.body.appendChild(ripple);

    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;

    ripple.style.animation = 'ripple-effect 500ms linear';
    ripple.onanimationend = () => document.body.removeChild(ripple);
  }

  public showLoadBubble() {
    const loadBubble = this.findLoadBubble();
    loadBubble.classList.add('load-bubble-expanded');
  }

  public hideLoadBubble() {
    const loadBubble = this.findLoadBubble();
    loadBubble.classList.remove('load-bubble-expanded');
  }

  public getLoadBubbleAnimationLength() {
    const string = getComputedStyle(document.documentElement).getPropertyValue(
      '--load-bubble-anim-length'
    );
    return parseInt(string.replace(/\D/g, ''));
  }

  private findLoadBubble() {
    const loadBubble = document.getElementById('load-bubble');
    if (!loadBubble) {
      throw new Error('Unable to find load bubble.');
    }
    return loadBubble;
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
