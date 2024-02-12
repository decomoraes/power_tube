import { Response } from "../domains/response";
import { Enrollment } from "../domains/enrollment";
import { requests } from "./requests";
import { getQueryString } from "../utils/getQueryString";

export enum DocumentType {
MarkDown0,
File,
}

export type DocumentRequestDTO = {
    id?: string,
    hash?: string,
    name?: string,
    lessThanSize?: number,
    greaterThanSize?: number,
    createdBy?: string,
}

export type DocumentResponseDTO = {
    id: string,
    hash: string,
    previousHash: string,
    name: string,
    size: number,
    type: DocumentType,
    content: string,
    reference: string,
    createdBy: string,
    updated: string,
    created: string,
}

export type CreateDocumentRequestDTO = {
    hash?:         string
    previousHash?: string
    name:          string
    size:          number
    createdBy:     string
    type:          DocumentType
    file?:         File | Blob | any
    content?:       string
    reference?:    string
}

type Document = {
    id: string
    hash: string
    previousHash: string
    name: string
    size: number
    type: DocumentType
    content: string
    reference: string
    createdBy: string
    updated: string
    created: string
}

export type FindFileRequestDTO = {
    userId?: string
    hash?: string
    key?: string
}

// signature
// id?: string,
// documentId?: string,
// userId?: string,
// status?: DocumentType,
// createdBy?: string,
// updated?: string,
// created?: string

export async function fetchDocuments(params: DocumentRequestDTO, token?: string): Promise<Response<DocumentResponseDTO[]>> {
    if (!token) {
        return new Promise((resolve) => {
            const response: Response<DocumentResponseDTO> = {status: 401, message: "Unauthorized"};
            // @ts-ignore
            resolve(response);
        });
    }
    const { get } = requests();
    return await get<DocumentResponseDTO[]>("/documents" + getQueryString(params), token);
}

export async function fetchDocumentsBySignatories(token?: string): Promise<Response<DocumentResponseDTO[]>> {
    if (!token) {
        return new Promise((resolve) => {
            const response: Response<DocumentResponseDTO> = {status: 401, message: "Unauthorized"};
            // @ts-ignore
            resolve(response);
        });
    }
    const { get } = requests();
    return await get<DocumentResponseDTO[]>("/documents/by-signatories", token);
}

export async function createDocument(data: CreateDocumentRequestDTO, token?: string): Promise<Response<Document>> {
    const { post } = requests();

    return await post<Document>("/documents", data, token);
}

export async function createPdfDocument(data: CreateDocumentRequestDTO, token?: string): Promise<Response<Document>> {
    const { postFormData } = requests();
    let formData = new FormData();
    formData.append("type", "1");
    formData.append("", data.name);
    formData.append("file", data.file);
    console.log("file", data.file)
    return await postFormData<Document>("/documents/file", formData, token);
}

export async function fetchFile(params: FindFileRequestDTO, token?: string): Promise<Uint8Array> {
    const { getFile } = requests();

    return await getFile("/documents/file" + getQueryString(params), token);
}



export type CheckDiffDocumentRequestDTO = {
    previous: string
    current:  string
}

export type CheckDiffDocumentResponseDTO = {
    type: string
    line: string
}

export async function getDiff(params: CheckDiffDocumentRequestDTO, token?: string) {
    const { post } = requests();
    return await post<CheckDiffDocumentResponseDTO[]>("/documents/check-diff", params, token);
}
