import { Component, createEffect, createSignal } from "solid-js";
import { supabase } from "../supabaseClient.js";
import Account from "~/components/Account.jsx";
import Auth from "~/components/Auth.jsx";
import Table from "~/components/table.jsx";
export default function Home() {
    const [session, setSession] = createSignal(null);

    createEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    });

    // {!session() ? <Auth /> : <Account session={session()} />}
    return (
        <div class="container" style={{ padding: "50px 0 100px 0" }}>
            <Table />
        </div>
    );
}
