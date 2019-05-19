/* eslint-disable */
import { observable, action } from 'mobx';

class UserStore {

    @observable
    authenticatedUser = null;

    @action 
    setAuthenticatedUser = (authUser) => {
        this.authenticatedUser = authUser;
    }

    @action 
    logout = () => {
        this.authenticatedUser = null;
    }

}

export default new UserStore();