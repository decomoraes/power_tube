import { createUseStyles, useTheme } from "react-jss";
import * as styles from "../../utils/styles";
import { className } from "../../utils/className";
import React, { Fragment, useState } from "react";

type Item = {
    id: number,
    text: string,
}

type Props = {
    items: Array<Item>,
}

export default function TabView(props: Props) {
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles({theme});
    const [selectedItem, setSelectedItem] = useState(props.items[0]?.id);

    return (
        <div className={classes.container}>
            {props.items.map((item, index) => (
                <>
                <div
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={className([classes.item, item.id === selectedItem ? classes.itemActive : null])}>
                    <span>{item.text}</span>
                    {item.id === selectedItem ?
                        <>
                            <span className={classes.itemLeftCorner} />
                            <span className={classes.itemRightCorner} />
                        </>
                    : null}
                </div>
                <div className={classes.divider} />
                </>
            ))}
            <div className={classes.leftCorner}></div>
            <div className={classes.rightCorner}></div>
        </div>
    )
}

const useStyles = createUseStyles({
    container: {
        position: "relative",
        backgroundColor: ({theme}: any) => theme.backgroundSemiAlt,
        marginTop: styles.size(-2),
        marginLeft: styles.size(-2),
        marginRight: styles.size(-2),
        height: styles.size(3.5),
        borderRadius: `${styles.size(1)} ${styles.size(1)} 0 0`,
        cursor: "pointer",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingInline: styles.size(2),
        borderBottom: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
        gap: styles.size(1),
    },
    leftCorner: {
        position: "absolute",
        width: styles.size(1),
        height: styles.size(1),
        backgroundColor: ({theme}: any) => theme.backgroundSemiAlt,
        left: 0,
        top: "100%",
        borderRadius: `0 0 ${styles.size(1)} 0`,
        "&:after": {
            content: "''",
            borderTop: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
            position: "absolute",
            width: styles.size(1),
            height: styles.size(1),
            backgroundColor: ({theme}: any) => theme.backgroundAlt,
            left: 0,
            top: 0,
            borderRadius: `${styles.size(1)} 0 0 0`,
        },
    },
    rightCorner: {
        position: "absolute",
        width: styles.size(1),
        height: styles.size(1),
        backgroundColor: ({theme}: any) => theme.backgroundSemiAlt,
        right: 0,
        top: "100%",
        borderRadius: `0 0 0 ${styles.size(1)}`,
        "&:after": {
            content: "''",
            borderTop: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
            position: "absolute",
            width: styles.size(1),
            height: styles.size(1),
            backgroundColor: ({theme}: any) => theme.backgroundAlt,
            right: 0,
            top: 0,
            borderRadius: `0 ${styles.size(1)} 0 0`,
        }
    },
    divider: {
        height: styles.size(1),
        width: "1px",
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        marginInline: `calc(${styles.size(-1)} - 1px)`,
        // opacity: 0.3,
        marginBottom: `calc(${styles.size(1)} - 1px)`,
    },
    item: {
        height: styles.size(3),
        fontSize: styles.size(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "-1px",
        paddingInline: styles.size(1),
        borderTop:"1px solid transparent",
        borderLeft:"1px solid transparent",
        borderRight:"1px solid transparent",
        color: ({theme}: any) => theme.foregroundSecondary,
        whiteSpace: "nowrap",
        userSelect: "none",
    },
    itemActive: {
        color: ({theme}: any) => theme.foreground,
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        borderRadius: `${styles.size(1)} ${styles.size(1)} 0 0`,
        position: "relative",
        borderTop: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
        borderLeft: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
        borderRight: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
    },
    itemLeftCorner: {
        position: "absolute",
        width: "1px",
        height: "1px",
        // backgroundColor: ({theme}: any) => theme.elementBlue,
        left: styles.size(-1),
        bottom: 0,
        borderLeft: "12px solid rgba(0,0,0,0)",
        borderBottom: ({theme}) => `12px solid ${theme.backgroundAlt}`,
        "&:after": {
            content: "''",
            position: "absolute",
            width: styles.size(1),
            height: styles.size(1),
            backgroundColor: ({theme}: any) => theme.backgroundSemiAlt,
            left: styles.size(-1),
            bottom: styles.size(-1),
            borderRadius: `0 0 ${styles.size(1)} 0`,
            borderRight: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
            borderBottom: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
        }
    },
    itemRightCorner: {
        position: "absolute",
        width: "1px",
        height: "1px",
        // backgroundColor: ({theme}: any) => theme.elementBlue,
        right: styles.size(-1),
        bottom: 0,
        borderRight: "12px solid rgba(0,0,0,0)",
        borderBottom: ({theme}) => `12px solid ${theme.backgroundAlt}`,
        "&:after": {
            content: "''",
            position: "absolute",
            width: styles.size(1),
            height: styles.size(1),
            backgroundColor: ({theme}: any) => theme.backgroundSemiAlt,
            right: styles.size(-1),
            bottom: styles.size(-1),
            borderRadius: `0 0 0 ${styles.size(1)}`,
            borderLeft: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
            borderBottom: ({theme}: any) => `1px solid ${theme.elementBackgroundSecondary}`,
        },
    },
});