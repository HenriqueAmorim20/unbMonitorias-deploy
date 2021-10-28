import { User, Session } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

type AuthContextType = {
  user?: User;
  session?: Session;
  usuario?: usuario;
 }

 interface usuario {
   id: string
   isAluno: boolean
   nome: string
   idAuth: string
   matricula?: string
 }

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props) {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();
  const [usuario, setUsuario] = useState<usuario>();

  useEffect(() => {
    const currentSession = supabase.auth.session();

    if (currentSession) {
      setSession(currentSession)
      setUser(currentSession.user)
    }

    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user);

      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ event, session: newSession })
      })
    })

    if (user) {
      supabase
            .from('usuario')
            .select('*')
            .filter('idAuth', 'eq', `${user.id}`)
            .then(response => {
                setUsuario(response.body[0])
            })
    }

    return () => {
      data.unsubscribe();
    }
  }, [user, usuario]);

  return (
    <AuthContext.Provider value={{ user, usuario, session }}>
      {props.children}
    </AuthContext.Provider>
  )
}