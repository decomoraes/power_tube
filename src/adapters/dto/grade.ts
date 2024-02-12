import {Grade} from "../../domains/grade";
import {Subject} from "../../domains/subject";

export type FindGradeByEnrollmentIdDTO = {
    grade: Grade
    subjects: Subject[]
}