// region imports
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import * as store from "../../store/indexOld";
// endregion

// region ToastNotification
export default function ToastNotification() {
    const theme = useTheme();
    const classes = useStyles({theme});

    // region render
    return (
        <div className={classes.toastNotificationsContainer}>
            {/*{toast.notifications.map((notification, index) => (*/}
            {/*    <div className={classes.toastNotificationItemContainer}>*/}
            {/*        Notificação*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    )
    // endregion
}
// endregion

// region styles
const useStyles = createUseStyles({
    toastNotificationsContainer: {
        position: "fixed",
        top: styles.size(1),
        right: styles.size(1),
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: styles.size(1),
    },
    toastNotificationItemContainer: {
        height: styles.size(8),
        width: styles.size(30),
        padding: styles.size(1),
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
        color: ({theme}: any) => theme.foreground,
        border: ({theme}: any) => `1px solid ${theme.foregroundSecondary}33`,
        boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.15)",
        borderRadius: styles.size(1),
    },
});
// endregion