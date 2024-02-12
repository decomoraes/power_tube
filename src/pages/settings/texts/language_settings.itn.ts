import {ItnType} from "../../../utils/itn";

type Type = {
    breadcrumbs: {
        languageSettings: string;
    }
    loading: string;
    browserDefault: string;
    save: string;
}

export const itns: ItnType<Type> = {
    ptBr: {
        breadcrumbs: {
            languageSettings: "Configurações de idioma",
        },
        loading: "Carregando",
        browserDefault: "Padrão do navegador",
        save: "Salvar",
    },
    ptEu: {
        breadcrumbs: {
            languageSettings: "Configurações de idioma",
        },
        loading: "Carregando",
        browserDefault: "Padrão do navegador",
        save: "Salvar",
    },
    en: {
        breadcrumbs: {
            languageSettings: "Language settings",
        },
        loading: "Loading",
        browserDefault: "Browser default",
        save: "Save",
    },
    es: {
        breadcrumbs: {
            languageSettings: "Configuración de idioma",
        },
        loading: "Cargando",
        browserDefault: "Predeterminado del navegador",
        save: "Guardar",
    },
    fr: {
        breadcrumbs: {
            languageSettings: "Paramètres de langue",
        },
        loading: "Chargement",
        browserDefault: "Par défaut du navigateur",
        save: "Sauvegarder",
    },
    it: {
        breadcrumbs: {
            languageSettings: "Impostazioni della lingua",
        },
        loading: "Caricamento",
        browserDefault: "Predefinito del browser",
        save: "Salva",
    },
    de: {
        breadcrumbs: {
            languageSettings: "Spracheinstellungen",
        },
        loading: "Wird geladen",
        browserDefault: "Browserstandard",
        save: "Speichern",
    },
}