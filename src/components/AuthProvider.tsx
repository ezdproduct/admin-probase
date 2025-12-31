"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);

            if (!session?.user && pathname !== "/login") {
                router.push("/login");
            }
        };

        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                setLoading(false);

                if (event === "SIGNED_IN") {
                    router.push("/");
                }
                if (event === "SIGNED_OUT") {
                    router.push("/login");
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router, pathname]);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-white text-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-slate-100 border-t-slate-900 rounded-full animate-spin" />
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">Khởi tạo hệ thống...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
