export type Institution = {
  id?: string,
  active?: boolean,
  description?: string,
  email?: string,
  logo?: string,
  name?: string,
  phone?: string,
  userId?: string,
  username?: string,
  created?: number,
  updated?: number
}

export type InstitutionUnit = {
  id?: string,
  active?: boolean,
  address?: string,
  city?: string,
  country?: string,
  description?: string,
  email?: string,
  institutionId?: string,
  name?: string,
  phone?: string,
  postalCode?: string,
  state?: string,
  created?: number,
  updated?: number
}

export type InstitutionGroup = {
  institution: Institution,
  units: InstitutionUnit[]
}