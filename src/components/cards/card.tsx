import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { FlexBox } from "../authdoc_ui";
import { CSSProperties, ReactNode } from "react";
import { className } from "../../utils/className";

type Props = {
    flex?: number;
    title?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    leftHeader?: ReactNode;
    rightHeader?: ReactNode;
    onClick?: () => void;
};
export default function Card(props: Props) {
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({ theme });
    return (
        <FlexBox
            onClick={props.onClick}
            gap={styles.size(1)}
            style={{
                ...(props.flex && { flex: props.flex }),
                ...props.style,
            }}
            direction="column"
            mainAxisAlignment="space-between"
            crossAxisAlignment="stretch"
            className={className([
                classes.flexContainer,
                props.className || "",
            ])}>
            {(props.title || props.leftHeader) && (
                <FlexBox mainAxisAlignment="space-between">
                    {props.title ? (
                        <h5 className={classes.title}>{props.title}</h5>
                    ) : (
                        props.leftHeader ?? null
                    )}
                    {props.rightHeader ? (
                        props.rightHeader
                    ) : (
                        <svg
                            className={classes.svg}
                            width="4"
                            height="18"
                            viewBox="0 0 4 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle
                                cx="2"
                                cy="2"
                                r="2"
                                transform="rotate(90 2 2)"
                                fill="#6F6F6F"
                            />
                            <circle
                                cx="2"
                                cy="9"
                                r="2"
                                transform="rotate(90 2 9)"
                                fill="#6F6F6F"
                            />
                            <circle
                                cx="2"
                                cy="16"
                                r="2"
                                transform="rotate(90 2 16)"
                                fill="#6F6F6F"
                            />
                        </svg>
                    )}
                </FlexBox>
            )}
            {props.children}
        </FlexBox>
    );
}

const useStyles = createUseStyles({
    flexContainer: {
        // flexShrink: 1,
        minWidth: styles.size(2),
        height: "100%",
        background: ({ theme }: any) => theme.backgroundAlt,
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
        borderRadius: "12px",
        paddingBlock: styles.size(2),
        paddingInline: styles.size(2),
    },
    title: {
        fontWeight: 500,
        color: ({ theme }: any) => theme.foreground,
        fontSize: styles.size(1.5),
        margin: 0,
    },
    svg: {
        "& *": {
            fill: ({ theme }: any) => theme.foreground,
        },
    },
});
