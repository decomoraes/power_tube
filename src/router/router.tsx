// region imports
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from "../layouts/main_layout/main_layout";
import Home from "../pages/home/home";
import LanguageSettings from "../pages/settings/language_settings";
// import Libraries from "../pages/libraries/libraries";
import NotFound from "../pages/not_found/not_found";
import NotificationsSystem, {
    atalhoTheme,
    setUpNotifications,
    useNotifications,
} from "reapop";
import Profile from "../pages/user/profile";
import React, { useContext } from "react";
import RecoveryPassword from "../pages/auth/recovery_password";
import ResetPassword from "../pages/auth/reset_password";
import SignIn from "../pages/auth/sign_in";
import { StoreContext } from "../store";
import { observer } from "mobx-react";
import DocumentDetail from "../pages/documents/document_detail";
import NewDocument from "../pages/documents/new_document";
import MobileSignature from "../pages/signatures/mobile_signature";
// endregion

// region Router
// export default function Router() {
const Router = observer(() => {
    // region hooks
    const store = useContext(StoreContext);
    // const institutionGroup = useRecoilValue(store1.institutionGroup)
    // endregion

    const { notifications, dismissNotification } = useNotifications();
    setUpNotifications({
        defaultProps: {
            position: "top-right",
            dismissible: true,
            dismissAfter: 5000,
            closeButton: true,
        },
    });

    // region functions
    const router = createHashRouter([
        {
            path: "/",
            element: !!store.authStore.token ? (
                <MainLayout header="" />
            ) : (
                <Navigate
                    to={`/sign-in/${store.institutionStore?.institution.username}`}
                />
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/documents/:id",
                    element: <DocumentDetail />,
                },
                {
                    path: "/new-document",
                    element: <NewDocument />,
                },
                // {
                //     path: "/libraries",
                //     element: <Libraries />
                // },
                {
                    path: "/profile",
                    element: <Profile />,
                },
                {
                    path: "/language-settings",
                    element: <LanguageSettings />,
                },
            ],
        },
        {
            path: "/mob-sign",
            element: <MobileSignature />,
        },
        {
            path: "/sign-in",
            element: !store.authStore.token ? <SignIn /> : <Navigate to="/" />,
        },
        {
            path: "/recovery-password",
            element: !store.authStore.token ? (
                <RecoveryPassword />
            ) : (
                <Navigate to="/" />
            ),
        },
        {
            path: "/reset-password",
            element: !store.authStore.token ? (
                <ResetPassword />
            ) : (
                <Navigate to="/" />
            ),
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);
    // endregion

    // region render
    return (
        <>
            <RouterProvider router={router} />
            <NotificationsSystem
                // 2. Pass the notifications you want Reapop to display.
                notifications={notifications}
                // 3. Pass the function used to dismiss a notification.
                dismissNotification={(id) => dismissNotification(id)}
                // 4. Pass a builtIn theme or a custom theme.
                theme={atalhoTheme}
            />
        </>
    );
    // endregion
});
// endregion

export default Router;
