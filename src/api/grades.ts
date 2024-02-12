import { Grade } from "../domains/grade";
import { Response } from "../domains/response";
import { requests } from "./requests"
import {getQueryString} from "../utils/getQueryString";
import {FindGradeByEnrollmentIdDTO} from "../adapters/dto/grade";

export type FetchGradesFilter = {
    institutionUnitId ?: string,
    createdBy         ?: string,
    courseId          ?: string,
    page              ?: number,
    pageSize          ?: number,
};

export async function fetchGrades(params: FetchGradesFilter, token?: string): Promise<Response<Array<Grade>>> {
    const { get } = requests();

    return await get<Array<Grade>>("/grades?" + getQueryString(params), token);
}

export async function fetchGrade(gradeId: string | null, token?: string): Promise<Response<FindGradeByEnrollmentIdDTO | null>> {
    const { get } = requests();
    if (gradeId === null) {
        return {message: "gradeId is null", status: 400, payload: null};
    }

    return await get<FindGradeByEnrollmentIdDTO | null>("/grades/" + gradeId, token);
}

export async function fetchGradeByEnrollment(enrollmentId: string | null, token?: string): Promise<Response<FindGradeByEnrollmentIdDTO | null>> {
    const { get } = requests();
    if (enrollmentId === null) {
        return {message: "enrollmentId is null", status: 400, payload: null};
    }

    return await get<FindGradeByEnrollmentIdDTO | null>("/grades?enrollmentId=" + enrollmentId, token);
}