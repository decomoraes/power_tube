// region imports
import { makeAutoObservable, runInAction } from "mobx";
import { Grade } from "../../domains/grade";
import { Subject } from "../../domains/subject";
import Store from "../../store";
import { Enrollment } from "../../domains/enrollment";
import {
    CheckDiffDocumentRequestDTO, CheckDiffDocumentResponseDTO,
    DocumentRequestDTO,
    DocumentResponseDTO,
    fetchDocuments as fetchDocumentsAPI, fetchFile, FindFileRequestDTO, getDiff
} from "../../api/documents";
import { useState } from "react";
// endregion

export interface DocumentViewModel {
    selectedItem: Enrollment | undefined;
    setSelectedItem: (selectedItem: Enrollment | undefined) => void;
    documents: DocumentResponseDTO[];
    setDocuments: (documents: DocumentResponseDTO[]) => void;
    documentSelected: DocumentResponseDTO | undefined;
    setDocumentSelected: (documentSelected: DocumentResponseDTO | undefined) => void;
    documentSelectedFile: Uint8Array | undefined;
    setDocumentSelectedFile: (documentSelectedFile: Uint8Array | undefined) => void;
    documentDiffLines: CheckDiffDocumentResponseDTO[];
    setDocumentDiffLines: (documentDiffLines: CheckDiffDocumentResponseDTO[]) => void;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    showDiffLinesModal: boolean;
    setShowDiffLinesModal: (showDiffLinesModal: boolean) => void;
    grade: Grade | undefined;
    setGrade: (grade: Grade | undefined) => void;
    subject: Subject | undefined;
    setSubject: (subject: Subject | undefined) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    pathname: string | undefined;
    setPathname: (pathname: string | undefined) => void;
    searchParams: URLSearchParams;
    setSearchParams: (searchParams: URLSearchParams) => void;
    image: string | undefined;
    setImage: (image: string | undefined) => void;
    store: Store;
    setStore: (store: Store) => void;
    initialized: boolean;
    setInitialized: (initialized: boolean) => void;
    notification: (notification: string, status: "error" | "success" | "info" | "warning") => any;
    setNotification: (notification: (notification: string, status: "error" | "success" | "info" | "warning") => any) => void;
    fetchDocuments: () => Promise<void>;
    fetchDocumentById: (documentId: string) => Promise<void>;
    // fetchFile: (document: DocumentResponseDTO) => Promise<void>;
    fetchFileById: (documentId: string) => Promise<void>;
    // fetchDiff: (document: DocumentResponseDTO) => Promise<void>;
    checkDiff: (document: any) => Promise<void>;
    // checkDiffLines: (document: DocumentResponseDTO) => Promise<void>;
    // findFile: (document: DocumentResponseDTO) => Promise<void>;
    // saveDocument: (document: DocumentResponseDTO) => Promise<void>;
    // deleteDocument: (document: DocumentResponseDTO) => Promise<void>;
}

// region DocumentViewModel
const useDocumentsViewModel = (): DocumentViewModel => {
    // region properties
    const [selectedItem, setSelectedItem] = useState<Enrollment | undefined>();
    const [documents, setDocuments] = useState<DocumentResponseDTO[]>([]);
    const [documentSelected, setDocumentSelected] = useState<DocumentResponseDTO | undefined>();
    const [documentSelectedFile, setDocumentSelectedFile] = useState<Uint8Array | undefined>();
    const [documentDiffLines, setDocumentDiffLines] = useState<CheckDiffDocumentResponseDTO[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showDiffLinesModal, setShowDiffLinesModal] = useState<boolean>(false);
    const [grade, setGrade] = useState<Grade | undefined>();
    const [subject, setSubject] = useState<Subject | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [pathname, setPathname] = useState<string | undefined>();
    const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());
    const [image, setImage] = useState<string | undefined>();
    const [store, setStore] = useState<Store>(new Store());
    const [initialized, setInitialized] = useState<boolean>(false);
    const [notification, setNotification] = useState<(notification: string, status: "error" | "success" | "info" | "warning") => any>(() => {});
    // endregion

    // region onInitialized
    function onInitialized(
        store: Store,
        searchParams: URLSearchParams,
        documentId?: string,
    ) {
        setStore(store);
        setSearchParams(searchParams);

        if (documentId !== undefined) {
            fetchDocumentById(documentId).then(r => {
            });
        } else {
            fetchDocuments().then(r => {
            });
        }
    }
    // endregion

    // region fetchDocuments
    async function fetchDocuments(params?: DocumentRequestDTO) {
        const defaultParams: DocumentRequestDTO = {

        };

        const response = await fetchDocumentsAPI(params ?? defaultParams, store.authStore.token);
        console.log(response);
        if (response.status === 200 && response.payload !== undefined) {
            setDocuments(response.payload);
        }
    }
    // endregion

    // region fetchDocumentById
    async function fetchDocumentById(id: string) {
        const params: DocumentRequestDTO = {
            id: id
        };
        console.log("token", store.authStore.token)

        const response = await fetchDocumentsAPI(params, store.authStore.token);

        console.log("by Id", response)
        if (response.status === 200 && response.payload !== undefined && response.payload.length > 0) {
            setDocumentSelected(response.payload[0]);
        }

        if (documentSelected?.type === 1) {
            fetchFileById();
        }
    }
    // endregion

    // region fetchFileById
    async function fetchFileById() {
        if (documentSelected?.reference === undefined) return;

        const params: FindFileRequestDTO = {
            key: documentSelected?.reference
        };

        if (params.key === undefined) return;

        const response = await fetchFile(params, store.authStore.token);

        if (!response) return

        setDocumentSelectedFile(response);
    }
    // endregion

    // region checkDiff
    async function checkDiff(data: string) {
        const request: CheckDiffDocumentRequestDTO = {
            previous: documentSelected?.content ?? "",
            current: data
        };

        const response = await getDiff(request, store.authStore.token);
        console.log(response);
        if (response.status === 200 && response.payload !== undefined) {
            console.log(response.payload);
            setDocumentDiffLines(response.payload);
            setShowDiffLinesModal(true);
            setEditMode(false);
        }
    }
    // endregion

    return {
        selectedItem,
        setSelectedItem,
        documents,
        setDocuments,
        documentSelected,
        setDocumentSelected,
        documentSelectedFile,
        setDocumentSelectedFile,
        documentDiffLines,
        setDocumentDiffLines,
        editMode,
        setEditMode,
        showDiffLinesModal,
        setShowDiffLinesModal,
        grade,
        setGrade,
        subject,
        setSubject,
        loading,
        setLoading,
        pathname,
        setPathname,
        searchParams,
        setSearchParams,
        image,
        setImage,
        store,
        setStore,
        initialized,
        setInitialized,
        notification,
        setNotification,
        fetchDocuments,
        fetchDocumentById,
        fetchFileById,
        checkDiff
    }
}
// endregion
