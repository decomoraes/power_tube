import {className} from "../../utils/className";
import {CSSProperties, ReactNode} from "react";
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";

class Props {
    children?: ReactNode;
    name?: string;
    title?: string;
    size?: string;
    style?: CSSProperties;
    className?: string;
    onClick?: () => void;
}

export default function Icon(props: Props) {
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({theme});
    return (
        <span
            onClick={props.onClick}
            className={className([classes.icon, props.className ?? null])}
            style={{
                ...props.style,
                ...(props.size && {fontSize: props.size})
            }} >
            {props.children ?? props.name}
        </span>
    )
}


const useStyles = createUseStyles({
    icon: {
        fontFamily: "MingCute",
        fontSize: styles.size(2),
        color: ({theme}: any) => theme.foreground,
        lineHeight: 1,
    },
});