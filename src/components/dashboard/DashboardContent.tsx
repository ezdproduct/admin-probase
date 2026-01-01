"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Users,
  Building2,
  AppWindow,
  TrendingUp,
  Activity
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function DashboardContent() {
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
    <div className="max-w-7xl mx-auto space-y-8 py-4">
      {/* Page Title Removed as per user request */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white border-none ring-1 ring-slate-200 rounded-2xl p-6 shadow-none hover:ring-indigo-100 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100">
                <card.icon size={20} className="text-indigo-600" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                {card.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.name}</p>
              <h3 className="text-2xl font-black text-indigo-900 mt-1">
                {loading ? <div className="h-8 w-16 bg-slate-50 animate-pulse rounded" /> : (typeof card.value === 'number' ? card.value.toLocaleString('en-US') : card.value)}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border-none ring-1 ring-slate-200 rounded-3xl overflow-hidden shadow-none">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h3 className="font-bold text-indigo-900 flex items-center gap-2 text-[11px] uppercase tracking-widest">
              <TrendingUp className="text-indigo-600" size={14} />
              Biểu đồ doanh thu (VNĐ)
            </h3>
            <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[10px] text-slate-500 outline-none focus:border-indigo-400 font-bold uppercase tracking-wider transition-all">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="p-12 flex flex-col items-center justify-center min-h-[300px] text-slate-200">
            <Activity size={48} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="text-[10px] font-bold uppercase tracking-widest italic opacity-50">Đang chuẩn bị dữ liệu trực quan...</p>
          </div>
        </div>

        <div className="bg-white border-none ring-1 ring-slate-200 rounded-3xl overflow-hidden shadow-none text-sm">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30">
            <h3 className="font-bold text-indigo-900 text-[11px] uppercase tracking-widest">Đại lý hàng đầu</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-10 bg-slate-50 animate-pulse rounded-xl" />)}
              </div>
            ) : topAgencies.length === 0 ? (
              <div className="p-10 text-center text-slate-300 italic text-[10px] font-bold uppercase tracking-widest">Chưa có dữ liệu</div>
            ) : topAgencies.map((agency) => (
              <div key={agency.name} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors">
                <div>
                  <p className="font-bold text-indigo-900">{agency.name}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{agency.users} người dùng</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-indigo-900">{formatCurrency(agency.income)}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Doanh thu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
