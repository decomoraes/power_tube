import { createContext } from "react";
import { AuthStore } from "./auth_store";
import { InstitutionStore } from "./institution_store";
import { UserStore } from "./user_store";
import { EnrollmentsStore } from "./enrollments_store";
import { SettingsStore } from "./settings_store";
import { makeAutoObservable } from "mobx";

class Store {
  public authStore: AuthStore = new AuthStore();
  public institutionStore: InstitutionStore = new InstitutionStore();
  public userStore: UserStore = new UserStore();
  public enrollmentsStore: EnrollmentsStore = new EnrollmentsStore();
  public settingsStore: SettingsStore = new SettingsStore();

  constructor() {
    makeAutoObservable(this);
  }
}

export default Store;

export const StoreContext = createContext(new Store());
