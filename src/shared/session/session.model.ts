import { atom } from "jotai";
import { Session } from "./session.types";
import { Nullable } from "../lib/types";
import { store } from "@/app/providers/StoreProvider";

export const sessionAtom = atom<Nullable<Session>>(null)

export const useSession =() => {
    return {
        getSession: () => store.get(sessionAtom),
        setSession: (session: Nullable<Session>) => store.set(sessionAtom, session),
    }

}