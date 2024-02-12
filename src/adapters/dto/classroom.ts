import { User } from "../../domains/user"
import {Classroom} from "../../domains/classroom";

export type FindClassroomByIdResponseDTO = {
    classroom: Classroom
    students: User[]
}