import { CSSProperties, ReactNode, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import './sidebar.scss';
import {createUseStyles, useTheme} from "react-jss";
import * as styles from "../../../utils/styles";
import {FlexBox} from "../../../components/authdoc_ui";
import Dashboard from "../../../assets/images/icons/dashboard";
import Logo from "../../../assets/images/Logo";
import SidebarItems from "./sidebar_items";
import {StoreContext} from "../../../store";
import {LanguageContext} from "../../../utils/itn";
import {itns} from "./texts/sidebar.itn";
import MenuIcon from "../../../assets/images/icons/menu";
import { className } from "../../../utils/className";
import SidebarElevatedWrapper from "./sidebar_elevated_wrapper";
import { is } from "date-fns/locale";
import ExeltisLogo from "../../../assets/images/exeltis.svg";
import ExeltisWhiteLogo from "../../../assets/images/exeltis_white.svg";

type Props = {
    children?: ReactNode;
    style?: CSSProperties;
    mobile?: boolean;
    focus?: boolean;
    onItemChange?: (e: React.MouseEvent) => void;
    setIsMobileOpened: (isOpened: boolean) => void;
    isMobileOpened: boolean;
    setIsDesktopOpened: (isOpened: boolean) => void;
    isDesktopOpened: boolean;
}

export default function Sidebar(props: Props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const language = useContext(LanguageContext);
    const itn = itns[language];
    // const institutionGroup = useRecoilValue(store.institutionGroup)
    const store = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <SidebarElevatedWrapper
            setIsMobileOpened={props.setIsMobileOpened}
            isMobileOpened={props.isMobileOpened}
            setIsDesktopOpened={props.setIsDesktopOpened}
            isDesktopOpened={props.isDesktopOpened}
            mobile={props.mobile}
            focus={props.focus}>
            <FlexBox
                gap={styles.size(1)}
                direction="column"
                onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); } }
                mainAxisAlignment="space-between"
                className={classes.sidebarContainer}
                style={props.style}>
                <FlexBox
                    flex={1}
                    gap={styles.size(1.5)}
                    direction="column">
                    <FlexBox
                        mainAxisAlignment="center"
                        crossAxisAlignment="center"
                        className={classes.logoContainer}>
                        {props.mobile || props.focus ?
                            <FlexBox crossAxisAlignment="center" style={{height: styles.size(7), marginTop: styles.size(-1.5), marginBottom: styles.size(-1.5), marginLeft: styles.size(.5)}}>
                            <MenuIcon
                                isOpened={props.mobile ? props.isMobileOpened : props.isDesktopOpened}
                                className={classes.menuIcon}
                                onClick={(e) => props.onItemChange?.(e)}/>
                            </FlexBox>: null
                        }
                        {/* if light theme */}
                        <img style={{ maxHeight: "100%", padding: styles.size(1) }} src={store.settingsStore.theme === "dark" ? ExeltisWhiteLogo : ExeltisLogo} alt="logo" />
                        {/*<Logo onClick={() => navigate("/")} width={styles.size(21)} height={styles.size(4)} className={classes.logoSvg} />*/}
                    </FlexBox>
                    <FlexBox gap={styles.size(1)} direction="column" className={classes.expanderContainer}>
                        <FlexBox className={classes.sidebarItem}>
                            Meus Documentos
                        </FlexBox>
                        <FlexBox className={classes.sidebarItem}>
                            Planos
                        </FlexBox>
                        {/*<SidebarItems onItemChange={props.onItemChange} />*/}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </SidebarElevatedWrapper>
    );
}

// region styles
const useStyles = createUseStyles({
    sidebarContainer: {
        position: "relative",
        cursor: "pointer",
        zIndex: 1,
        width: styles.size(24),
        height: "100%",
        backgroundColor: ({theme}: any) => theme.background,
        borderRight: ({theme}: any) => styles.border(theme.border, "solid", 1),
        paddingInline: styles.size(1),
        paddingBlock: styles.size(1.5),
        boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.025)",
    },
    homeButton: {
        width: "100%",
        height: styles.size(3),
        backgroundColor: "black",
        borderRadius: styles.size(0.75),
        fontWeight: 500,
        fontSize: styles.size(1),
        paddingInline: styles.size(1),
        color: "rgba(255, 255, 255, 0.8)",
    },
    logoContainer: {
        marginInline: styles.size(-1),
        marginTop: styles.size(-1.5),
        height: styles.size(7),
        borderBottom: ({theme}: any) => styles.border(theme.border, "solid", 1),
    },
    sidebarItem: {
        height: styles.size(3.5),
        alignItems: "center",
        color: ({theme}: any) => theme.foregroundSecondary,
        paddingLeft: styles.size(2),
    },
    menuIcon: {
        "& *": {
            fill: ({theme}: any) => theme.foreground,
        },
    },
    logo: {
        paddingInline: styles.size(3),
    },
    logoSvg: {
        "& *": {
            fill: ({theme}: any) => theme.foreground,
        }
    },
    userImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    expanderContainer: {
        // marginTop: styles.size(1),
    },
    expanderHeader: {
        fontWeight: 400,
        fontSize: styles.size(1),
        color: ({theme}: any) => theme.foregroundSecondary,
        height: styles.size(3.5),
        paddingRight: styles.size(.5),
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
    expanderItemActive: {
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        color: ({theme}: any) => theme.elementBlue,
    },
    expanderDivider: {
        height: "1px",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
    },
    userCard: {
        width: "100%",
        height: styles.size(5),
        backgroundColor: ({theme}: any) => theme.elementBackgroundSecondary,
        borderRadius: styles.size(0.75),
        paddingInline: styles.size(1),
    },
    userCardPhoto: {
        width: styles.size(3),
        height: styles.size(3),
        borderRadius: styles.size(1.5),
        backgroundColor:  ({theme}: any) => theme.elementBlue,
        overflow: "hidden",
        flexShrink: 0,
    },
    userCardName: {
        fontWeight: "700",
        fontSize: styles.size(.75),
        color:  ({theme}: any) => theme.foreground,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        minWidth: 0,
    },
    userCardDescription: {
        fontWeight: "400",
        fontSize: styles.size(.75),
        color:  ({theme}: any) => theme.foregroundSecondary,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        minWidth: 0,
    },
    userCardParagraph: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block", // or display: inline-block
    },
});
// endregion

// <div onClick={(e) => e.stopPropagation()}>
//     <div style={{cursor: "pointer", userSelect: "none"}} onClick={() => navigate("/app")}>
//         {
//             institutionGroup?.institution !== undefined && institutionGroup?.institution.logo !== undefined
//                 ? <img src={`http://localhost:7070/static/${institutionGroup?.institution.logo}`} alt="logo"
//                        className="sidebar_logo"/>
//                 : <img src={logo} alt="logo" className="sidebar_logo"/>
//         }
//     </div>
//     <div>
//         {
//             institutionGroup?.units !== undefined && institutionGroup?.units.length > 0 ?
//                 <DropDown selected={unitSelected?.id} items={institutionGroup?.units}
//                           displayValuePath="name" onChange={function (item: InstitutionUnit): void {
//                     setUnitSelected(item);
//                 }}/>
//                 : null}
//     </div>
//     <div>
//         {items.map((item, index) => {
//             return (
//                 <SidebarItem
//                     key={index}
//                     path={item.path}
//                     location={location.pathname}
//                     text={item.text}
//                     icon={item.icon}
//                 />
//             )
//         })
//         }
//     </div>
// </div>