import DashboardContent from "@/components/dashboard/DashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng điều khiển | Probase Admin",
  description: "Tổng quan hệ thống Probase",
};

export default function Dashboard() {
  return <DashboardContent />;
}
