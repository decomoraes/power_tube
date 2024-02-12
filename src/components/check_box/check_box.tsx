import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../utils/styles";
import {FlexBox} from "../authdoc_ui";
import {className} from "../../utils/className";
import {useState} from "react";

type Props = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    value?: string;
}

export default function CheckBox(props: Props) {
    // region properties
    const theme = useTheme();
    const classes = useStyles({theme});
    const [checked, setChecked] = useState(false);
    // endregion

    return (
        <FlexBox
            crossAxisAlignment="center"
            onClick={() => {
                props.onChange && props.onChange(!checked);
                setChecked(!checked);
            }}
            gap={styles.size(1)}>
            <div className={className([classes.checkBox, props.checked ? classes.checkBoxActive : checked ? classes.checkBoxActive : null])}>
                {checked ?
                    <span className={className(["mgc_check_fill", classes.checkIcon])} />
                : null}
            </div>
            <div className={classes.checkBoxText}>{props.value}</div>
        </FlexBox>
    )
}

// region style
const useStyles = createUseStyles({
    checkBox: {
        width: styles.size(1.5),
        height: styles.size(1.5),
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        color: ({theme}: any) => theme.background,
        border: ({theme}: any) => `1px solid ${theme.foreground}`,
        borderRadius: styles.size(0.25),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    checkBoxActive: {
        backgroundColor: ({theme}: any) => theme.foreground,
    },
    checkIcon: {
        "&:before": {
            color: ({theme}: any) => theme.background,
        }
    },
    checkBoxText: {
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
        cursor: "pointer",
        userSelect: "none",
    },
});
// endregion