// region imports
import React, {ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import useWindowDimensions from '../../utils/useWindowDimensions';
import Header from './components/header';
import Sidebar from './components/sidebar';
import {createUseStyles, useTheme} from "react-jss";
import {FlexBox} from "../../components/authdoc_ui";
import * as styles from "../../utils/styles";
import {fetchUser} from "../../api/user";
import {StoreContext} from "../../store";
import {useNotifications} from "reapop";
import {Outlet} from "react-router-dom";
import {useItn} from "../../utils/itn";
import { itns, messages } from "./texts/main_layout.itn";
import {observer} from "mobx-react";
// endregion

// region MainLayout
const MainLayout = observer((props: { children?: ReactNode, header?: string }) => {
    // region properties
    const theme = useTheme();
    const classes = useStyles({theme});
    const {height, width} = useWindowDimensions();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState<boolean>(true);
    const store = useContext(StoreContext);
    const { t } = useItn(itns, messages);
    const {notify} = useNotifications();
    // const setEnrollments = useSetRecoilState(store.enrollments)
    // endregion

    // region effects
    const fetchData = useCallback(async () => {

        let userResponse = await fetchUser(store.authStore.token)
        if (userResponse.status >= 300 || userResponse.payload === undefined) {
            notify(t(userResponse.message), "error");
            return store.authStore.token = undefined;
        }
        store.userStore.user = userResponse.payload;
        // let enrollmentsResponse = await fetchEnrollments(userResponse.payload.id, isntitutionUnitIdResponse.payload.id, token?.value)
        // if (enrollmentsResponse.status >= 300) return alert("Erro ao buscar matrículas do usuário");
        // setEnrollments({enrollments: enrollmentsResponse.payload});
    }, [notify, store.authStore, store.userStore, t]) // if userId changes, useEffect will run again

    // useEffect(() => {
    //     fetchData().then(r => {})
    // }, [fetchData])
    // endregion

    // region render
    return (
        <FlexBox flex={1} direction="row" style={{ height: `${height}px` }}>
                <Sidebar
                    isMobileOpened={mobileSidebarOpen}
                    setIsMobileOpened={setMobileSidebarOpen}
                    isDesktopOpened={desktopSidebarOpen}
                    setIsDesktopOpened={setDesktopSidebarOpen}
                    mobile={width <= 768}
                    focus={store.settingsStore.focusMode}
                    onItemChange={(e: React.MouseEvent) => setMobileSidebarOpen(false)} />
            <FlexBox direction="column" flex={1}>
            <Header
                sidebarIsOpened={width > 768 && !store.settingsStore.focusMode ? desktopSidebarOpen : mobileSidebarOpen}
                onClick={() => {
                    width > 768 && !store.settingsStore.focusMode ?
                    setDesktopSidebarOpen(!desktopSidebarOpen) :
                    setMobileSidebarOpen(!mobileSidebarOpen);
                }}
                title={props.header}/>
                <FlexBox flex={1} direction="column" className={classes.content} style={{ height: `${height - 60}px` }}>
                    <Outlet />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
    // endregion
});
// endregion

// region style
const useStyles = createUseStyles({
    content: {
        backgroundColor: ({ theme }: any) => theme.background,
        paddingInline: styles.size(3),
        paddingBlock: styles.size(3),
        overflowY: "scroll",
        color: ({ theme }: any) => theme.foreground,
    },
    wrapper: {
        padding: 40,
        background: ({ theme }: any) => theme.background,
        textAlign: "left"
    },
    title: {
        font: {
            size: 40,
            weight: 900
        },
        color: ({ theme }: any) => theme.color
    },
    link: {
        color: ({ theme }: any) => theme.color,
        "&:hover": {
            opacity: 0.5
        }
    }
});
// endregion

export default MainLayout;