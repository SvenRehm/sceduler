import Counter from "~/components/Counter";
import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from '../supabaseClient.js'
import { AuthSession } from '@supabase/supabase-js'
import Account from '~/components/Account.jsx'
import Auth from '~/components/Auth.jsx'

export default function Home() {
  const [session, setSession] = createSignal(null)

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
    <div class="container" style={{ padding: '50px 0 100px 0' }}>
      {!session() ? <Auth /> : <Account session={session()} />}
    </div>
  )
}

// export default function Home() {
//     return (
//         <main class="text-center mx-auto text-gray-700 p-4">
//                 <Counter />
//         </main>
//     ); }
