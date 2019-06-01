import { observable, action } from 'mobx';

class CoursesStore {

    @observable
    allCourses = [];

    @observable
    selectedCourse = null;

    @action 
    setAllCouses = (courses) => {
        this.allCourses = courses;
    }

    @action
    setSelectedCourse = (course) => {
        this.selectedCourse = course;
    }

    @action 
    addNewCourse = (newCourse) => {
        this.allCourses = [...this.allCourses, newCourse];
    }

}

export default new CoursesStore();