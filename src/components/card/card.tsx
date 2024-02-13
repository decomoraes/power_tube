import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { ReactNode, CSSProperties } from "react";
import { className } from "../../utils/className";
import card from "./card.module.css";

type Colors =
    | "blue"
    | "green"
    | "salmon"
    | "violet"
    | "lilac"
    | "pink"
    | "white";

type Props = {
    onClick?: () => void;
    children?: ReactNode;
    disabled?: boolean;
    style?: CSSProperties;
    color?: Colors;
};

const convertColor: { [key in Colors]: string } = {
    blue: "#A0E5FD",
    green: "#92FFA3",
    salmon: "#FE9595",
    violet: "#ADABF7",
    lilac: "#D4C4FF",
    pink: "#FDC4F6",
    white: "#FFFFFF",
};

export default function Card(props: Props) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div
            className={className([
                classes.card,
                card.ptCard,
                props.disabled ? classes.disabled : null,
            ])}
            style={{
                ...(props.color
                    ? { backgroundColor: convertColor[props.color] }
                    : {}),
                ...props.style,
            }}
            onClick={() =>
                !props.disabled && props.onClick !== undefined
                    ? props.onClick()
                    : {}
            }>
            {props.children}
        </div>
    );
}

const useStyles = createUseStyles({
    card: {
        borderRadius: 9,
        border: "1px solid #272727",
        fontSize: styles.size(1),
        fontWeight: "bold",
        color: "black",
        paddingInline: styles.size(5.5),
        paddingBlock: styles.size(3.75),
        transition:
            "background-color 0.2s ease-in-out, transform 0.2s ease-in-out",
        // backgroundColor: ({ theme }: any) => theme.elementBlue,
        backgroundColor: "#A0E5FD",
        // boxShadow: ({ theme }: any) => `0px 10px 20px 5px ${theme.elementBlue}33`,
        // "&:hover": {
        //     backgroundColor: ({ theme }: any) =>
        //         styles.darken(theme.elementBlue, 0.1),
        //     transform: "translateY(-2px) scale(1.01)",
        // },
        // "&:active": {
        //     backgroundColor: ({ theme }: any) => styles.darken(theme.elementBlue, 0.3),
        // }
    },
    disabled: {
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        color: ({ theme }: any) => `${theme.foregroundSecondary}77`,
        boxShadow: ({ theme }: any) => "unset",
        cursor: "not-allowed",
    },
});
