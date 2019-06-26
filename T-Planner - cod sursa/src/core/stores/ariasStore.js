import { observable, action } from 'mobx';

class AriasStore {

    @observable
    allArias = [];

    @observable
    selectedAria = null;

    @action 
    setAllArias = (arias) => {
        this.allArias = arias;
    }

    @action
    setSelectedAria = (aria) => {
        this.selectedAria = aria;
    }

    @action 
    addNewAria = (newAria) => {
        this.allArias = [...this.allArias, newAria];
    }

}

export default new AriasStore();