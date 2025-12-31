"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
    LayoutDashboard,
    Database,
    Table,
    Settings,
    FileText,
    Search,
    Home,
    LogOut,
    ShieldCheck,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";

type MenuItem =
    | { type: "header"; label: string; href?: never; icon?: never; name?: never }
    | { type?: never; name: string; href: string; icon: any; label?: never };

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { signOut } = useAuth();
    const [apps, setApps] = useState<any[]>([]);

    useEffect(() => {
        async function fetchApps() {
            const { data } = await supabase.from("apps").select("*").order("name");
            if (data) setApps(data);
        }
        fetchApps();
    }, []);

    const menuItems: MenuItem[] = [
        { type: "header", label: "Dashboard" },
        { name: "Overview", href: "/", icon: LayoutDashboard },

        { type: "header", label: "Core Tables" },
        { name: "Agencies", href: "/agencies", icon: Table },
        { name: "Apps", href: "/apps", icon: Table },
        { name: "Model Providers", href: "/models", icon: Table },

        { type: "header", label: "App Databases" },
        ...apps.map(app => ({
            name: app.name,
            href: `/users?app=${app.app_slug}`,
            icon: Table
        })),

        { type: "header", label: "System" },
        { name: "Admins", href: "/admins", icon: ShieldCheck },
    ];

    return (
        <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-y-auto custom-scrollbar text-sm font-sans">
            <div className="p-6 flex items-center gap-3">
                <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white font-bold text-sm">
                    P
                </div>
                <h1 className="font-semibold text-slate-900 tracking-tight">
                    Probase Admin
                </h1>
            </div>

            <div className="flex-1 px-4 pb-4">
                <nav className="space-y-0.5">
                    {menuItems.map((item, index) => {
                        if (item.type === "header") {
                            return (
                                <div key={index} className="px-3 pt-6 pb-2">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
                                </div>
                            );
                        }

                        const targetPath = item.href.split('?')[0];
                        const targetQuery = item.href.split('?')[1];

                        let isActive = false;
                        if (targetQuery) {
                            isActive = pathname === targetPath && searchParams.get('app') === new URLSearchParams(targetQuery).get('app');
                        } else {
                            isActive = pathname === targetPath;
                        }

                        // Special case for dashboard
                        if (item.name === "Overview" && pathname === "/") isActive = true;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2 rounded-lg transition-all group",
                                    isActive
                                        ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                                )}
                            >
                                <div className="flex items-center gap-2.5">
                                    <item.icon size={16} className={cn("", isActive ? "text-slate-950" : "text-slate-400 group-hover:text-slate-600")} />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                {isActive && <ChevronRight size={14} className="text-slate-400" />}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-slate-200 flex flex-col gap-2">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-medium group"
                >
                    <LogOut size={16} className="text-slate-400 group-hover:text-rose-500" />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
}
