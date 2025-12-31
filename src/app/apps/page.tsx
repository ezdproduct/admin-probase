"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, AppWindow, Settings2, Trash2, Pencil, Save, MoreHorizontal, ShieldOff, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Sheet from "@/components/Sheet";

interface Application {
    id: number;
    name: string;
    app_slug: string;
    is_active: boolean;
}

export default function AppsPage() {
    const [apps, setApps] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        app_slug: "",
        is_active: true
    });

    useEffect(() => {
        fetchApps();
    }, []);

    async function fetchApps() {
        setLoading(true);
        const { data } = await supabase.from("apps").select("*").order("name");
        if (data) setApps(data);
        setLoading(false);
    }

    const openAdd = () => {
        setFormData({ name: "", app_slug: "", is_active: true });
        setIsAddOpen(true);
    };

    const openEdit = (app: Application) => {
        setSelectedApp(app);
        setFormData({ name: app.name, app_slug: app.app_slug, is_active: app.is_active });
        setIsEditOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (isEditOpen && selectedApp) {
                const { error } = await supabase
                    .from("apps")
                    .update(formData)
                    .eq("id", selectedApp.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("apps")
                    .insert([formData]);
                if (error) throw error;
            }
            await fetchApps();
            setIsAddOpen(false);
            setIsEditOpen(false);
        } catch (error: any) {
            alert("Lỗi: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn gỡ bỏ ứng dụng này?")) return;
        const { error } = await supabase.from("apps").delete().eq("id", id);
        if (error) {
            alert("Lỗi: " + error.message);
        } else {
            fetchApps();
        }
    };

    const AppForm = ({ data, setData }: { data: typeof formData, setData: (d: typeof formData) => void }) => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên ứng dụng</label>
                    <Input
                        placeholder="AI Studio Pro"
                        className="h-10 border-slate-200"
                        value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Định danh (Slug)</label>
                    <Input
                        placeholder="ai-studio-pro"
                        className="h-10 border-slate-200"
                        disabled={isEditOpen}
                        value={data.app_slug}
                        onChange={e => setData({ ...data, app_slug: e.target.value })}
                    />
                </div>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="space-y-0.5">
                        <label className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Trạng thái hoạt động</label>
                        <p className="text-[10px] text-slate-400">Cho phép người dùng truy cập ứng dụng.</p>
                    </div>
                    <Switch
                        checked={data.is_active}
                        onCheckedChange={(checked: boolean) => setData({ ...data, is_active: checked })}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Quản lý Ứng dụng
                    </h1>
                    <p className="text-sm text-slate-500">
                        Đăng ký và quản lý các ứng dụng con trong hệ sinh thái Probase.
                    </p>
                </div>
                <Button size="sm" className="bg-slate-900 gap-2 h-9 px-4 font-semibold shadow-sm" onClick={openAdd}>
                    <Plus size={16} /> Đăng ký App mới
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-44 bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />)
                ) : apps.map((app) => (
                    <Card
                        key={app.id}
                        className="group hover:border-slate-900 transition-all border-slate-200 shadow-sm hover:shadow-lg bg-white overflow-hidden cursor-default"
                        onDoubleClick={() => openEdit(app)}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                                    <AppWindow size={24} />
                                </div>
                                <Badge variant={app.is_active ? "outline" : "secondary"} className={app.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-inset ring-emerald-600/20" : "bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-600/20"}>
                                    {app.is_active ? "Hoạt động" : "Tạm dừng"}
                                </Badge>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-900 leading-none group-hover:text-slate-950 transition-colors uppercase tracking-tight">{app.name}</h3>
                                <p className="text-[10px] text-slate-400 font-mono tracking-wider font-medium">data_{app.app_slug.replace(/-/g, '_')}</p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                                <Button variant="ghost" size="sm" className="h-9 px-3 text-xs gap-2 hover:bg-slate-50 font-bold text-slate-600 transition-colors" onClick={() => openEdit(app)}>
                                    <Settings2 size={14} className="text-slate-400" /> Cấu hình
                                </Button>
                                <Button variant="ghost" size="sm" className="h-9 px-3 text-xs gap-2 text-rose-500 hover:bg-rose-50 font-bold transition-colors" onClick={() => handleDelete(app.id)}>
                                    <Trash2 size={14} /> Gỡ bỏ
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <button
                    onClick={openAdd}
                    className="flex flex-col items-center justify-center h-full min-h-[176px] rounded-2xl border-2 border-dashed border-slate-100 text-slate-300 hover:text-slate-400 hover:border-slate-200 hover:bg-slate-50/50 transition-all gap-2"
                >
                    <Plus size={32} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Đăng ký mới</span>
                </button>
            </div>

            <Sheet
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                title="Đăng ký App"
                description="Nhập thông tin để tích hợp ứng dụng mới vào hệ sinh thái Probase."
                footer={
                    <Button
                        className="w-full bg-slate-900 h-12 font-bold shadow-xl shadow-slate-200"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Đang xử lý..." : "Hoàn tất đăng ký"}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Thông tin App</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Tích hợp</button>
                </div>
                <AppForm data={formData} setData={setFormData} />
            </Sheet>

            <Sheet
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Cấu hình Ứng dụng"
                description="Chỉnh sửa thông tin và trạng thái hoạt động của ứng dụng."
                footer={
                    <Button
                        className="w-full bg-slate-900 h-12 font-bold shadow-xl shadow-slate-200"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Đang cập nhật..." : "Lưu thay đổi"}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Cấu hình chính</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Dữ liệu</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Bảo mật</button>
                </div>
                <AppForm data={formData} setData={setFormData} />
            </Sheet>
        </div>
    );
}
