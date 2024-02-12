// region imports
import {makeAutoObservable} from "mobx";
import {Classroom} from "../../domains/classroom";
import {Grade} from "../../domains/grade";
import {User} from "../../domains/user";
import updateUser, {updateUserPhoto} from "../../api/user";
import Store from "../../store";
import { useState } from "react";
// endregion

export interface ProfileViewModel {
    grade: Grade | null;
    setGrade: (grade: Grade | null) => void;
    classrooms: Classroom[];
    setClassrooms: (classrooms: Classroom[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    count: number;
    setCount: (count: number) => void;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    user: User;
    setUser: (user: User) => void;
    files: File[];
    setFiles: (files: File[]) => void;
    searchParams: URLSearchParams | undefined;
    setSearchParams: (searchParams: URLSearchParams) => void;
    store: Store | undefined;
    setStore: (store: Store) => void;
    onInitialized: (store: Store, searchParams: URLSearchParams) => void;
    onSubmit: () => void;
    onPictureSubmit: () => void;
    setNewUser: (userStore: User | undefined) => void;
    closeModal: () => void;
    openModal: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// region ProfileViewModel
const useProfileViewModel = () => {
    // region properties
    const [grade, setGrade] = useState<Grade | null>(null);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<User>({});
    const [files, setFiles] = useState<File[]>([]);
    const [searchParams, setSearchParams] = useState<URLSearchParams>();
    const [store, setStore] = useState<Store>();
    // endregion

    // region onInitialized
    function onInitialized(
        store: Store,
        searchParams: URLSearchParams,
    ) {
        setStore(store);
        setSearchParams(searchParams);
        setUser(store.userStore.user);
        // this.fetchGradesData().then(r => {});
    }
    // endregion

    // region methods

    // region onSubmit
    async function onSubmit() {
        if (!user || !store?.authStore.token) return;
        const response = await updateUser(user, store.authStore.token)
        if (response.status >= 300) {
            return alert(response.message ?? "");
        }
        alert("Dados atualizados com sucesso")
        if (response.payload) store.userStore.user = response.payload;
    }
    // endregion

    // region OnPictureSubmit
    async function onPictureSubmit() {
        if (!user || !store?.authStore.token) return;
        const response = await updateUserPhoto(files[0], store.authStore.token);
        alert("Foto atualizada com sucesso");
        if (response.payload) store.userStore.user = response.payload;
        // @ts-ignore
        // setFile(URL.createObjectURL(e.target.files[0]));
        this.closeModal();
    }
    // endregion

    // region setNewUser
    async function setNewUser(userStore: User | undefined) {
        setUser({
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
        });
    }
    // endregion

    // region openModal
    function openModal(): void {
        setShowModal(true);
    }
    // endregion

    // region closeModal
    function closeModal(): void {
        setShowModal(false);
    }
    // endregion

    // endregion

    return {
        grade,
        setGrade,
        classrooms,
        setClassrooms,
        loading,
        setLoading,
        count,
        setCount,
        showModal,
        setShowModal,
        user,
        setUser,
        files,
        setFiles,
        searchParams,
        setSearchParams,
        store,
        setStore,
        onSubmit,
        onPictureSubmit,
        setNewUser,
        openModal,
        closeModal,
        onInitialized,
    }
}
// endregion

export default useProfileViewModel;
