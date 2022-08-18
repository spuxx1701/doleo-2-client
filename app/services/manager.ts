import Service from '@ember/service';

export default class ManagerService extends Service {
  constructor() {
    super(...arguments);
  }

  /**
   * Enables the ripple effect when the use clicks or taps somewhere on the viewport.
   */
  enableCursorRippleEffect() {
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
