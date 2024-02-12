import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {useState, ReactNode} from "react";
import {FlexBox} from "../authdoc_ui";
import { className } from "../../utils/className";

type Props = {
    title?: string;
    children?: ReactNode;
    index?: number;
}

export default function Accordion(props: Props) {
    const theme: any = useTheme();
    const classes = useStyles({theme});
    const [show, setShow] = useState(false)

    return (
        <div
            // style={{borderRadius: styles.size(.75), boxShadow: props.index ?? 0 > 0 ? "0px 2px 5px rgba(0,0,0,0.1)" : "none"}}
            >
            <FlexBox
                crossAxisAlignment="center"
                onClick={() => setShow(prev => !prev)}
                className={className([classes.container, show ? classes.accordionOpen : ""])}
                // style={{ backgroundColor: styles.blend(theme.backgroundAlt, theme.background, (props.index ?? 0) * 0.1) }}
                >
                <h1 className={classes.containerTitle}>{props?.title}</h1>
            </FlexBox>
            {show &&
                <FlexBox
                    column
                    gap={styles.size(1)}
                    className={classes.content}
                    // style={{ backgroundColor: styles.blend(theme.backgroundAlt, theme.background, ((props.index ?? 0) + 1) * 0.1) }}
                    >
                    {props?.children}
                </FlexBox>
            }
        </div>
    )
}

const useStyles = createUseStyles({
    container: {
        border: ({theme}: any) => `1px solid ${theme.border}`,
        // backgroundColor: ({theme}: any) => theme.backgroundAlt,
        borderRadius: styles.size(0.75),
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
        height: styles.size(3),
        paddingInline: styles.size(1),
        cursor: "pointer",
    },
    accordionOpen: {
        // borderRadius: `${styles.size(0.75)} ${styles.size(0.75)} 0 0`
    },
    containerTitle:{
        userSelect: "none",
    },
    content: {
        backgroundColor: ({theme}: any) => styles.darken(theme.backgroundAlt, 0.01),
        // border: ({theme}: any) => `1px solid ${theme.border}`,
        borderTop: "none",
        borderRadius: `0 0 ${styles.size(0.75)} ${styles.size(0.75)}`,
        // marginInline: styles.size(.5),
        // marginTop: "-1px",
        // padding: `${styles.size(1)} ${styles.size(1)}`,
        paddingBlock: styles.size(1),
        paddingLeft: styles.size(22),
        fontSize: styles.size(1),
    },
});
