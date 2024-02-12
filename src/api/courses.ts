import { type Course } from "../domains/course";
import { type Response } from "../domains/response";
import { requests } from "./requests";
import { getQueryString } from "../utils/getQueryString";

// import {FindCourseByEnrollmentIdDTO} from "../adapters/dto/course";

export type fetchCourseRequestDTO = {
    institutionUnitId?: string;
    userId?: string;
    page?: number;
    pageSize?: number;
    professorId?: string,
    enrollmentId?: string,
    gradeId?: string,
    subjectId?: string,
}

export async function fetchCourses(
    params: fetchCourseRequestDTO,
    token?: string
): Promise<Response<Course[]>> {
    const { get } = requests();

    return await get<Course[]>("/courses?" + getQueryString(params), token);
}

export async function fetchCourse(
    courseId: string | null,
    token?: string
): Promise<Response<Course | null>> {
    const { get } = requests();
    if (courseId === null) {
        return { message: "courseId is null", status: 400, payload: null };
    }

    return await get<Course | null>("/courses/" + courseId, token);
}

// export async function fetchCourseByEnrollment(enrollmentId: string | null, token?: string): Promise<Response<FindCourseByEnrollmentIdDTO | null>> {
//     const { get } = requests();
//     if (enrollmentId === null) {
//         return {message: "enrollmentId is null", status: 400, payload: null};
//     }
//
//     return await get<FindCourseByEnrollmentIdDTO | null>("/courses?enrollmentId=" + enrollmentId, token);
// }
