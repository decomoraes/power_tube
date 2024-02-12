import {makeAutoObservable} from "mobx";
import { makePersistable } from 'mobx-persist-store';


export class AuthStore {
    token: string | undefined;
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: "auth", properties: ["token"], storage: window.localStorage });
    }
}