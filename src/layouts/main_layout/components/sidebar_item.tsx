import counterLogo from "../../../assets/images/sidebar_icons/counter.svg";
import subjectsLogo from "../../../assets/images/sidebar_icons/subjects.svg";
import {className} from '../../../utils/className';
import {useNavigate} from 'react-router-dom';
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../../utils/styles";
import {FlexBox} from "../../../components/authdoc_ui";
import HomeIcon from "../../../assets/images/icons/home_icon";
import BookIcon from "../../../assets/images/icons/book_icon";
import CalendarIcon from "../../../assets/images/icons/calendar_icon";
import React from "react";

class Props {
    text?: string;
    icon?: string;
    location?: string;
    path?: string;
    onItemChange?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SidebarItem(props: Props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const navigate = useNavigate();

    const icons: { [key: string]: any } = {
        "home": (active: boolean) => <HomeIcon className={active ? classes.iconActive : classes.icon} />,
        "book": (active: boolean) => <BookIcon className={active ? classes.iconActive : classes.icon} />,
        "calendar": (active: boolean) => <CalendarIcon className={active ? classes.iconActive : classes.icon} />,
        "counter": () => counterLogo,
    }
    // constructor(props: Props) {
    //   super(props);
    // }

    return (
        <FlexBox
            gap={styles.size(1)}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                props.onItemChange && props.onItemChange(e);
                console.log("asdf");
                navigate(props.path ?? "/")
            }}
            crossAxisAlignment="center"
            className={className([classes.expanderItem, props.location === props.path ? classes.expanderItemActive : ""])}>
            {props.icon
                ? icons[props.icon](props.location === props.path)
                : null
            }
            {props.text}
        </FlexBox>
    );
}

const useStyles = createUseStyles({
    sidebarContainer: {
        position: "relative",
        cursor: "pointer",
        zIndex: 1,
        width: styles.size(20),
        backgroundColor: ({theme}: any) => theme.backgroundAlt,
    },
    expanderItem: {
        fontWeight: 500,
        fontSize: styles.size(1),
        borderRadius: styles.size(0.75),
        color: ({theme}: any) => theme.foregroundSecondary,
        width: "100%",
        height: styles.size(3),
        paddingInline: styles.size(1.5),
        transition: "background-color 0.2s ease-in-out",
    },
    expanderItemActive: {
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        color: ({theme}: any) => theme.elementBlue,
    },
    icon: {
        "& *": {
            fill: ({theme}: any) => theme.foregroundSecondary,
        }
    },
    iconActive: {
        "& *": {
            fill: ({theme}: any) => theme.elementBlue,
            // transform: "rotate(-20deg) translate(-10%, 5%) scale(1.1)",
        }
    },
});
