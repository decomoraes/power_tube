// region imports
import { makeAutoObservable, runInAction } from "mobx";
import { Classroom } from "../../domains/classroom";
import { Grade } from "../../domains/grade";
import { Subject } from "../../domains/subject";
import { InstitutionUnit } from "../../domains/institution";
import girlImage1 from "../../assets/images/girl_1.webp";
import girlImage2 from "../../assets/images/girl_2.webp";
import girlImage3 from "../../assets/images/girl_3.webp";
import girlImage4 from "../../assets/images/girl_4.webp";
import girlImage5 from "../../assets/images/girl_5.webp";
import getInstitution from "../../api/institution";
import { signIn } from "../../api/sign_in";
import Store from "../../store";
// endregion


// region SignInViewModel
export default class SignInViewModel {
  // region properties
  public email: string = "";
  public password: string = "";
  public unitSelected: InstitutionUnit | undefined;
  public grades: Grade[] = [];
  public subjects: Subject[] = [];
  public classrooms: Classroom[] = [];
  public loading: boolean = true;
  public pathname: string | undefined;
  private searchParams: URLSearchParams = new URLSearchParams();
  private images: string[] = [girlImage1, girlImage2, girlImage3, girlImage4, girlImage5];
  public image: string | undefined;
  public store: Store = new Store();
  public notification: (notification: string, status: "error" | "success" | "info" | "warning") => any = () => { };
  // endregion

  // region constructor
  constructor() {
    makeAutoObservable(this);
  }
  // endregion

  // region onInitialized
  onInitialized(
    store: Store,
    pathname: string | undefined,
    searchParams: URLSearchParams,
  ) {
    this.store = store;
    this.pathname = pathname;
    this.searchParams = searchParams;
    this.image = this.images[Math.floor(Math.random() * this.images.length)];
    this.fetchInstitution().then(r => { });
  }
  // endregion

  // region fetchInstitution
  async fetchInstitution() {
    this.loading = true;
    const response = await getInstitution(this.pathname ?? "");

    runInAction(() => {
      if (response.status > 300 || response.payload === undefined) return;
      this.store.institutionStore.institution = response.payload.institution;
      this.store.institutionStore.units = response.payload.units;
      // this.unitSelected = this.store.institutionStore.units[0];
      // this.setUser?.({})
      this.unitSelected = response.payload.units[0];
      console.log("unitSelected", this.unitSelected.name);
    })
    // this.toast.notify("Instituição carregada com sucesso", "success");
  }
  // endregion

  // region signIn
  async onSignIn() {
    const response = await signIn(this.email ?? "", this.password ?? "")
    if (response.status >= 300 || response.payload === undefined) {
      return this.notification(response.message ?? "error", "error");
    }

    if (response.payload !== undefined) this.store.userStore.user = response.payload;
    this.store.authStore.token = response.message;
  }
  // endregion

    // region validate email and password
    get submitButtonDisabled(): boolean {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return !(regex.test(this.email) && this.email.length > 0 && this.password.length >= 8);
    }
    // endregion
}
// endregion
