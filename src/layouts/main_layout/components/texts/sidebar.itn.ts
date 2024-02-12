import {ItnType} from "../../../../utils/itn";

type Type = {
    principal: {
        title: string,
        homePage: string,
        libraries: string,
        calendar: string,
        subjects: string,
    };
    professors: {
        title: string,
        homePage: string,
    };
    institutional: {
        title: string,
    }
}

export const itns: ItnType<Type> = {
    ptBr: {
        principal: {
            title: "Principal",
            homePage: "Página inicial",
            libraries: "Bibliotecas",
            calendar: "Calendário",
            subjects: "Disciplinas",
        },
        professors: {
            title: "Professores",
            homePage: "Página inicial",
        },
        institutional: {
            title: "Institucional",
        },
    },
    ptEu: {
        principal: {
            title: "Principal",
            homePage: "Página inicial",
            libraries: "Bibliotecas",
            calendar: "Calendário",
            subjects: "Disciplinas",
        },
        professors: {
            title: "Professores",
            homePage: "Página inicial",
        },
        institutional: {
            title: "Institucional",
        },
    },
    en: {
        principal: {
            title: "Principal",
            homePage: "Home page",
            libraries: "Libraries",
            calendar: "Calendar",
            subjects: "Subjects",
        },
        professors: {
            title: "Professors",
            homePage: "Home page",
        },
        institutional: {
            title: "Institutional",
        },
    },
    es: {
        principal: {
            title: "Principal",
            homePage: "Página de inicio",
            libraries: "Bibliotecas",
            calendar: "Calendario",
            subjects: "Asignaturas",
        },
        professors: {
            title: "Profesores",
            homePage: "Página de inicio",
        },
        institutional: {
            title: "Institucional",
        },
    },
    fr: {
        principal: {
            title: "Principal",
            homePage: "Page d'accueil",
            libraries: "Bibliothèques",
            calendar: "Calendrier",
            subjects: "Sujets",
        },
        professors: {
            title: "Professeurs",
            homePage: "Page d'accueil",
        },
        institutional: {
            title: "Institutionnel",
        },
    },
    it: {
        principal: {
            title: "Principale",
            homePage: "Pagina iniziale",
            libraries: "Biblioteche",
            calendar: "Calendario",
            subjects: "Soggetti",
        },
        professors: {
            title: "Professori",
            homePage: "Pagina iniziale",
        },
        institutional: {
            title: "Istituzionale",
        },
    },
    de: {
        principal: {
            title: "Haupt",
            homePage: "Startseite",
            libraries: "Bibliotheken",
            calendar: "Kalender",
            subjects: "Fächer",
        },
        professors: {
            title: "Professoren",
            homePage: "Startseite",
        },
        institutional: {
            title: "Institutionell",
        },
    },
}