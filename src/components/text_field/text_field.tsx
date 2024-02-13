import React, { CSSProperties, ReactNode } from "react";
import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { FlexBox } from "../authdoc_ui";
import { className } from "../../utils/className";

type Props = {
    children?: ReactNode;
    title?: string;
    onClick?: () => void;
    value?: string;
    onChange?: (value: string) => void;
    style?: CSSProperties;
    className?: string;
    showArrow?: boolean;
    size?: "small" | "medium" | "large";
    placeholder?: string;
    type?: "text" | "password" | "email";
    onEnter?: () => void;
};

export default function TextField(props: Props) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            props.onEnter?.();
        }
    }
    return (
        <FlexBox gap={styles.size(0.5)} direction="column">
            {/* label */}
            {props.title ? (
                <label className={classes.label}>{props.title}</label>
            ) : null}
            <FlexBox
                row
                gap={styles.size(0.5)}
                direction="column"
                className={classes.textFieldContainer}>
                <input
                    value={props.value}
                    onChange={(e) => props.onChange?.(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={className([
                        classes.textField,
                        props.size === "large" ? classes.large : null,
                    ])}
                    type={props.type ?? "text"}
                    placeholder={props.placeholder}
                />
                {props.showArrow && (
                    <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.675 9H0.5V7H12.675L7.075 1.4L8.5 0L16.5 8L8.5 16L7.075 14.6L12.675 9Z"
                            fill="#1C1B1F"
                        />
                    </svg>
                )}
            </FlexBox>
        </FlexBox>
    );
}

const useStyles = createUseStyles({
    textFieldContainer: {
        borderBottom: "1px solid black",
        alignItems: "center",
    },
    textField: {
        border: "none",
        minWidth: "103px",
        height: styles.size(2),
        paddingInline: styles.size(0),
        width: "100%",
        backgroundColor: "transparent",
        color: ({ theme }: any) => theme.foregroundSecondary,
        "&::placeholder": {
            color: "black",
            opacity: 1,
        },
    },
    large: {
        height: styles.size(5),
        paddingInline: styles.size(2),
    },
    label: {
        fontSize: styles.size(1),
        color: ({ theme }: any) => theme.foreground,
    },
});
