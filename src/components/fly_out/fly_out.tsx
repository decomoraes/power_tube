import {ReactNode, useRef, useState} from "react";
import {useOutsideEvent} from "../../utils/useOutsideEvent";
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {className} from "../../utils/className";
import {FlexBox} from "../authdoc_ui";
import Icon from "../icon/icon";
import icons from "../../utils/icons";

type Props = {
    children: ReactNode,
    items: Array<Item>,
}

type Item = {
    text: string,
    icon?: string,
    onClick: () => void,
}

export default function FlyOut(props: Props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [show, setShow] = useState<boolean>(false);
    const [showEffect, setShowEffect] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideEvent(wrapperRef, () => close());

    function open() {
        setShow(true);
        setTimeout(() => {
            setShowEffect(true);
        }, 10);
    }

    function close() {
        setShowEffect(false);
        setTimeout(() => {
            setShow(false);
        }, 200);
    }

    return (
        <div className={classes.container} ref={wrapperRef}>
            <div className={classes.header} onClick={() => show ? close() : open()}>
                {props.children}
            </div>
            {show
                ?
                <div className={className([classes.body, showEffect ? classes.bodyOpened : null])}>
                    {props.items.map((item, index) => {
                        return (
                            <FlexBox
                                key={index}
                                gap={styles.size(1)}
                                onClick={() => {
                                    close();
                                    item.onClick();
                                }}
                                crossAxisAlignment="center"
                                className={className([classes.expanderItem])}>
                                {/*{item.icon && <span className={className([classes.icons, item.icon])} />}*/}
                                {item.icon && <Icon name={item.icon} className={className([classes.icons])} />}
                                {item.text}
                            </FlexBox>
                            // <div
                            //     key={index}
                            //     onClick={() => {
                            //         setShow(false);
                            //         item.onClick();
                            //     }}
                            //     className={classes.bodyItem}>
                            //     {item.text}
                            // </div>
                        )
                    })}
                </div>
                : null}
        </div>
    )
}

const useStyles = createUseStyles({
    container: {
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    body: {
        position: "absolute",
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        border: ({theme}: any) => `${theme.background}aa 1px solid`,
        color: ({theme}: any) => theme.foregroundSecondary,
        top: "calc(100% + 3px)",
        padding: styles.size(1),
        right: "0",
        borderRadius: styles.size(1),
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
        minWidth: "180px",
        transition: "transform 0.1s ease-out, opacity 0.15s ease-out",
        transform: "translateY(-25%) translateX(25%) scale(0.5)",
        opacity: 0,
    },
    bodyOpened: {
        transform: "translateY(0%) translateX(0%) scale(1)",
        opacity: 1,
    },
    bodyItem: {
        padding: "3px",
        borderRadius: "3px",
        transition: ".5s ease all",
        "&:hover": {
            backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
            color: ({theme}: any) => theme.elementBlue,
        },
    },
    icons: {
        fontSize: styles.size(1.5),
        "&:before": {
            color: ({theme}: any) => theme.foreground,
        },
    },
    expanderItem: {
        fontWeight: 500,
        fontSize: styles.size(1),
        borderRadius: styles.size(0.75),
        color: ({theme}: any) => theme.foregroundSecondary,
        width: "100%",
        height: styles.size(3),
        paddingInline: styles.size(1.5),
        transition: "background-color 0.2s ease-in-out",
        "&:hover": {
            backgroundColor: ({theme}: any) => `${theme.elementBackgroundSecondary}44`,
        },
    },
});