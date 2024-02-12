// import { atom } from 'recoil'
// import { User } from '../domains/user';
// import { InstitutionGroup } from '../domains/institution';
// import localStorageEffect from './storage'
// import { Enrollment } from '../domains/enrollment';
//
// export const user = atom<User | undefined>({
//   key: 'user',
//   effects_UNSTABLE: [localStorageEffect('user')],
//   default: {
//     active: undefined,
//     address: undefined,
//     admin: undefined,
//     birthdate: undefined,
//     city: undefined,
//     country: undefined,
//     created: undefined,
//     email: undefined,
//     id: undefined,
//     name: undefined,
//     phone: undefined,
//     photo: undefined,
//     postal_code: undefined,
//     state: undefined,
//     updated: undefined,
//     username: undefined,
//     verified: undefined
//   },
// });
//
// export const enrollments = atom<{ enrollments: Enrollment[] }>({
//   key: 'enrollments',
//   effects_UNSTABLE: [localStorageEffect('enrollments')],
//   default: {enrollments: []},
// });
//
// export type Token = {
//   value?: string;
// }
//
// export const token = atom<Token | undefined>({
//   key: 'token',
//   effects_UNSTABLE: [localStorageEffect('token')],
//   default: {
//     value: undefined,
//   }
// });
//
// export const institutionGroup = atom<InstitutionGroup | undefined>({
//   key: 'institutionGroup',
//   effects_UNSTABLE: [localStorageEffect('institutionGroup')],
//   default: {
//     institution: {
//       id: undefined,
//       active: undefined,
//       description: undefined,
//       email: undefined,
//       logo: undefined,
//       name: undefined,
//       phone: undefined,
//       user_id: undefined,
//       username: undefined,
//       created: undefined,
//       updated: undefined
//     },
//     units: [
//       {
//         id: undefined,
//         active: undefined,
//         address: undefined,
//         city: undefined,
//         country: undefined,
//         description: undefined,
//         email: undefined,
//         institution_id: undefined,
//         name: undefined,
//         phone: undefined,
//         postal_code: undefined,
//         state: undefined,
//         created: undefined,
//         updated: undefined
//       }
//     ],
//   }
// });
//
// export const settings = atom<{ theme?: string, texto?: string }>({
//   key: 'settings',
//   effects_UNSTABLE: [localStorageEffect('settings')],
//   default: {
//     theme: 'light',
//     texto: "teste",
//   },
// });
//
// export const toast = atom<{ notifications: string[] }>({
//   key: 'toast',
//   default: {
//     notifications: [
//         "",
//         "",
//         "",
//     ],
//   },
// });
//

export const a = "";