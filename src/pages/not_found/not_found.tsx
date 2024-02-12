import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {FlexBox} from "../../components/authdoc_ui";
import notFoundImage from "../../assets/images/not_found.webp";

export default function NotFound() {
    const theme = useTheme();
    const classes = useStyles({theme});
    return (
        <FlexBox
            column
            gap={styles.size(10)}
            crossAxisAlignment="center"
            className={classes.container}
        >
            <FlexBox
                mainAxisAlignment="center"
                gap={styles.size(10)}
                className={classes.content}
            >
                <FlexBox crossAxisAlignment="center" mainAxisAlignment="center" flex={1}>
                    <div className={classes.grid}>
                        <FlexBox mainAxisAlignment="center" crossAxisAlignment="center" className={classes.child}>
                            <div className={classes.smooth}/>
                        </FlexBox>
                        <FlexBox mainAxisAlignment="center" crossAxisAlignment="center" className={classes.child}>
                            <img
                                className={classes.image}
                                src={notFoundImage}
                                alt="girl"/>
                        </FlexBox>
                    </div>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

const useStyles = createUseStyles({
    container: {
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        paddingInline: styles.size(2),
    },
    content: {
        width: "100%",
        maxWidth: styles.size(100),
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto",
        grid: "'area'",
    },
    child: {
        gridArea: "area",
    },
    smooth: {
        backgroundColor: "transparent",
        height: "0px",
        width: "0px",
        borderRadius: "50%",
        boxShadow: ({theme}: any) => `0 0 150px 150px ${theme.elementBlue}44`,
    },
    image: {
        // maxWidth: styles.size(30),
        maxWidth: "100%",
        maxHeight: "80vh",
        objectFit: "contain",
    },
    submitButton: {
        height: styles.size(5),
        marginTop: styles.size(2),
        borderRadius: styles.size(0.75),
        fontSize: styles.size(1),
        fontWeight: "bold",
        border: "none",
        backgroundColor: ({theme}: any) => theme.elementBlue,
        boxShadow: ({theme}: any) => `0px 10px 20px 5px ${theme.elementBlue}33`,
        color: "white",
        cursor: "pointer",
    },
    checkBox: {
        width: styles.size(1.5),
        height: styles.size(1.5),
        backgroundColor: ({theme}: any) => theme.foreground,
        color: ({theme}: any) => theme.background,
        borderRadius: styles.size(0.25),
    },
    checkBoxText: {
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
    },
    recoveryPassword: {
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
    },
});