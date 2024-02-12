import { ProfessorAgreement } from "../../domains/professor_agreement";

export type FetchProfessorsAgreementsResponseDTO = ProfessorAgreement & {
    userName?: string,
    userPhoto?: string,
    subjectName?: string,
}

export type FetchProfessorsAgreementsQueryRequestDTO = {
    userId?: string,
    institutionUnitId?: string,
    courseId?: string,
    enrollmentId?: string,
    ProfessorAgreementId?: string,
    subjectId?: string,
    page?: number,
    pageSize?: number,
};
