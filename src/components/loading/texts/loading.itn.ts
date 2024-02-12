import {ItnType} from "../../../utils/itn";

type Type = {
    loading: string;
}

export const itns: ItnType<Type> = {
    ptBr: {
        loading: "Carregando",
    },
    ptEu: {
        loading: "Carregando",
    },
    en: {
        loading: "Loading",
    },
    es: {
        loading: "Cargando",
    },
    fr: {
        loading: "Chargement",
    },
    it: {
        loading: "Caricamento",
    },
    de: {
        loading: "Wird geladen",
    },
}