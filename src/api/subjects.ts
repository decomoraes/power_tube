import { Subject } from "../domains/subject";
import { Response } from "../domains/response";
import { requests } from "./requests"
import {getQueryString} from "../utils/getQueryString";

export type FetchSubjectsFilter = {
    // createdBy          ?: string,
    institutionUnitId ?: string,
    page                ?: number,
    pageSize           ?: number,
    courseId           ?: string,
    userId             ?: string,
    gradeId            ?: string,
};

export default async function fetchSubjects(params: FetchSubjectsFilter, token?: string): Promise<Response<Array<Subject>>> {
    const { get } = requests();

    return await get<Array<Subject>>("/subjects?" + getQueryString(params), token);
}


export async function fetchSubject(subjectId: string, token?: string): Promise<Response<Subject | null>> {
    const { get } = requests();

    if (!subjectId) {
        return {message: "subjectId is null", status: 400, payload: null};
    }

    return await get<Subject | null>("/subjects/" + subjectId, token);
}