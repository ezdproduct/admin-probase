import AgenciesContent from "@/components/agencies/AgenciesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lý Đại lý",
    description: "Cấu hình chiết khấu và theo dõi doanh thu đại lý",
};

export default function AgenciesPage() {
    return <AgenciesContent />;
}
