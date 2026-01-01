"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function SidebarWrapper() {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    const [collapsed, setCollapsed] = useState(false);

    if (isLoginPage) return null;

    return (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
}
