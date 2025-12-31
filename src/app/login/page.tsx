"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Đã xảy ra lỗi khi đăng nhập");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
            {/* Minimalist background pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="w-full max-w-[400px] px-6 relative z-10">
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6 shadow-xl shadow-slate-200">
                        P
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Probase Console</h1>
                    <p className="text-slate-400 text-sm mt-1 font-medium">Đăng nhập để vào bảng điều khiển hệ thống</p>
                </div>

                <div className="bg-white border border-slate-200/60 p-8 rounded-3xl shadow-2xl shadow-slate-200/50">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={16} />
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                    placeholder="admin@probase.vn"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase italic underline decoration-slate-200">Quên?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={16} />
                                <Input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-rose-500 text-[11px] font-semibold bg-rose-50 border border-rose-100 p-3 rounded-lg animate-in fade-in zoom-in duration-200">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Tiếp tục</span>
                                    <ArrowRight size={16} />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                        <p className="text-[11px] text-slate-400 font-medium">
                            Chưa có tài khoản? <a href="#" className="text-slate-900 font-bold hover:underline">Liên hệ quản trị</a>
                        </p>
                    </div>
                </div>

                <p className="mt-12 text-center text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">
                    &copy; 2024 Probase Ecosystem
                </p>
            </div>
        </div>
    );
}
