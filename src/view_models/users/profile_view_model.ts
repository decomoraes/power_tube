// region imports
import {makeAutoObservable} from "mobx";
import {Classroom} from "../../domains/classroom";
import {Grade} from "../../domains/grade";
import {User} from "../../domains/user";
import updateUser, {updateUserPhoto} from "../../api/user";
import Store from "../../store";
// endregion

// region ProfileViewModel
export default class ProfileViewModel {
    // region properties
    public grade: Grade | null = null;
    public classrooms: Classroom[] = [];
    public loading: boolean = true;
    public count: number = 0;
    public showModal: boolean = false;
    public user: User = {};
    public files: File[] = [];
    private searchParams: URLSearchParams;
    public store: Store;
    // endregion

    // region constructor
    /**
     * @param store - Gobal store
     * @param {string} searchParams - The search params used to get the id of the grade
     */
    constructor(
        store: Store,
        searchParams: URLSearchParams,
    ) {
        makeAutoObservable(this, {}, { deep: false, autoBind: true });
        this.store = store;
        this.searchParams = searchParams;
        this.user = this.store.userStore.user;
        // this.fetchGradesData().then(r => {});
    }
    // endregion

    // region methods

    // region onSubmit
    async onSubmit() {
        if (!this.user || !this.store.authStore.token) return;
        const response = await updateUser(this.user, this.store.authStore.token)
        if (response.status >= 300) {
            return alert(response.message ?? "");
        }
        alert("Dados atualizados com sucesso")
        if (response.payload) this.store.userStore.user = response.payload;
    }
    // endregion

    // region OnPictureSubmit
    async onPictureSubmit() {
        if (!this.user || !this.store.authStore.token) return;
        const response = await updateUserPhoto(this.files[0], this.store.authStore.token);
        alert("Foto atualizada com sucesso");
        if (response.payload) this.store.userStore.user = response.payload;
        // @ts-ignore
        // setFile(URL.createObjectURL(e.target.files[0]));
        this.closeModal();
    }
    // endregion

    // region setUser
    private async setUser(userStore: User | undefined) {
        this.user = {
            id: userStore?.id || "",
            address: userStore?.address || "",
            birthdate: userStore?.birthdate || "",
            city: userStore?.city || "",
            country: userStore?.country || "",
            email: userStore?.email || "",
            idDocumentNumber: userStore?.idDocumentNumber || "",
            name: userStore?.name || "",
            phone: userStore?.phone || "",
            photo: userStore?.photo || "",
            postalCode: userStore?.postalCode || "",
            state: userStore?.state || "",
            username: userStore?.username || "",
        }
    }
    // endregion

    // region openModal
    /** This method is used to open the modal, it sets the showModal property to true
    * @returns void */
    public openModal(): void {
        this.showModal = true;
    }
    // endregion

    // region closeModal
    /** This method is used to close the modal, it sets the showModal property to false
    * @returns void */
    public closeModal(): void {
        this.showModal = false;
    }
    // endregion

    // endregion
}
// endregion