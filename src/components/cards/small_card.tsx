import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {FlexBox} from "../authdoc_ui";
import React, {RefObject} from "react";
import useElementDimensions from "../../utils/useElementDimensions";

type Props = {
    flex?: number,
    title?: string,
}
export default function SmallCard(props: Props) {
    const theme: any = useTheme();
    // @ts-ignore
    const classes = useStyles({theme});
    const ref = React.useRef<HTMLDivElement>(null);
    const {height, width} = useElementDimensions(ref);
    return (
        <div ref={ref} className={classes.container} style={{flex: 1}}>
            <FlexBox mainAxisAlignment="center" crossAxisAlignment="center" className={classes.child}>
                <div className={classes.smooth} style={{ boxShadow: `0 0 ${width * 0.4}px ${width * 0.3}px ${theme.foreground}33`, }} />
            </FlexBox>
            <FlexBox mainAxisAlignment="center" crossAxisAlignment="center" className={classes.child}>
                <div className={classes.number} style={{ fontSize: `${width * 0.3}px` }}>7</div>
            </FlexBox>
            <FlexBox
                direction="column"
                mainAxisAlignment="space-between"
                crossAxisAlignment="center"
                style={{ fontSize: `${width * 0.14}px` }}
                className={classes.flexContainer}>
                <svg style={{ alignSelf: "flex-start", width: `${width * 0.12}px`, height: `${width * 0.12}px` }} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.60262 1.22949C6.69235 0.952945 7.0836 0.952945 7.17333 1.22949L8.44464 5.14764C8.48477 5.27131 8.59998 5.35505 8.72999 5.35505H12.8531C13.1437 5.35505 13.2645 5.72685 13.0295 5.89771L9.69615 8.32101C9.59109 8.39739 9.54712 8.53271 9.5872 8.65626L10.859 12.576C10.9487 12.8524 10.6323 13.0821 10.3973 12.9112L7.06438 10.4883C6.9592 10.4119 6.81675 10.4119 6.71157 10.4883L3.37866 12.9112C3.14361 13.0821 2.82722 12.8524 2.91691 12.576L4.18875 8.65626C4.22884 8.53271 4.18486 8.39739 4.0798 8.32101L0.746443 5.89771C0.511414 5.72685 0.632277 5.35505 0.922849 5.35505H5.04596C5.17597 5.35505 5.29119 5.27131 5.33131 5.14764L6.60262 1.22949Z" fill="#D1D1D1"/>
                </svg>
                {props.title}
            </FlexBox>
        </div>
    )
}

const useStyles = createUseStyles({
    child: {
        gridArea: "area",
        height: "auto",
        aspectRatio: "3/4",
    },
    container: {
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto",
        grid: "'area'",
        minWidth: styles.size(2),
        // height: styles.size(15),
        height: "auto",
        aspectRatio: "3/4",
        background: ({theme}: any) => theme.backgroundAlt,
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
        borderRadius: styles.size(1),
    },
    flexContainer: {
        gridArea: "area",
        paddingTop: styles.size(1),
        paddingBottom: "20%",
        paddingInline: styles.size(1),
        color: ({theme}: any) => theme.foreground,
    },
    smooth: {
        backgroundColor: "transparent",
        height: "0px",
        width: "0px",
        borderRadius: "100%",
        // boxShadow: "0 0 50px 35px rgba(180, 180, 180, 0.5)",
    },
    number: {
        color: ({theme}: any) => theme.foreground,
        fontWeight: "bold",
        textShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    },
});