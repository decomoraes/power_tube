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
    fetchDocuments, fetchFile, FindFileRequestDTO, getDiff
} from "../../api/documents";
// endregion


// region SignInViewModel
export default class DocumentsViewModel {
    // region properties
    public _selectedItem: Enrollment | undefined;
    public documents: DocumentResponseDTO[] = [];
    public documentSelected: DocumentResponseDTO | undefined;
    public documentSelectedFile: Uint8Array | undefined;
    public documentDiffLines: CheckDiffDocumentResponseDTO[] = [];
    public editMode: boolean = false;
    public showDiffLinesModal: boolean = false;
    public grade: Grade | undefined;
    public subject: Subject | undefined;
    public loading: boolean = true;
    public pathname: string | undefined;
    private searchParams: URLSearchParams = new URLSearchParams();
    public image: string | undefined;
    public store: Store = new Store();
    public initialized: boolean = false;
    public notification: (notification: string, status: "error" | "success" | "info" | "warning") => any = () => {
    };
    // endregion

    // region constructor
    constructor() {
        makeAutoObservable(this);
    }

    // endregion

    // region onInitialized
    onInitialized(
        store: Store,
        searchParams: URLSearchParams,
        documentId?: string,
    ) {
        this.store = store;
        this.searchParams = searchParams;

        if (documentId !== undefined) {
            this.fetchDocumentById(documentId).then(r => {
            });
        } else {
            this.fetchDocuments().then(r => {
            });
        }
    }
    // endregion

    // region fetchDocuments
    async fetchDocuments(params?: DocumentRequestDTO) {
        const defaultParams: DocumentRequestDTO = {

        };

        const response = await fetchDocuments(params ?? defaultParams, this.store.authStore.token);
        console.log(response);
        if (response.status === 200 && response.payload !== undefined) {
            this.documents = response.payload;
        }
    }
    // endregion

    // region fetchDocumentById
    async fetchDocumentById(id: string) {
        const params: DocumentRequestDTO = {
            id: id
        };
        console.log("token", this.store.authStore.token)

        const response = await fetchDocuments(params, this.store.authStore.token);

        console.log("by Id", response)
        if (response.status === 200 && response.payload !== undefined && response.payload.length > 0) {
            this.documentSelected = response.payload[0]
        }

        if (this.documentSelected?.type === 1) {
            this.fetchFileById();
        }
    }
    // endregion

    // region fetchFileById
    async fetchFileById() {
        if (this.documentSelected?.reference === undefined) return;

        const params: FindFileRequestDTO = {
            key: this.documentSelected?.reference
        };

        if (params.key === undefined) return;

        const response = await fetchFile(params, this.store.authStore.token);

        if (!response) return

        this.documentSelectedFile = response;
    }
    // endregion

    // region checkDiff
    async checkDiff(data: string) {
        const request: CheckDiffDocumentRequestDTO = {
            previous: this.documentSelected?.content ?? "",
            current: data
        };

        const response = await getDiff(request, this.store.authStore.token);
        console.log(response);
        if (response.status === 200 && response.payload !== undefined) {
            console.log(response.payload);
            this.documentDiffLines = response.payload;
            this.showDiffLinesModal = true;
            this.editMode = false;
        }
    }
    // endregion
}
// endregion
