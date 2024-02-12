import {ItnType} from "../../../../utils/itn";

type Type = {
    eventsForToday1: string,
    eventsForToday2: string,
    flyoutItems: {
        profile: string,
        enrollments: string,
        lightTheme: string,
        darkTheme: string,
        language: string,
        signOut: string,
    }
}

export const itns: ItnType<Type> = {
    ptBr: {
        eventsForToday1: "Eventos",
        eventsForToday2: "para hoje",
        flyoutItems: {
            profile: "Perfil",
            enrollments: "Matrículas",
            lightTheme: "Tema claro",
            darkTheme: "Tema escuro",
            language: "Idioma",
            signOut: "Sair",
        }
    },
    ptEu: {
        eventsForToday1: "Eventos",
        eventsForToday2: "para hoje",
        flyoutItems: {
            profile: "Perfil",
            enrollments: "Matrículas",
            lightTheme: "Tema claro",
            darkTheme: "Tema escuro",
            language: "Idioma",
            signOut: "Sair",
        }
    },
    en: {
        eventsForToday1: "Events",
        eventsForToday2: "for today",
        flyoutItems: {
            profile: "Profile",
            enrollments: "Enrollments",
            lightTheme: "Light theme",
            darkTheme: "Dark theme",
            language: "Language",
            signOut: "Sign out",
        }
    },
    es: {
        eventsForToday1: "Eventos",
        eventsForToday2: "para hoy",
        flyoutItems: {
            profile: "Perfil",
            enrollments: "Matrículas",
            lightTheme: "Tema claro",
            darkTheme: "Tema oscuro",
            language: "Idioma",
            signOut: "Salir",
        }
    },
    fr: {
        eventsForToday1: "Événements'hui",
        eventsForToday2: "pour aujourd'hui",
        flyoutItems: {
            profile: "Profil",
            enrollments: "Inscriptions",
            lightTheme: "Thème clair",
            darkTheme: "Thème sombre",
            language: "Langue",
            signOut: "Se déconnecter",
        }
    },
    it: {
        eventsForToday1: "Eventi",
        eventsForToday2: "per oggi",
        flyoutItems: {
            profile: "Profilo",
            enrollments: "Iscrizioni",
            lightTheme: "Tema chiaro",
            darkTheme: "Tema scuro",
            language: "Lingua",
            signOut: "Disconnettersi",
        }
    },
    de: {
        eventsForToday1: "Veranstaltungen",
        eventsForToday2: "für heute",
        flyoutItems: {
            profile: "Profil",
            enrollments: "Anmeldungen",
            lightTheme: "Helles Thema",
            darkTheme: "Dunkles Thema",
            language: "Sprache",
            signOut: "Ausloggen",
        }
    },
}