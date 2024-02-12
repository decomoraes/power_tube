import { User } from "../domains/user";
import { Response } from "../domains/response";
import { requests } from "./requests"
import { InstitutionGroup } from "../domains/institution";

export default async function getInstitution(institutionUsername: string): Promise<Response<InstitutionGroup>> {
  const { get } = requests()
  const response = await get<InstitutionGroup>("/institutions/username/" + institutionUsername)
  return response;
}