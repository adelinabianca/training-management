import { observable, action } from 'mobx';

class SessionStore {
  @observable 
  authUser = null;

  @action 
  setAuthUser = authUser => {
    this.authUser = authUser;
  };
}

export default new SessionStore();