import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

export const authService = {
  signUp: async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
        },
      },
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getSession: async (): Promise<{ session: Session | null; user: User | null }> => {
    const { data } = await supabase.auth.getSession();
    return { session: data.session, user: data.session?.user ?? null };
  },
};
