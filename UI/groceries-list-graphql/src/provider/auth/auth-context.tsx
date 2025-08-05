import type { User, UserData } from "@/http/auth";
import { createContext } from "react";

export const AuthContext = createContext<{
    user: User | null,
    setSessionUser: (userData: UserData) => void,
    removeSessionUser: () => void
}>({
    user: null,
    setSessionUser: () => {},
    removeSessionUser: () => {}
})