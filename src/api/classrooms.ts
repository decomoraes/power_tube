import { Classroom } from "../domains/classroom";
import { Response } from "../domains/response";
import { requests } from "./requests"
import {getQueryString} from "../utils/getQueryString";
import {FindClassroomByIdResponseDTO} from "../adapters/dto/classroom";

type ClassroomParams = {
    classroomId        ?: string,
    createdBy          ?: string,
    page                ?: number,
    pageSize           ?: number,
    
};

export async function fetchClassrooms(params: ClassroomParams, token?: string): Promise<Response<Array<Classroom>>> {
    const { get } = requests();
    return await get<Array<Classroom>>("/classrooms?" + getQueryString(params), token);
}

export async function fetchClassroom(classroomId: string | null, token?: string): Promise<Response<FindClassroomByIdResponseDTO | null>> {
    const { get } = requests();
    if (classroomId === null) {
        return {message: "classroomId is null", status: 400, payload: null};
    }

    console.log(classroomId);
    return await get<FindClassroomByIdResponseDTO | null>("/classrooms/" + classroomId, token);
}