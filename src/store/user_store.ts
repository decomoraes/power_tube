import {makeAutoObservable} from "mobx";
import {User} from "../domains/user";
import {makePersistable} from "mobx-persist-store";

export class UserStore {
    public user: User = {};

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: "users", properties: ["user"], storage: window.localStorage });
    }
}