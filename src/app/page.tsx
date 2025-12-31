"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/components/PageHeader";
import {
  Users,
  Building2,
  AppWindow,
  TrendingUp,
  ArrowUpRight,
  Zap,
  Activity
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const [stats, setStats] = useState({
    agencies: 0,
    apps: 0,
    users: 0,
  });
  const [topAgencies, setTopAgencies] = useState<{ name: string; users: number; income: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      // Parallelize queries for better performance
      const [
        { count: agencyCount, data: agenciesData },
        { count: appCount }
      ] = await Promise.all([
        supabase
          .from("agencies")
          .select("id, name, total_users_count, total_income_vnd", { count: "exact" }),
        supabase
          .from("apps")
          .select("*", { count: "exact", head: true })
      ]);

      let totalUsers = 0;
      const topAgenciesList = agenciesData
        ? agenciesData
          .map(a => ({
            name: a.name,
            users: a.total_users_count || 0,
            income: a.total_income_vnd || 0
          }))
          .sort((a, b) => b.income - a.income)
          .slice(0, 5)
        : [];

      agenciesData?.forEach(a => {
        totalUsers += a.total_users_count || 0;
      });

      setStats({
        agencies: agencyCount || 0,
        apps: appCount || 0,
        users: totalUsers
      });

      setTopAgencies(topAgenciesList);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    { name: "Tổng đại lý", value: stats.agencies, icon: Building2, trend: "+2.5%" },
    { name: "Ứng dụng đối tác", value: stats.apps, icon: AppWindow, trend: "+0%" },
    { name: "Người dùng hệ thống", value: stats.users, icon: Users, trend: "+12.1%" },
    { name: "API Request/ngày", value: "24.5k", icon: Activity, trend: "+4.3%" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-sm text-slate-500">Báo cáo hiệu suất và dữ liệu hợp nhất từ Probase Ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                <card.icon size={20} className="text-slate-600" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                {card.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{card.name}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {loading ? <div className="h-8 w-16 bg-slate-100 animate-pulse rounded" /> : card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
              <TrendingUp className="text-slate-400" size={16} />
              Biểu đồ doanh thu (VNĐ)
            </h3>
            <select className="bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-600 outline-none focus:border-slate-400 font-medium">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="p-12 flex flex-col items-center justify-center min-h-[300px] text-slate-300">
            <Activity size={48} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="text-sm font-medium italic opacity-50">Đang chuẩn bị dữ liệu trực quan...</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm text-sm">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Đại lý hàng đầu</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-10 bg-slate-50 animate-pulse rounded-lg" />)}
              </div>
            ) : topAgencies.length === 0 ? (
              <div className="p-10 text-center text-slate-400 italic">Chưa có dữ liệu</div>
            ) : topAgencies.map((agency) => (
              <div key={agency.name} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors">
                <div>
                  <p className="font-medium text-slate-900">{agency.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{agency.users} người dùng</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{formatCurrency(agency.income)}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Doanh thu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
