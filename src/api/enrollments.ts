import {Response} from "../domains/response";
import {Enrollment} from "../domains/enrollment";
import {requests} from "./requests";

export async function fetchEnrollments(userId: string, institutionUnitId: string, token?: string): Promise<Response<Enrollment>> {
    if (!token) {
        return new Promise((resolve) => {
            const response: Response<Enrollment> = {status: 401, message: "Unauthorized"};
            resolve(response);
        });
    }
    const { get } = requests();
    return await get<Enrollment>(`/enrollments?userId=${userId}&institutionId=${institutionUnitId}`, token);
}