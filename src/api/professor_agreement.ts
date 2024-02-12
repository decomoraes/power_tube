import { ProfessorAgreement } from "../domains/professor_agreement";
import { Response } from "../domains/response";
import { requests } from "./requests"
import {getQueryString} from "../utils/getQueryString";
import {
    FetchProfessorsAgreementsQueryRequestDTO,
    FetchProfessorsAgreementsResponseDTO
} from "../adapters/dto/professor_agreement";

export async function fetchProfessorsAgreements(data: FetchProfessorsAgreementsQueryRequestDTO, token?: string): Promise<Response<Array<FetchProfessorsAgreementsResponseDTO>>> {
    const { get } = requests();

    return await get<Array<FetchProfessorsAgreementsResponseDTO>>("/professors-agreements?" + getQueryString(data), token);
}

// export async function fetchProfessorAgreement(ProfessorAgreementId: string | null, token?: string): Promise<Response<ProfessorAgreement | null>> {
//     const { get } = requests();
//     if (ProfessorAgreementId === null) {
//         return {message: "ProfessorAgreementId is null", status: 400, payload: null};
//     }
//
//     return await get<FindProfessorAgreementByEnrollmentIdDTO | null>("/professors-agreements/" + ProfessorAgreementId, token);
// }