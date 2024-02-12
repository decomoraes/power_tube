import {FlexBox} from "../authdoc_ui";
import * as styles from "../../utils/styles";
import Icon from "../icon/icon";
import {createUseStyles, useTheme} from "react-jss";
import {useNavigate} from "react-router-dom";
import icons from "../../utils/icons";
import Loading from "../loading/loading";


export type BreadcrumbsItems = {
    route?: string;
    text?: string;
}

type Props = {
    homeRoute?: string;
    items?: BreadcrumbsItems[];
}

export default function BreadCrumbs(props: Props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const navigate = useNavigate();
    return (
        <FlexBox gap={styles.size(0.5)} crossAxisAlignment="center">
            <Icon
                onClick={() => navigate(props.homeRoute ?? "/")}
                className={classes.icon}
                name={icons.home4Fill}
                size={styles.size(1.5)} />
                {props.items && props.items.map((item, index) => (
                    <FlexBox gap={styles.size(0.5)} crossAxisAlignment="center" key={index}>
                        <Icon
                            className={classes.arrow}
                            name={icons.rightFill}
                            size={styles.size(1.5)} />
                        <span
                            onClick={() => item.route ? navigate(item.route) : {}}
                            className={classes.item}>{item.text ?? <Loading iconOnly iconSize={16} />}</span>
                    </FlexBox>
                ))}
        </FlexBox>
    );
}

// region styles
const useStyles = createUseStyles({
    icon: {
        cursor: "pointer",
        transition: "all .2s ease-in-out",
        "&:hover": {
            color: ({theme}: any) => theme.elementBlue,
        }
    },
    item: {
        cursor: "pointer",
        transition: "all .2s ease-in-out",
        "&:hover": {
            color: ({theme}: any) => theme.elementBlue,
        }
    },
    arrow: {
        userSelect: "none",
        cursor: "default"
    },
});
// endregion