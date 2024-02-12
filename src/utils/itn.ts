import {createContext, useContext} from "react";
import Store, {StoreContext} from "../store";

export type ItnType<Generic> = {
    ptBr: Generic
    ptEu: Generic
    en: Generic
    es: Generic
    fr: Generic
    it: Generic
    de: Generic
}

export type ItnLanguage = "ptBr" | "ptEu" | "en" | "es" | "fr" | "it" | "de";

type ErrorType = {
    auth: {
        not_found: string,
        invalid_password: string,
        invalid_email: string,
        invalid_credentials: string,
    }
}

const errors: ItnType<ErrorType> = {
    ptBr: {
        auth: {
            not_found: "Usuário não encontrado",
            invalid_password: "Senha inválida",
            invalid_email: "Email inválido",
            invalid_credentials: "Credenciais inválidas",
        }
    },
    ptEu: {
        auth: {
            not_found: "Utilizador não encontrado",
            invalid_password: "Palavra-passe inválida",
            invalid_email: "Email inválido",
            invalid_credentials: "Credenciais inválidas",
        }
    },
    en: {
        auth: {
            not_found: "User not found",
            invalid_password: "Invalid password",
            invalid_email: "Invalid email",
            invalid_credentials: "Invalid credentials",
        }
    },
    es: {
        auth: {
            not_found: "Usuario no encontrado",
            invalid_password: "Contraseña invalida",
            invalid_email: "Email invalido",
            invalid_credentials: "Credenciales invalidas",
        }
    },
    fr: {
        auth: {
            not_found: "Utilisateur non trouvé",
            invalid_password: "Mot de passe invalide",
            invalid_email: "Email invalide",
            invalid_credentials: "Identifiants invalides",
        }
    },
    it: {
        auth: {
            not_found: "Utente non trovato",
            invalid_password: "Password non valida",
            invalid_email: "Email non valido",
            invalid_credentials: "Credenziali non valide",
        }
    },
    de: {
        auth: {
            not_found: "Benutzer nicht gefunden",
            invalid_password: "Ungültiges Passwort",
            invalid_email: "Ungültige E-Mail",
            invalid_credentials: "Ungültige Anmeldeinformationen",
        }
    }
}

export type Months = {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
};

export type DaysOfWeek = {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
}

export const months: ItnType<Months> = {
    ptBr: {
        january: "Janeiro",
        february: "Fevereiro",
        march: "Março",
        april: "Abril",
        may: "Maio",
        june: "Junho",
        july: "Julho",
        august: "Agosto",
        september: "Setembro",
        october: "Outubro",
        november: "Novembro",
        december: "Dezembro",
    },
    ptEu: {
        january: "Janeiro",
        february: "Fevereiro",
        march: "Março",
        april: "Abril",
        may: "Maio",
        june: "Junho",
        july: "Julho",
        august: "Agosto",
        september: "Setembro",
        october: "Outubro",
        november: "Novembro",
        december: "Dezembro",
    },
    en: {
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
    },
    es: {
        january: "Enero",
        february: "Febrero",
        march: "Marzo",
        april: "Abril",
        may: "Mayo",
        june: "Junio",
        july: "Julio",
        august: "Agosto",
        september: "Septiembre",
        october: "Octubre",
        november: "Noviembre",
        december: "Diciembre",
    },
    fr: {
        january: "Janvier",
        february: "Février",
        march: "Mars",
        april: "Avril",
        may: "Mai",
        june: "Juin",
        july: "Juillet",
        august: "Août",
        september: "Septembre",
        october: "Octobre",
        november: "Novembre",
        december: "Décembre",
    },
    it: {
        january: "Gennaio",
        february: "Febbraio",
        march: "Marzo",
        april: "Aprile",
        may: "Maggio",
        june: "Giugno",
        july: "Luglio",
        august: "Agosto",
        september: "Settembre",
        october: "Ottobre",
        november: "Novembre",
        december: "Dicembre",
    },
    de: {
        january: "Januar",
        february: "Februar",
        march: "März",
        april: "April",
        may: "Mai",
        june: "Juni",
        july: "Juli",
        august: "August",
        september: "September",
        october: "Oktober",
        november: "November",
        december: "Dezember",
    },
};

export const daysOfWeek: ItnType<DaysOfWeek> = {
    ptBr: {
        sunday: "Domingo",
        monday: "Segunda",
        tuesday: "Terça",
        wednesday: "Quarta",
        thursday: "Quinta",
        friday: "Sexta",
        saturday: "Sábado",
    },
    ptEu: {
        sunday: "Domingo",
        monday: "Segunda",
        tuesday: "Terça",
        wednesday: "Quarta",
        thursday: "Quinta",
        friday: "Sexta",
        saturday: "Sábado",
    },
    en: {
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
    },
    es: {
        sunday: "Domingo",
        monday: "Lunes",
        tuesday: "Martes",
        wednesday: "Miércoles",
        thursday: "Jueves",
        friday: "Viernes",
        saturday: "Sábado",
    },
    fr: {
        sunday: "Dimanche",
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
    },
    it: {
        sunday: "Domenica",
        monday: "Lunedì",
        tuesday: "Martedì",
        wednesday: "Mercoledì",
        thursday: "Giovedì",
        friday: "Venerdì",
        saturday: "Sabato",
    },
    de: {
        sunday: "Sonntag",
        monday: "Montag",
        tuesday: "Dienstag",
        wednesday: "Mittwoch",
        thursday: "Donnerstag",
        friday: "Freitag",
        saturday: "Samstag",
    },
}

const text: ItnLanguage = "ptBr";

export type ItnMessagesType = {
    [key: string]: (t: ItnLanguage) => string;
}

export function useItn<T, GenericMessageType extends {}>(_itns: ItnType<T>, _messages: GenericMessageType | undefined = undefined) {
    const language = useContext(LanguageContext);
    const t = (message: string | undefined) => {
        if (!message) return "";
        if (!_messages?.hasOwnProperty(message)) return message;
        // @ts-ignore
        return _messages[message](language)
    }
    return {
        itn: _itns[language],
        t: t
    };
}

export const LanguageContext = createContext<ItnLanguage>(text);