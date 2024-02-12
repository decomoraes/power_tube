import {makeAutoObservable} from "mobx";
import {Enrollment} from "../domains/enrollment";
import {makePersistable} from "mobx-persist-store";

export class EnrollmentsStore {
    public enrollments: Enrollment[] = [];

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: "enrollments", properties: ["enrollments"], storage: window.localStorage });
    }
}