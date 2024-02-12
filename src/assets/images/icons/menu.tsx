import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../../utils/styles";
import { className } from "../../../utils/className";

type iconProps = {
    width?: number,
    height?: number,
    onClick?: (e: React.MouseEvent) => void;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
    isOpened?: boolean;
}

export default function Menu(props: iconProps) {
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({ theme });
    return (
        <svg
            onClick={props.onClick}
            style={{...(props.onClick ? {cursor: "pointer"} : null), ...props.style}}
            className={props.className}
            width={props.width ?? 15}
            height={props.height ?? 14}
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="12" width="14" height="2" rx="0.3" fill="black"/>
            <rect x="8" y="6" width="7" height="2" rx="0.3" fill="black"/>
            <rect x="8" width="7" height="2" rx="0.3" fill="black"/>
            <path className={className([classes.arrow, !props.isOpened ? classes.arrowTransformed : null])} d="M0.261861 4.72678C0.123723 4.60715 0.123723 4.39285 0.261861 4.27322L4.0036 1.03278C4.1979 0.864515 4.5 1.00253 4.5 1.25956L4.5 7.74044C4.5 7.99747 4.1979 8.13549 4.0036 7.96722L0.261861 4.72678Z" fill="black"/>
            {/*transform={!props.isOpened ? "scale(1 1) rotate(-180 2.75 4.5)" : ""}*/}
        </svg>
    )
}

// region styles
const useStyles = createUseStyles({
    arrow: {
        // transform: "",
        // transform: "scale(-1,1) translate(-5.55px,0px)",
        transition: "transform 0.2s ease-in-out",
    },
    arrowTransformed: {
        // transform: "rotate(180deg) translate(-5.5px,-9px)",
        transform: "scale(-1,1) translate(-5.55px,0px)",
    },
});