import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { ReactNode, CSSProperties } from "react";
import { className } from "../../utils/className";

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
    children: ReactNode;
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

export default function Button(props: Props) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <button
            className={className([
                classes.button,
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
        </button>
    );
}

const useStyles = createUseStyles({
    button: {
        height: styles.size(3),
        borderRadius: 9,
        border: "2px solid #272727",
        fontSize: styles.size(1),
        fontWeight: "bold",
        color: "black",
        cursor: "pointer",
        fontFamily: "Gunterz",
        paddingInline: styles.size(1.5),
        boxShadow: "8px 8px 0px black",
        transition:
            "background-color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        // backgroundColor: ({ theme }: any) => theme.elementBlue,
        backgroundColor: "#A0E5FD",
        // boxShadow: ({ theme }: any) => `0px 10px 20px 5px ${theme.elementBlue}33`,
        "&:hover": {
            transform: "translate(-2px, -2px)",
            boxShadow: "10px 10px 0px #000000cc",
        },
        "&:active": {
            transform: "translate(8px, 8px)",
            boxShadow: "0px 0px 0px #000000cc",
        },
    },
    disabled: {
        backgroundColor: ({ theme }: any) => theme.backgroundAlt,
        color: ({ theme }: any) => `${theme.foregroundSecondary}77`,
        boxShadow: ({ theme }: any) => "unset",
        cursor: "not-allowed",
    },
});
