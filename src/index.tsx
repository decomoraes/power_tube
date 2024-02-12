// region imports
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "@zach.codes/react-calendar/dist/calendar-tailwind.css";
import "mingcute_icon/font/Mingcute.css";
import "./assets/styles/style.css";
import Router from "./router/router";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "react-jss";
import Store, { StoreContext } from "./store"
import { observer } from "mobx-react";
import { NotificationsProvider } from 'reapop'
import { ItnLanguage, LanguageContext } from "./utils/itn";
// endregion

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

// const lightTheme = {
//     background: "#FFFFFF",
//     backgroundSemiAlt: "#FCFDFE",
//     backgroundAlt: "#FAFBFC",
//     foreground: "#000000",
//     foregroundSecondary: "#898989",
//     elementBackgroundSecondary: "#F6F7F8",
//     border: "#E1E4E8",
//     color: "#24292e",
//     contrast: "0, 0, 0",
//     elementBlue: "#367AF7",
//     oddStripeBackground: "#F1F2F4",
//     evenStripeBackground: "#FAFBFC",
// };
const lightTheme = {
    background: "#FFFFFF",
    backgroundSemiAlt: "#FCFDFE",
    backgroundAlt: "#FAFBFC",
    foreground: "#000000",
    foregroundSecondary: "#898989",
    elementBackgroundSecondary: "#F6F7F8",
    primary: "#0065bb",
    primaryContrast: "#FFFFFF",
    secondary: "#20c3cc",
    secondaryContrast: "#FFFFFF",
    border: "#E1E4E8",
    color: "#24292e",
    contrast: "0, 0, 0",
    elementBlue: "#367AF7",
    oddStripeBackground: "#F1F2F4",
    evenStripeBackground: "#FAFBFC",
};
const darkTheme = {
    background: "#151515",
    backgroundSemiAlt: "#2B323A",
    backgroundAlt: "#1E1E1E",
    foreground: "#FFFFFF",
    foregroundSecondary: "#939494",
    elementBackgroundSecondary: "#232B33",
    primary: "#0065bb",
    primaryContrast: "#FFFFFF",
    secondary: "#20c3cc",
    secondaryContrast: "#FFFFFF",
    border: "#282828",
    color: "#24292e",
    contrast: "255, 255, 255",
    elementBlue: "#4781C1",
    oddStripeBackground: "#2d343c",
    evenStripeBackground: "#333A42",
};

const Theme = observer(({ children }: { children: React.ReactNode }) => {
    const { settingsStore } = useContext(StoreContext);

    const themes = {
        light: lightTheme,
        dark: darkTheme
    }
    // @ts-ignore
    const theme = settingsStore !== undefined && settingsStore.theme === "dark" ? themes["dark"] : themes["light"];
    console.log("settingsStore", settingsStore);
    // check if theme is dark
    const themeName = theme === themes["dark"] ? "dark" : "light";

    const [language, setLanguage] = useState<ItnLanguage>("ptBr");

    useEffect(() => {
        // remove scrollbars
        document.documentElement.style.overflow = "hidden";
        // trigger reflow so that overflow style is applied
        document.documentElement.style.backgroundColor = theme.background;
        document.body.clientWidth;
        // change scheme
        document.documentElement.setAttribute(
            "data-color-scheme",
            settingsStore.theme === "dark" ? "dark" : "light"
        );
        // remove overflow style, which will bring back the scrollbar with the correct scheme
        document.documentElement.style.overflow = "";
    }, [settingsStore.theme]);

    useEffect(() => {
        if (settingsStore.language !== undefined) {
            setLanguage(settingsStore.language);
        }
        else if (navigator.language.startsWith("en")) {
            setLanguage("en");
        }
        else if (navigator.language.startsWith("es")) {
            setLanguage("es");
        }
        else if (navigator.language.startsWith("fr")) {
            setLanguage("fr");
        }
        else if (navigator.language.startsWith("it")) {
            setLanguage("it");
        }
        else if (navigator.language.startsWith("de")) {
            setLanguage("de");
        }
        else if (navigator.language === "pt") {
            setLanguage("ptEu");
        }
        else {
            setLanguage("ptBr");
        }
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <LanguageContext.Provider value={language}>
                <div className={themeName}>
                    {children}
                </div>
            </LanguageContext.Provider>
        </ThemeProvider>
    );
});

root.render(
    <StoreContext.Provider value={new Store()}>
        <Theme>
            <NotificationsProvider>
                <Router />
            </NotificationsProvider>
        </Theme>
    </StoreContext.Provider>
);

// <React.StrictMode>
// </React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
