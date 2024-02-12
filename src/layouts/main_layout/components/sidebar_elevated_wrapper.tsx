import { ReactNode, useEffect, useState } from "react";
import { className } from "../../../utils/className";
import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../../utils/styles";

type Props = {
    children: ReactNode;
    mobile?: boolean;
    focus?: boolean;
    setIsMobileOpened: (isOpened: boolean) => void;
    isMobileOpened: boolean;
    setIsDesktopOpened: (isOpened: boolean) => void;
    isDesktopOpened: boolean;
}

export default function SidebarElevatedWrapper(props: Props) {
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({ theme });
    const [isMobileOpened, setIsMobileOpened] = useState(false);
    const [isMobileOpenedEffect, setIsMobileOpenedEffect] = useState(false);
    const [isDesktopOpened, setIsDesktopOpened] = useState(true);
    const [isDesktopOpenedEffect, setIsDesktopOpenedEffect] = useState(true);

    useEffect(() => {
        if (props.isMobileOpened) {
            setIsMobileOpened(props.isMobileOpened);
            setTimeout(() => {
                setIsMobileOpenedEffect(true);
            }, 10);
        } else {
            setIsMobileOpenedEffect(false);
            setTimeout(() => {
                setIsMobileOpened(props.isMobileOpened);
            }, 300);
        }
    }, [props.isMobileOpened]);

    useEffect(() => {
        if (props.isDesktopOpened) {
            setIsDesktopOpened(props.isDesktopOpened);
            setTimeout(() => {
                setIsDesktopOpenedEffect(true);
            }, 10);
        } else {
            setIsDesktopOpenedEffect(false);
            setTimeout(() => {
                setIsDesktopOpened(props.isDesktopOpened);
            }, 300);
        }
    }, [props.isDesktopOpened]);

    return (
        !props.mobile && !props.focus
            ? isDesktopOpened
                ? <div className={className([classes.wrapper, isDesktopOpenedEffect ? classes.wrapperOpened : null])}>
                    {props.children}
                </div> : null
            : isMobileOpened
            ? <div
                onClick={(e) => {
                    props.setIsMobileOpened(false);
                    e.stopPropagation();
                }}
                className={className([classes.elevatedWrapper, isMobileOpenedEffect ? classes.elevatedWrapperOpened : null])}>
                {props.children}
            </div>
            : null
    )
}


// region styles
const useStyles = createUseStyles({
    elevatedWrapper: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
        transition: "transition 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
        backgroundColor: "rgba(0, 0, 0, 0)",
        "& > div": {
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: "translateX(-100%)",
            opacity: 0,
        },
    },
    elevatedWrapperOpened: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        "& > div": {
            transform: "translateX(0%)",
            opacity: 1,
        },
    },
    wrapper: {
        transition: "transition 0.3s ease, opacity 0.3s ease, margin-left 0.3s ease",
        marginLeft: styles.size(-24),
        backgroundColor: ({ theme }: any) => theme.background,
        "& > div": {
            transition: "opacity 0.3s ease",
            opacity: 0,
        },
    },
    wrapperOpened: {
        opacity: 1,
        marginLeft: styles.size(0),
        "& > div": {
            opacity: 1,
        },
    },
});