import Service from '@ember/service';

export default class ManagerService extends Service {
  constructor() {
    super(...arguments);
  }

  initialize() {
    this.applyDesign();
    this.enableCursorRippleEffect();
  }

  /**
   * (Re-)applies the active design.
   */
  private applyDesign() {
    let design = 1;
    // Ember.set(that.session.data.authenticated.user, "selectedDesign", value);
    // if (typeof this.session?.user?.design === 'number') {
    //   design = this.session.user.design;
    // }
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
  }

  /**
   * Enables the ripple effect when the use clicks or taps somewhere on the viewport.
   */
  private enableCursorRippleEffect() {
    document.onclick = () => this.applyCursorRippleEffect(event);
  }

  /**
   * Applies a ripple effect when the user clicks or taps somewhere on the viewport.
   * @param event The event object.
   */
  private applyCursorRippleEffect(event: any) {
    const ripple = document.createElement('div');

    ripple.className = 'ripple';
    document.body.appendChild(ripple);

    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;

    ripple.style.animation = 'ripple-effect .4s  linear';
    ripple.onanimationend = () => document.body.removeChild(ripple);
  }
}
