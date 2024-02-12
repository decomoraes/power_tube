import {User} from "../domains/user";
import {Response} from "../domains/response";
import {requests} from "./requests"

export default async function updateUser(user: User, token: string): Promise<Response<User>> {
  const { put } = requests();
  return await put<User>("/users", user, token);
}

export async function updateUserPhoto(photo: File, token: string): Promise<Response<User>> {
  const {putFormData} = requests();
  let formData = new FormData();
  formData.append("image", photo);
  formData.append("timestamp", "0000");
  return await putFormData<User>("/users/multipart", formData, token);
}

export async function fetchUser(token?: string): Promise<Response<User>> {
  if (!token) {
    return new Promise((resolve) => {
      const response: Response<User> = {status: 401, message: "Unauthorized"};
        resolve(response);
    });
  }
  const { get } = requests();
  return await get<User>("/users", token);
}