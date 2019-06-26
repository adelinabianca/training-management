import { observable, action } from 'mobx';

class DrawerStore {

    @observable
    adminDrawerOpen = false;

    @observable
    trainerDrawerOpen = false;

    @observable
    participantDrawerOpen = false;

    @action 
    setAdminDrawerOpen = (value) => {
        this.adminDrawerOpen = value;
    }

    @action 
    setTrainerDrawerOpen = (value) => {
        this.trainerDrawerOpen = value;
    }

    @action 
    setParticipantDrawerOpen = (value) => {
        this.participantDrawerOpen = value;
    }

    @action
    setAllDrawers = (value) => {
        this.adminDrawerOpen = value;
        this.trainerDrawerOpen = value;
        this.participantDrawerOpen = value;
    }

}

export default new DrawerStore();