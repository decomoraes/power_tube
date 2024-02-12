import {ItnLanguage, ItnMessagesType, ItnType} from "../../../utils/itn";

type Type = {
    title: string,
    emailPlaceholder: string,
    goBack: string,
    submit: string,
    messages: {
        passwordResetTokenSentToYourEmail: string,
    }
}

export const itns: ItnType<Type> = {
    ptBr: {
        title: "Recuperar senha",
        emailPlaceholder: "Insira o seu endereço de email",
        goBack: "Voltar",
        submit: "Enviar e-mail",
        messages: {
            passwordResetTokenSentToYourEmail: "Um código de recuperação de senha foi enviado para o seu e-mail.",
        }
    },
    ptEu: {
        title: "Recuperar senha",
        emailPlaceholder: "Insira o seu endereço de email",
        goBack: "Voltar",
        submit: "Enviar e-mail",
        messages: {
            passwordResetTokenSentToYourEmail: "Um código de recuperação de senha foi enviado para o seu e-mail.",
        }
    },
    en: {
        title: "Recover password",
        emailPlaceholder: "Enter your email address",
        goBack: "Go back",
        submit: "Send email",
        messages: {
            passwordResetTokenSentToYourEmail: "A password recovery code has been sent to your email.",
        }
    },
    es: {
        title: "Recuperar contraseña",
        emailPlaceholder: "Ingrese su dirección de correo electrónico",
        goBack: "Volver",
        submit: "Enviar correo electrónico",
        messages: {
            passwordResetTokenSentToYourEmail: "Se ha enviado un código de recuperación de contraseña a su correo electrónico.",
        }
    },
    fr: {
        title: "Récupérer le mot de passe",
        emailPlaceholder: "Entrez votre adresse e-mail",
        goBack: "Retour",
        submit: "Envoyer un email",
        messages: {
            passwordResetTokenSentToYourEmail: "Un code de récupération de mot de passe a été envoyé à votre adresse e-mail.",
        }
    },
    it: {
        title: "Recupera la password",
        emailPlaceholder: "Inserisci il tuo indirizzo email",
        goBack: "Indietro",
        submit: "Invia email",
        messages: {
            passwordResetTokenSentToYourEmail: "Un codice di recupero password è stato inviato al tuo indirizzo email.",
        }
    },
    de: {
        title: "Passwort wiederherstellen",
        emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
        goBack: "Zurück",
        submit: "E-Mail senden",
        messages: {
            passwordResetTokenSentToYourEmail: "Ein Passwort-Wiederherstellungscode wurde an Ihre E-Mail-Adresse gesendet.",
        }
    },
}

export const messages: ItnMessagesType = {
    "password reset token sent to your email": (t: ItnLanguage) => itns[t].messages.passwordResetTokenSentToYourEmail
}