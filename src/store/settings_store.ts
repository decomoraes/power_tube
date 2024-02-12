import {makeAutoObservable} from "mobx";
import {makePersistable} from "mobx-persist-store";
import {ItnLanguage} from "../utils/itn";

export class SettingsStore {
    theme: string | undefined;
    language: ItnLanguage | undefined;
    focusMode: boolean = false;
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: "settings", properties: ["theme", "language"], storage: window.localStorage });
    }
}