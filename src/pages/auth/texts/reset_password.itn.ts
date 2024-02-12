import {ItnType} from "../../../utils/itn";

type Type = {
    title: string,
    codePlaceholder: string,
    passwordPlaceholder: string,
    goBack: string,
    submit: string,
}

export const itns: ItnType<Type> = {
    ptBr: {
        title: "Insira o código enviado no seu e-mail e a nova senha.",
        codePlaceholder: "Insira o código",
        passwordPlaceholder: "Senha",
        goBack: "Voltar",
        submit: "Confirmar",
    },
    ptEu: {
        title: "Insira o código enviado no seu e-mail e a nova senha.",
        codePlaceholder: "Insira o código",
        passwordPlaceholder: "Senha",
        goBack: "Voltar",
        submit: "Confirmar",
    },
    en: {
        title: "Enter the code sent to your email and the new password.",
        codePlaceholder: "Enter the code",
        passwordPlaceholder: "Password",
        goBack: "Go back",
        submit: "Submit",
    },
    es: {
        title: "Ingrese el código enviado a su correo electrónico y la nueva contraseña.",
        codePlaceholder: "Ingrese el código",
        passwordPlaceholder: "Contraseña",
        goBack: "Volver",
        submit: "Enviar",
    },
    fr: {
        title: "Entrez le code envoyé à votre adresse e-mail et le nouveau mot de passe.",
        codePlaceholder: "Entrez le code",
        passwordPlaceholder: "Mot de passe",
        goBack: "Retour",
        submit: "Soumettre",
    },
    it: {
        title: "Inserisci il codice inviato al tuo indirizzo email e la nuova password.",
        codePlaceholder: "Inserisci il codice",
        passwordPlaceholder: "Parola d'ordine",
        goBack: "Indietro",
        submit: "Invia",
    },
    de: {
        title: "Geben Sie den per E-Mail gesendeten Code und das neue Passwort ein.",
        codePlaceholder: "Geben Sie den Code ein",
        passwordPlaceholder: "Passwort",
        goBack: "Zurück",
        submit: "einreichen",
    },
}