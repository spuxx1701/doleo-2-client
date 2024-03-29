import Cookie from 'ember-simple-auth/session-stores/cookie';

export default class ApplicationSessionStore extends Cookie {
  cookieName = 'doleo-session';
  cookieExpirationTime = 14 * 24 * 60 * 60;
  sameSite = 'strict';
}
