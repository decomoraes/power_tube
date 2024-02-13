// region imports
import { signIn } from "../../api/sign_in";
import Store from "../../store";
import { useState } from "react";
// endregion

export interface SignInViewModel {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    pathname: string | undefined;
    setPathname: (pathname: string | undefined) => void;
    searchParams: URLSearchParams;
    setSearchParams: (searchParams: URLSearchParams) => void;
    signInAs: "channel" | "professional" | null;
    setSignInAs: (value: "channel" | "professional" | null) => void;
    store: Store;
    setStore: (store: Store) => void;
    notification: (
        notification: string,
        status: "error" | "success" | "info" | "warning"
    ) => any;
    setNotification: (
        notification: (
            notification: string,
            status: "error" | "success" | "info" | "warning"
        ) => any
    ) => void;
    onInitialized: (
        store: Store,
        pathname: string | undefined,
        searchParams: URLSearchParams
    ) => void;
    onSignIn: () => Promise<void>;
    submitButtonDisabled: () => boolean;
}

// region SignInViewModel
const useSignInViewModel = (): SignInViewModel => {
    // region properties
    const [email, setEmail] = useState<string>("");
    const [signInAs, setSignInAs] = useState<"channel" | "professional" | null>(
        null
    );
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [pathname, setPathname] = useState<string | undefined>(undefined);
    const [searchParams, setSearchParams] = useState<URLSearchParams>(
        new URLSearchParams()
    );
    const [store, setStore] = useState<Store>(new Store());
    const [notification, setNotification] = useState<
        (
            notification: string,
            status: "error" | "success" | "info" | "warning"
        ) => any
    >(() => {});
    // endregion

    // region onInitialized
    function onInitialized(
        pStore: Store,
        pPathname: string | undefined,
        pSearchParams: URLSearchParams
    ) {
        setStore(pStore);
        setPathname(pathname);
        setSearchParams(searchParams);
    }
    // endregion

    // region signIn
    async function onSignIn() {
        const response = await signIn(email ?? "", password ?? "");
        if (response.status >= 300 || response.payload === undefined) {
            return notification(response.message ?? "error", "error");
        }

        store.userStore.user = response.payload;
        store.authStore.token = response.message;
    }
    // endregion

    // region validate email and password
    function submitButtonDisabled(): boolean {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return !(regex.test(email) && email.length > 0 && password.length >= 8);
    }
    // endregion

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        setLoading,
        pathname,
        setPathname,
        searchParams,
        signInAs,
        setSearchParams,
        setSignInAs,
        store,
        setStore,
        notification,
        setNotification,
        onInitialized,
        onSignIn,
        submitButtonDisabled,
    };
};
// endregion

export default useSignInViewModel;
