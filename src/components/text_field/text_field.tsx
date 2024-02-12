import React, {CSSProperties, ReactNode} from 'react';
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {FlexBox} from "../authdoc_ui";
import {className} from "../../utils/className";

type Props = {
    children?: ReactNode,
    title?: string,
    onClick?: () => void,
    value?: string,
    onChange?: (value: string) => void,
    style?: CSSProperties,
    className?: string,
    size?: "small" | "medium" | "large",
    placeholder?: string,
    type?: "text" | "password" | "email",
    onEnter?: () => void,
}

export default function TextField(props: Props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            props.onEnter?.();
        }
    }
    return (
        <FlexBox gap={styles.size(.5)} direction="column">
            {/* label */}
            <label className={classes.label}>{props.title}</label>
            <input
                value={props.value}
                onChange={(e) => props.onChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                className={className([classes.textField, props.size === "large" ? classes.large : null])}
                type={props.type ?? "text"}
                placeholder={props.placeholder}/>
        </FlexBox>
    );
}

const useStyles = createUseStyles({
    textField: {
        border: "none",
        minWidth: "103px",
        height: styles.size(3),
        paddingInline: styles.size(1),
        left: "822px",
        top: "336px",
        borderRadius: "9px",
        width: "100%",
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        color: ({theme}: any) => theme.foregroundSecondary,
    },
    large: {
        height: styles.size(5),
        paddingInline: styles.size(2),
    },
    label: {
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foreground,
    },
});