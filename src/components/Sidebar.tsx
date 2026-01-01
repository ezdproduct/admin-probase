"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
    LayoutDashboard,
    Table,
    LogOut,
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    Building2,
    Car,
    Fuel
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";

type MenuItem =
    | { type: "header"; label: string; href?: never; icon?: never; name?: never }
    | { type?: never; name: string; href: string; icon: any; label?: never };

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
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
        { type: "header", label: "Bảng điều khiển" },
        { name: "Tổng quan", href: "/", icon: LayoutDashboard },

        { type: "header", label: "Bảng dữ liệu" },
        { name: "Đại lý", href: "/agencies", icon: Building2 },
        { name: "Xe", href: "/apps", icon: Car },
        { name: "Xăng", href: "/models", icon: Fuel },

        { type: "header", label: "Quản lý xe" },
        ...apps.map(app => ({
            name: app.name,
            href: `/users?app=${app.app_slug}`,
            icon: Table
        })),

        { type: "header", label: "Hệ thống" },
        { name: "Quản trị viên", href: "/admins", icon: ShieldCheck },
    ];

    return (
        <aside
            className={cn(
                "bg-slate-50 border-r border-slate-200 flex flex-col h-screen sticky top-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-40 group/sidebar",
                collapsed ? "w-14" : "w-44"
            )}
        >
            {/* Header / Logo */}
            <div className={cn(
                "h-20 flex items-center transition-all duration-500",
                collapsed ? "justify-center px-0" : "px-6 gap-3"
            )}>
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 ring-4 ring-indigo-50">
                    P
                </div>
                {!collapsed && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-500">
                        <h1 className="font-bold text-indigo-900 tracking-tight whitespace-nowrap leading-none text-base">
                            Probase
                        </h1>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Admin Panel</span>
                    </div>
                )}
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? "Mở rộng" : "Thu gọn"}
                className={cn(
                    "absolute -right-3.5 top-8 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-none transition-all z-50",
                    collapsed ? "rotate-0" : "rotate-0"
                )}
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation Content */}
            <div className={cn(
                "flex-1 pb-8 no-scrollbar transition-all",
                collapsed ? "overflow-visible px-1.5" : "overflow-y-auto px-2"
            )}>
                <nav className="space-y-1.5">
                    {menuItems.map((item, index) => {
                        if (item.type === "header") {
                            return !collapsed ? (
                                <div key={index} className="px-4 pt-6 pb-2">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] animate-in fade-in duration-700">
                                        {item.label}
                                    </p>
                                </div>
                            ) : (
                                <div key={index} className="h-px bg-slate-200/60 my-6 mx-4" />
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

                        if (item.name === "Overview" && pathname === "/") isActive = true;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-none"
                                        : "text-slate-500 hover:text-indigo-600 hover:bg-white"
                                )}
                            >
                                {/* Tooltip for Collapsed State */}
                                {collapsed && (
                                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-indigo-900 text-white text-[11px] font-bold rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 whitespace-nowrap z-[100] ring-1 ring-white/10 uppercase tracking-wider">
                                        {item.name}
                                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-indigo-900" />
                                    </div>
                                )}
                                <div className={cn(
                                    "flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110",
                                    collapsed ? "w-full" : ""
                                )}>
                                    <item.icon
                                        size={20}
                                        className={cn(
                                            "transition-colors duration-300",
                                            isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                                        )}
                                    />
                                </div>
                                {!collapsed && (
                                    <span className="font-semibold text-[13px] whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-left-2 duration-500">
                                        {item.name}
                                    </span>
                                )}
                                {isActive && !collapsed && (
                                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer / Logout */}
            <div className={cn(
                "mt-auto border-t border-slate-200/60 flex flex-col gap-2 transition-all",
                collapsed ? "items-center p-1.5" : "p-2"
            )}>
                <button
                    onClick={() => signOut()}
                    className={cn(
                        "flex items-center gap-3.5 w-full px-3 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold group relative",
                        collapsed ? "justify-center" : ""
                    )}
                >
                    {collapsed && (
                        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-rose-600 text-white text-[11px] font-bold rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 whitespace-nowrap z-[100] shadow-none uppercase tracking-wider">
                            Đăng xuất
                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-rose-600" />
                        </div>
                    )}
                    <LogOut size={20} className="text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    {!collapsed && (
                        <span className="text-[13px] animate-in fade-in slide-in-from-left-2 duration-500">
                            Đăng xuất
                        </span>
                    )}
                </button>
            </div>
        </aside>
    );
}
