import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../../utils/styles";
import React, {useContext, useEffect, useRef, useState} from "react";
import {className} from "../../../utils/className";
import {FlexBox} from "../../../components/authdoc_ui";
import Arrow from "../../../assets/images/icons/arrow";
import SidebarItem from "./sidebar_item";
import {useLocation} from "react-router-dom";
import {LanguageContext} from "../../../utils/itn";
import {itns} from "./texts/sidebar.itn";

export type Item = {
    path: string,
    text: string,
    icon: string,
};

export type ItemGroup = {
    text: string,
    isOpen: boolean,
    items: Item[],
};

type Props = {
    onItemChange?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SidebarItems(props: Props) {
    const language = useContext(LanguageContext);
    const itn = itns[language];

    const itemsGroup: ItemGroup[] = [
        {
            text: itn.principal.title,
            isOpen: true,
            items: [
                {
                    path: "/",
                    text: itn.principal.homePage,
                    icon: "home",
                },
                {
                    path: "/libraries",
                    text: itn.principal.libraries,
                    icon: "book",
                },
                {
                    path: "/calendar",
                    text: itn.principal.calendar,
                    icon: "calendar",
                },
                {
                    path: "/students",
                    text: itn.principal.subjects,
                    icon: "subjects",
                },
            ]
        },
        {
            text: itn.professors.title,
            isOpen: false,
            items: [
                {
                    path: "/professors/",
                    text: itn.professors.homePage,
                    icon: "home",
                },
            ]
        },
        {
            text: itn.institutional.title,
            isOpen: false,
            items: [
                {
                    path: "/",
                    text: itn.principal.homePage,
                    icon: "home",
                },
                {
                    path: "/libraries",
                    text: itn.principal.libraries,
                    icon: "book",
                },
                {
                    path: "/calendar",
                    text: itn.principal.calendar,
                    icon: "calendar",
                },
                {
                    path: "/students",
                    text: itn.principal.subjects,
                    icon: "subjects",
                },
            ]
        },
    ]
    return (
        <>
            {itemsGroup.map((itemGroup, index) => (
                <SidebarItemCollapsible onItemChange={props.onItemChange} key={index} itemGroup={itemGroup} />
            ))}
        </>
    )
}

function SidebarItemCollapsible(props: { itemGroup: ItemGroup, onItemChange?: (e: React.MouseEvent<HTMLDivElement>) => void; }) {
    const [open, setOpen] = useState(props.itemGroup.isOpen);
    const theme = useTheme();
    const location = useLocation();
    const classes = useStyles({theme});
    return (
        <span>
            <FlexBox
                crossAxisAlignment="center"
                mainAxisAlignment="space-between"
                onClick={() => setOpen(!open)}
                className={
                    className([classes.expanderHeader, open ? classes.expanderIsOpen : null])
                }>
                {props.itemGroup.text}
                <Arrow isOpen={open} />
            </FlexBox>
            <div
                style={open ? {
                    maxHeight: styles.size(100),
                } : {}}
                className={classes.expanderContent}>
                <div className={classes.expanderDivider}/>
                {props.itemGroup.items.map((item, index) => (
                    <SidebarItem onItemChange={props.onItemChange} location={location.pathname} key={index} path={item.path} text={item.text} icon={item.icon}/>
                ))}
            </div>
        </span>
    )
}

const useStyles = createUseStyles({
    expanderHeader: {
        fontWeight: 400,
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
        height: styles.size(3.5),
        paddingRight: styles.size(.5),
    },
    expanderIsOpen: {
        "&:after": {
            content: "\f056",
        }
    },
    expanderContent: {
        maxHeight: 0,
        overflow: "hidden",
        transition: "max-height 0.2s ease-in-out",
    },
    expanderItem: {
        fontWeight: 500,
        fontSize: styles.size(1),
        borderRadius: styles.size(0.75),
        color: ({theme}: any) => theme.foregroundSecondary,
        width: "100%",
        height: styles.size(3),
        paddingInline: styles.size(1.5),
    },
    expanderDivider: {
        height: "1px",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
    },
    expanderItemActive: {
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        color: ({theme}: any) => theme.elementBlue,
    },
});