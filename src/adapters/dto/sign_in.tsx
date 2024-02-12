import { Enrollment } from "../../domains/enrollment"
import { User } from "../../domains/user"

export type StudentSignInResponseDTO = {
  user: User
  enrollments: Array<Enrollment>
}