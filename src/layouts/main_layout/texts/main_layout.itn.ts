import {ItnLanguage, ItnMessagesType, ItnType} from "../../../utils/itn";

type MainLayoutTextType = {
    messages: {
        userUnauthorized: string,
    }
}

export const itns: ItnType<MainLayoutTextType> = {
    ptBr: {
        messages: {
            userUnauthorized: "Usuário não autorizado"
        }
    },
    ptEu: {
        messages: {
            userUnauthorized: "Usuário não autorizado"
        }
    },
    en: {
        messages: {
            userUnauthorized: "User unauthorized"
        }
    },
    es: {
        messages: {
            userUnauthorized: "Usuario no autorizado"
        }
    },
    fr: {
        messages: {
            userUnauthorized: "Utilisateur non autorisé"
        }
    },
    it: {
        messages: {
            userUnauthorized: "Utente non autorizzato"
        }
    },
    de: {
        messages: {
            userUnauthorized: "Benutzer nicht autorisiert"
        }
    },
}

export const messages: ItnMessagesType = {
    "user unauthorized": (t: ItnLanguage) => itns[t].messages.userUnauthorized
}