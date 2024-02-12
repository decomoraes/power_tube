import {makeAutoObservable} from "mobx";
import {Institution, InstitutionUnit} from "../domains/institution";
import {makePersistable} from "mobx-persist-store";

export class InstitutionStore {
    public institution: Institution = {};
    public units: InstitutionUnit[] = [];
    public test: string = "test";

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: "institutions", properties: ["institution", "units"], storage: window.localStorage });
    }

    // public setLoggedInStatus(changeFlag: boolean) {
    //     this.isLoggedIn = changeFlag;
    // }
    // public setLoggedInUser(username: string) {
    //     this.loggedInUser = username;
    // }
}