import { User } from "../domains/user";
import { Response } from "../domains/response";
import { requests } from "./requests"
import { StudentSignInResponseDTO } from "../adapters/dto/sign_in";

export async function signIn(email: string, password: string): Promise<Response<User>> {
  const { post } = requests()
  const response = await post<User>("/auth/sign-in", {
    email: email,
    password: password,
  })
  return response;
}

export async function companySignIn(email: string, password: string, institutionUnitId: string): Promise<Response<StudentSignInResponseDTO>> {
  const { post } = requests()
  const response = await post<StudentSignInResponseDTO>("/auth/sign-in/student", {
    email: email,
    password: password,
    institutionUnitId: institutionUnitId,
  })
  return response;
}

export async function recoveryPassword(email: string): Promise<Response<undefined>> {
  const { post } = requests()
  const response = await post<undefined>("/auth/forgot-password", {
    email: email,
  })
  return response;
}

export async function resetPassword(email: string, password: string, token: string): Promise<Response<undefined>> {
  const { post } = requests()
  const response = await post<undefined>("/auth/reset-password", {
    email: email,
    password: password,
    passwordResetToken: token
  })
  return response;
}