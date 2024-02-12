// region imports
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { InstitutionUnit } from "../../domains/institution";
import DropDown from "../../components/drop_down/drop_down";
import TextField from "../../components/text_field/text_field";
import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { FlexBox } from "../../components/authdoc_ui";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { observer } from "mobx-react";
import CheckBox from "../../components/check_box/check_box";
import { useContext, useEffect, useMemo } from "react";
import { StoreContext } from "../../store";
import SignInViewModel from "../../view_models/auth/sign_in_view_model";
import { useNotifications } from "reapop";
import { ItnType, LanguageContext, useItn } from "../../utils/itn";
import { itns, messages } from "./texts/sign_in.itn";
import { className } from "../../utils/className";
import Logo from "../../assets/images/Logo";
import useSignInViewModel from "../../view_models/auth/f_sign_in_view_model";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
// endregion

// region SignInView
export default function SignInView() {
    const viewModel = useSignInViewModel();
    const store = useContext(StoreContext);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { notify } = useNotifications();
    const { t } = useItn(itns, messages);

    viewModel.notification = (notification, status) =>
        notify(t(notification), status);

    useEffect(() => {
        viewModel.onInitialized(
            store,
            location.pathname.replace("/sign-in/", ""),
            searchParams
        );
    }, [location.pathname, searchParams, store, viewModel]);

    const theme = useTheme();
    const { itn } = useItn(itns);
    const classes = useStyles({ theme });
    const { height, width } = useWindowDimensions();
    const navigate = useNavigate();
    // endregion

    // region render
    return (
        <FlexBox
            column
            gap={styles.size(10)}
            crossAxisAlignment="center"
            className={classes.container}
            style={{ height: `${height}px` }}>
            <FlexBox
                mainAxisAlignment="center"
                flex={1}
                // gap={styles.size(10)}
                className={classes.content}>
                <FlexBox
                    row
                    flex={1}
                    shrink={0}
                    crossAxisAlignment="center"
                    mainAxisAlignment="center">
                    <FlexBox
                        column
                        gap={styles.size(2.5)}
                        style={{
                            // width: styles.size(30),
                            flex: 1,
                            alignItems: "stretch",
                            maxWidth: styles.size(70),
                        }}
                        mainAxisAlignment="center">
                        {/* <TextField
                        type="email"
                        size="large"
                        placeholder={itn.emailPlaceholder}
                        value={viewModel.email}
                        onChange={viewModel.setEmail}
                    />
                    <TextField
                        type="password"
                        size="large"
                        placeholder={itn.passwordPlaceholder}
                        value={viewModel.password}
                        onEnter={async () => await viewModel.onSignIn()}
                        onChange={viewModel.setPassword}
                    />
                    <FlexBox mainAxisAlignment="space-between">
                        <FlexBox
                            crossAxisAlignment="center"
                            gap={styles.size(1)}>
                            <CheckBox value={itn.keepConnected} />
                            <div className={classes.checkBox}/>
                            <div className={classes.checkBoxText}>Manter conectado</div>
                        </FlexBox>
                        <div
                            onClick={() => navigate("/recovery-password")}
                            className={classes.recoveryPassword}>
                            {itn.recoverPassword}
                        </div>
                    </FlexBox> */}
                        <Card
                            color="lilac"
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                gap: styles.size(2.5),
                                paddingInline: styles.size(2),
                                marginInline:
                                    width > 1400
                                        ? styles.size(8)
                                        : styles.size(2),
                            }}>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: 400,
                                    marginInline: styles.size(2),
                                    maxWidth: styles.size(25),
                                }}>
                                Fazer login na minha conta do Canal ou empresa,
                                para postar vagas e encontrar profissionais.
                            </p>
                            <Button>Login como canal</Button>
                        </Card>
                        <Card
                            color="lilac"
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                gap: styles.size(2.5),
                                paddingInline: styles.size(2),
                                marginInline:
                                    width > 1400
                                        ? styles.size(8)
                                        : styles.size(2),
                            }}>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: 400,
                                    marginInline: styles.size(2),
                                    maxWidth: styles.size(25),
                                }}>
                                Quero fazer login na minha conta Profissional,
                                para encontrar Jobs e me candidatar.
                            </p>
                            <Button color="salmon">
                                Login como profissional
                            </Button>
                        </Card>
                        {/* <button
                        className={className([
                            classes.submitButton,
                            viewModel.submitButtonDisabled()
                                ? classes.submitButtonDisabled
                                : null,
                        ])}
                        onClick={async () =>
                            !viewModel.submitButtonDisabled() &&
                            (await viewModel.onSignIn())
                        }>
                        {itn.signIn.toUpperCase()}
                    </button> */}
                    </FlexBox>
                </FlexBox>
                {width > 1400 ? (
                    <FlexBox
                        style={{
                            display: "flex",
                            alignItems: "stretch",
                            flexShrink: 0,
                        }}
                        crossAxisAlignment="center"
                        mainAxisAlignment="center"
                        flex={1}>
                        {/* <FlexBox
                            flex={1}
                            mainAxisAlignment="center"
                            crossAxisAlignment="center"
                            className={classes.child}> */}
                        <img
                            src={require("../../assets/images/auth_background.webp")}
                            style={{
                                objectFit: "cover",
                            }}
                        />
                        {/* </FlexBox> */}
                    </FlexBox>
                ) : null}
            </FlexBox>
        </FlexBox>
    );
    // endregion
}
// endregion

// region style
const useStyles = createUseStyles({
    container: {
        width: "100%",
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        // paddingInline: styles.size(2),
    },
    content: {
        width: "100%",
        // maxWidth: styles.size(100),
        flex: 1,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto",
        grid: "'area'",
    },
    child: {
        gridArea: "area",
        backgroundColor: "blue",
        flex: 1,
    },
    smooth: {
        backgroundColor: "transparent",
        height: "0px",
        width: "0px",
        borderRadius: "50%",
        boxShadow: ({ theme }: any) => `0 0 150px 150px ${theme.elementBlue}44`,
    },
    image: {
        // maxWidth: styles.size(30),
        maxWidth: "100%",
        maxHeight: "90vh",
        objectFit: "contain",
    },
    submitButton: {
        height: styles.size(5),
        marginTop: styles.size(2),
        borderRadius: styles.size(0.75),
        fontSize: styles.size(1),
        fontWeight: "bold",
        border: "none",
        backgroundColor: ({ theme }: any) => theme.elementBlue,
        boxShadow: ({ theme }: any) =>
            `0px 10px 20px 5px ${theme.elementBlue}33`,
        color: "white",
        cursor: "pointer",
    },
    submitButtonDisabled: {
        opacity: 0.5,
        cursor: "not-allowed",
    },
    checkBox: {
        width: styles.size(1.5),
        height: styles.size(1.5),
        backgroundColor: ({ theme }: any) => theme.foreground,
        color: ({ theme }: any) => theme.background,
        borderRadius: styles.size(0.25),
    },
    checkBoxText: {
        fontSize: styles.size(1),
        color: ({ theme }: any) => theme.foregroundSecondary,
    },
    recoveryPassword: {
        cursor: "pointer",
        fontSize: styles.size(1),
        color: ({ theme }: any) => theme.foregroundSecondary,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            color: ({ theme }: any) => theme.elementBlue,
            textShadow: ({ theme }: any) =>
                `0px 2px 10px ${theme.elementBlue}77`,
        },
        "&:active": {
            color: ({ theme }: any) => theme.elementBlue,
            textShadow: ({ theme }: any) =>
                `0px 2px 10px ${theme.elementBlue}dd`,
        },
    },
});
// endregion
