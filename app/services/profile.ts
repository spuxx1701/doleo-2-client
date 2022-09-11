import Service, { inject as service } from '@ember/service';
import Profile from 'doleo-2-client/models/profile';

export default class ProfileService extends Service {
  @service declare session: any;

  profile: Profile | undefined;

  /**
   * Initializes the profile manager and reads the profile.
   */
  async initialize() {
    // this.profile = await this.readProfile();
  }

  /**
   * Reads the profile from the API.
   */
  async readProfile() {}

  async updateProfile(updatedProfile: Profile) {}

  /**
   * Returns the ID of the currently signed in user.
   */
  get userId() {
    if (!this.session.data.authenticated) return null;
    return this.session.data.authenticated.sub;
  }

  // /**
  //  * Returns the currently signed-in user.
  //  */
  // get profile(): Profile | null {
  //   if (!this.session.data.authenticated) return null;
  //   return this.session.data.authenticated.user as Profile;
  // }

  // /**
  //  * Updates the currently signed-in user.
  //  */
  // set profile(user: Profile | null) {
  //   this.session.data.user = user;
  // }
}
