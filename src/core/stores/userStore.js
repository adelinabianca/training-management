/* eslint-disable */
import { observable, action } from 'mobx';

class UserStore {

    // @observable
    authenticatedUser = null;

    // @action.bound 
    setAuthenticatedUser = (authUser) => {
        this.authenticatedUser = authUser;
    }

    // @action.bound 
    logout = () => {
        this.authenticatedUser = null;
    }

}

export default new UserStore();