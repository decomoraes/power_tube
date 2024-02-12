import { type ReactNode, useContext } from "react";
import "./header.css";
import MenuIcon from "../../../assets/images/icons/menu";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import FlyOut from "../../../components/fly_out/fly_out";
import { useNavigate } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../../utils/styles";
import { FlexBox } from "../../../components/authdoc_ui";
import Clock from "../../../components/clock/clock";
import { className } from "../../../utils/className";
import { StoreContext } from "../../../store";
import { LanguageContext } from "../../../utils/itn";
import { itns } from "./texts/header.itn";
import icons from "../../../utils/icons";
import Icon from "../../../components/icon/icon";

class Props {
    children?: ReactNode;
    title?: string;
    onClick?: () => void;
    sidebarIsOpened?: boolean;
}

export default function Header(props: Props): JSX.Element {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const language = useContext(LanguageContext);
    const itn = itns[language];
    const store = useContext(StoreContext);
    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    const settingsFlyoutItems = [
        // {
        //   text: itn.flyoutItems.profile,
        //   icon: icons.user2Fill,
        //   onClick: () => navigate("/profile"),
        // },
        // {
        //   text: itn.flyoutItems.enrollments,
        //   icon: icons.book2Fill, // "mgc_book_2_fill",
        //   onClick: () => navigate("/enrollments"),
        // },
        // {
        //   text: "Compromissos docentes",
        //   icon: icons.book2Fill, // "mgc_book_2_fill",
        //   onClick: () => navigate("/professors/agreements"),
        // },
        {
            text:
                store.settingsStore.theme === "light" ||
                store.settingsStore.theme === undefined
                    ? itn.flyoutItems.darkTheme
                    : itn.flyoutItems.lightTheme,
            icon: icons.sunFill, // "mgc_sun_fill",
            onClick: () =>
                (store.settingsStore.theme =
                    store.settingsStore.theme === "light" ||
                    store.settingsStore.theme === undefined
                        ? "dark"
                        : "light")
        }
        // {
        //   text: itn.flyoutItems.language,
        //   icon: icons.translateFill,
        //   onClick: () => navigate("/language-settings"),
        // },

        // {
        //   text: "old token",
        //   icon: icons.key1Fill, // "mgc_exit_fill",
        //   onClick: setOldToken,
        // },
    ];

    const userFlyoutItems = [
        {
            text: itn.flyoutItems.signOut,
            icon: icons.exitFill, // "mgc_exit_fill",
            onClick: signOut
        }
    ];

    function signOut(): void {
        store.authStore.token = undefined;
    }

    function setOldToken(): void {
        store.authStore.token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODAyMzI2MzYsImV4cCI6MTY4MDI3NTgzNiwibmJmIjoxNjgwMjMyNjM2LCJ1c2VyX2lkIjoiODgxNWI1NTAtYTQ0OC00YTQzLWI0ZGQtMDBmMzZlNTAxNzM0In0.h4QYUxN2fCJBHETcSgNf-1UToFwxoal_gSW_nrPm9rE";
    }

    return (
        <FlexBox
            className={classes.headerContainer}
            gap={styles.size(1)}
            shrink={0}
            mainAxisAlignment="space-between"
            crossAxisAlignment="center"
        >
        <FlexBox gap={styles.size(1.5)} crossAxisAlignment="center">
        {/*<MenuIcon isOpened={props.sidebarIsOpened} className={classes.menuIcon} onClick={props.onClick} />*/}
        <Icon className={classes.menuIcon} name={icons.menuLine} onClick={props.onClick} />
        </FlexBox>
        <FlexBox gap={styles.size(4)} crossAxisAlignment="center">
        <FlexBox crossAxisAlignment="center" gap={styles.size(1)}>
        {width > 768 ? <div style={{
            color: "white",
            fontSize: styles.size(1.5)
        }}>{new Date().toLocaleString("pt-BR").split(" ")[0]}</div> : null}
        {width > 768 ? <Clock /> : null}
        </FlexBox>
        <FlexBox crossAxisAlignment="center" gap={styles.size(1.5)}>
        {/* <Help /> */}
        {/* <Settings /> */}
        <FlexBox className={classes.containerIcon} mainAxisAlignment="center" crossAxisAlignment="center">
        <span className={className([classes.icons, "mgc_question_line"])} />
        </FlexBox>
        <FlyOut items={settingsFlyoutItems}>
            <FlexBox className={classes.containerIcon} mainAxisAlignment="center" crossAxisAlignment="center">
            <span
                className={className([classes.icons, "mgc_settings_4_line"])}
            />
            </FlexBox>
        </FlyOut>
        <FlexBox className={classes.containerIcon} mainAxisAlignment="center" crossAxisAlignment="center">
        <span
            className={className([
                classes.icons,
                classes.notificationIcon,
                "mgc_notification_line"
            ])}
        >
              {/*<span className={classes.notificationCount}>2</span>*/}
            </span>
        </FlexBox>
        <FlyOut items={userFlyoutItems}>
            <FlexBox className={classes.containerIcon} mainAxisAlignment="center" crossAxisAlignment="center">
            <span className={className([classes.icons, "mgc_user_3_line"])} />
            </FlexBox>
        </FlyOut>
        </FlexBox>
        </FlexBox>
        </FlexBox>
    );
}

const useStyles = createUseStyles({
    headerContainer: {
        position: "relative",
        zIndex: 2,
        height: styles.size(7),
        marginRight: styles.size(3),
        backgroundColor: ({ theme }: any) => theme.background,
        paddingLeft: styles.size(3),
        borderBottom: ({ theme }: any) => styles.border(theme.border, "solid", 1)
    },
    iconContainer: {
        width: styles.size(2),
        height: styles.size(2),
        backgroundColor: ({ theme }: any) => theme.foreground,
        borderRadius: styles.size(1),
        padding: styles.size(0.25)
    },
    menuIcon: {
        cursor: "pointer",
        userSelect: "none"
        // "& *": {
        //   fill: ({ theme }: any) => theme.foreground,
        // },
    },
    icons: {
        fontSize: styles.size(1.75),
        "&:before": {
            color: ({ theme }: any) => theme.foregroundSecondary
        }
    },
    containerIcon: {
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        width: styles.size(3),
        height: styles.size(3),
        borderRadius: styles.size(1.5)
    },
    notificationIcon: {
        position: "relative"
    },
    notificationCount: {
        position: "absolute",
        left: "50%",
        bottom: "50%",
        padding: styles.size(0.5),
        height: "18px",
        paddingInline: "6px",
        backgroundColor: "#CB2B1D",
        borderRadius: "9px",
        fontSize: "10px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    },
    eventsContainer: {
        height: styles.size(3),
        backgroundColor: ({ theme }: any) => theme.elementBackgroundSecondary,
        paddingInline: styles.size(1.5),
        borderRadius: styles.size(1)
    },
    eventsContainerText: {
        fontWeight: 500,
        fontSize: styles.size(1),
        color: ({ theme }: any) => theme.foregroundSecondary
    },
    eventsContainerTextLight: {
        opacity: 0.5
    },
    headerName: {
        fontWeight: "700",
        fontSize: "14px",
        color: ({ theme }: any) => theme.foreground
    },
    wrapper: {
        padding: 40,
        background: ({ theme }: any) => theme.backgroundAlt,
        textAlign: "left"
    },
    title: {
        font: {
            size: 40,
            weight: 900
        },
        color: ({ theme }: any) => theme.color
    },
    link: {
        color: ({ theme }: any) => theme.color,
        "&:hover": {
            opacity: 0.5
        }
    }
});
