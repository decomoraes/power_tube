import {ItnLanguage, ItnMessagesType, ItnType, LanguageContext} from "../../../utils/itn";
import {useContext} from "react";

type SignInTextType = {
    emailPlaceholder: string,
    passwordPlaceholder: string,
    keepConnected: string,
    recoverPassword: string,
    signIn: string,
    messages: {
        userOrPasswordIncorrect: string,
        enrollmentNotFound: string,
    }
}

// t('auth.not_found')

export const itns: ItnType<SignInTextType> = {
    ptBr: {
        emailPlaceholder: "Insira o seu endereço de email",
        passwordPlaceholder: "Senha",
        keepConnected: "Manter conectado",
        recoverPassword: "Recuperar senha",
        signIn: "Entrar",
        messages: {
            userOrPasswordIncorrect: "Usuário ou senha incorretos.",
            enrollmentNotFound: "Matrícula não encontrada."
        }
    },
    ptEu: {
        emailPlaceholder: "Insira o seu endereço de email",
        passwordPlaceholder: "Senha",
        keepConnected: "Manter conectado",
        recoverPassword: "Recuperar senha",
        signIn: "Entrar",
        messages: {
            userOrPasswordIncorrect: "Usuário ou senha incorretos.",
            enrollmentNotFound: "Matrícula não encontrada.",
        }
    },
    en: {
        emailPlaceholder: "Enter your email address",
        passwordPlaceholder: "Password",
        keepConnected: "Keep connected",
        recoverPassword: "Recover password",
        signIn: "Sign in",
        messages: {
            userOrPasswordIncorrect: "User or password incorrect.",
            enrollmentNotFound: "Enrollment not found.",
        }
    },
    es: {
        emailPlaceholder: "Ingrese su dirección de correo electrónico",
        passwordPlaceholder: "Contraseña",
        keepConnected: "Mantener la conexión",
        recoverPassword: "Recuperar contraseña",
        signIn: "Registrarse",
        messages: {
            userOrPasswordIncorrect: "Usuario o contraseña incorrectos.",
            enrollmentNotFound: "Matrícula no encontrada.",
        }
    },
    fr: {
        emailPlaceholder: "Entrez votre adresse e-mail",
        passwordPlaceholder: "Mot de passe",
        keepConnected: "Rester connecté",
        recoverPassword: "Récupérer le mot de passe",
        signIn: "Se connecter",
        messages: {
            userOrPasswordIncorrect: "Utilisateur ou mot de passe incorrect.",
            enrollmentNotFound: "Inscription introuvable.",
        }
    },
    it: {
        emailPlaceholder: "Inserisci il tuo indirizzo email",
        passwordPlaceholder: "Parola d'ordine",
        keepConnected: "Rimani connesso",
        recoverPassword: "Recupera la password",
        signIn: "Registrati",
        messages: {
            userOrPasswordIncorrect: "Utente o password non corretti.",
            enrollmentNotFound: "Iscrizione non trovata.",
        }
    },
    de: {
        emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
        passwordPlaceholder: "Passwort",
        keepConnected: "Verbunden bleiben",
        recoverPassword: "Passwort wiederherstellen",
        signIn: "Anmelden",
        messages: {
            userOrPasswordIncorrect: "Benutzername oder Passwort falsch.",
            enrollmentNotFound: "Anmeldung nicht gefunden.",
        }
    },
}

export const messages: ItnMessagesType = {
    "User or password incorrect.": (t: ItnLanguage) => itns[t].messages.userOrPasswordIncorrect,
    "Enrollment not found.": (t: ItnLanguage) => itns[t].messages.enrollmentNotFound,
}