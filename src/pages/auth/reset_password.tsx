import {useContext, useState} from "react";
import {recoveryPassword, resetPassword, signIn} from "../../api/sign_in";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import TextField from "../../components/text_field/text_field";
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {FlexBox} from "../../components/authdoc_ui";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { itns } from "./texts/reset_password.itn";
import {LanguageContext} from "../../utils/itn";

type Props = {
}

export default function ResetPassword(props: Props) {
    const theme = useTheme();
    const language = useContext(LanguageContext);
    const itn = itns[language];
    const navigate = useNavigate();
    const classes = useStyles({theme});
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const {height, width} = useWindowDimensions();
    const [searchParams, setSearchParams] = useSearchParams()

    async function onResetPassword() {
        const email = searchParams.get("email");
        if (email === null) {
            alert("Invalid email");
            return;
        }
        const response = await resetPassword(email, password, token);

        if (response.status >= 300 || response.payload === undefined) {
            alert(response.message);
        }
        alert(response.message);
        navigate(-2);
        // props.onClose();
    }

    return (
        <FlexBox
            column
            gap={styles.size(10)}
            crossAxisAlignment="center"
            className={classes.container}
            style={{height: `${height}px`}}
        >
            <FlexBox
                mainAxisAlignment="center"
                gap={styles.size(10)}
                className={classes.content}
            >
                <FlexBox column gap={styles.size(2)} style={{width: styles.size(30)}}>
            <h2 className={classes.title}>{itn.title}</h2>

                    <TextField
                        type="text"
                        size="large"
                        placeholder={itn.codePlaceholder}
                        value={token}
                        onChange={setToken}/>
                    <TextField
                        type="password"
                        size="large"
                        placeholder={itn.passwordPlaceholder}
                        value={password}
                        onEnter={onResetPassword}
                        onChange={setPassword}/>
                    <FlexBox gap={styles.size(3)} mainAxisAlignment="space-between">
                    <button className={classes.goBackButton} onClick={() => navigate(-1)}>{itn.goBack}</button>
                    <button className={classes.submitButton} onClick={() => onResetPassword()}>{itn.submit}</button>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}


const useStyles = createUseStyles({
    container: {
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        paddingInline: styles.size(2),
    },
    content: {
        width: "100%",
        maxWidth: styles.size(100),
    },
    title: {
        marginBottom: "36px",
        color: ({theme}: any) => theme.foreground,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto",
        grid: "'area'",
    },
    child: {
        gridArea: "area",
    },
    smooth: {
        backgroundColor: "transparent",
        height: "0px",
        width: "0px",
        borderRadius: "50%",
        boxShadow: ({theme}: any) => `0 0 150px 150px ${theme.elementBlue}44`,
    },
    image: {
        // maxWidth: styles.size(30),
        maxWidth: "100%",
        maxHeight: "90vh",
        objectFit: "contain",
    },
    goBackButton: {
        height: styles.size(5),
        marginTop: styles.size(2),
        borderRadius: styles.size(0.75),
        fontSize: styles.size(1),
        fontWeight: "bold",
        // border: "none",
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        color: ({theme}: any) => theme.foregroundSecondary,
        border: ({theme}: any) => `1px solid ${theme.foregroundSecondary}22`,
        cursor: "pointer",
        flex: 1,
        marginInline: 0,
    },
    submitButton: {
        height: styles.size(5),
        marginTop: styles.size(2),
        borderRadius: styles.size(0.75),
        fontSize: styles.size(1),
        fontWeight: "bold",
        border: "none",
        backgroundColor: ({theme}: any) => theme.elementBlue,
        boxShadow: ({theme}: any) => `0px 10px 20px 5px ${theme.elementBlue}33`,
        color: "white",
        cursor: "pointer",
        flex: 1,
        marginInline: 0,
    },
    checkBox: {
        width: styles.size(1.5),
        height: styles.size(1.5),
        backgroundColor: ({theme}: any) => theme.foreground,
        color: ({theme}: any) => theme.background,
        borderRadius: styles.size(0.25),
    },
    checkBoxText: {
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
    },
    recoveryPassword: {
        cursor: "pointer",
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            color: ({theme}: any) => theme.elementBlue,
            textShadow: ({theme}: any) => `0px 2px 10px ${theme.elementBlue}77`,
        },
        "&:active": {
            color: ({theme}: any) => theme.elementBlue,
            textShadow: ({theme}: any) => `0px 2px 10px ${theme.elementBlue}dd`,
        },
    },
});