"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Shield,
    Upload,
    Mail,
    User as UserIcon,
    ShieldCheck,
    MoreVertical
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Sheet from "@/components/Sheet";
import { cn } from "@/lib/utils";

interface Profile {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
    role: string;
    created_at: string;
}

export default function AdminsPage() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [formData, setFormData] = useState<Partial<Profile>>({});

    useEffect(() => {
        fetchProfiles();
    }, []);

    async function fetchProfiles() {
        setLoading(true);
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setProfiles(data);
        }
        setLoading(false);
    }

    const filteredProfiles = profiles.filter(p =>
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openEdit = (profile: Profile) => {
        setSelectedProfile(profile);
        setFormData({ ...profile });
        setIsEditOpen(true);
    };

    const handleSave = async () => {
        if (!selectedProfile) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: formData.full_name,
                    role: formData.role,
                    avatar_url: formData.avatar_url
                })
                .eq("id", selectedProfile.id);

            if (error) throw error;
            await fetchProfiles();
            setIsEditOpen(false);
        } catch (error: any) {
            alert("Lỗi: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Xác nhận gỡ quyền admin của thành viên này?")) return;
        // In a real app, you might want to soft-delete or change role
        // For now, let's assume we delete from profiles
        const { error } = await supabase.from("profiles").delete().eq("id", id);
        if (error) {
            alert("Lỗi: " + error.message);
        } else {
            fetchProfiles();
        }
    };

    const AdminForm = ({ data, setData }: { data: Partial<Profile>, setData: (d: Partial<Profile>) => void }) => (
        <div className="space-y-8">
            <div className="flex justify-center">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center group-hover:border-slate-200 transition-all">
                        {data.avatar_url ? (
                            <img src={data.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon size={40} className="text-slate-200" />
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Họ và tên</label>
                        <Input
                            className="h-10 border-slate-200"
                            value={data.full_name || ""}
                            onChange={e => setData({ ...data, full_name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5 grayscale opacity-60 cursor-not-allowed">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email tài khoản</label>
                        <Input className="h-10 border-slate-200 bg-slate-50" value={data.email || ""} disabled />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phân quyền hệ thống</label>
                        <div className="grid grid-cols-1 gap-2">
                            {['admin', 'editor', 'viewer'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setData({ ...data, role })}
                                    className={cn(
                                        "flex flex-col items-start p-3 rounded-xl border transition-all text-left",
                                        data.role === role
                                            ? "border-slate-900 bg-slate-900 text-white shadow-md"
                                            : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                                    )}
                                >
                                    <span className="text-xs font-bold uppercase tracking-wide">{role === 'admin' ? 'Administrator' : role === 'editor' ? 'Editor' : 'Viewer'}</span>
                                    <span className={cn(
                                        "text-[10px]",
                                        data.role === role ? "text-slate-300" : "text-slate-400"
                                    )}>
                                        {role === 'admin' ? 'Toàn quyền điều hành hệ thống' : role === 'editor' ? 'Cho phép thay đổi dữ liệu cơ bản' : 'Chỉ được phép xem báo cáo'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Đội ngũ Quản trị
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Cấu hình quyền truy cập và phân vai trò cho đội ngũ vận hành.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" className="gap-2 bg-slate-900 h-9 px-4 font-semibold shadow-sm">
                        <Plus size={14} /> Mời thành viên
                    </Button>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input
                                placeholder="Tìm theo tên hoặc email..."
                                className="pl-9 h-9 border-slate-200 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            {filteredProfiles.length} tài khoản đang hoạt động
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Thành viên</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Phân quyền</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Ngày gia nhập</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600 text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center text-slate-400">
                                        Đang tải dữ liệu...
                                    </TableCell>
                                </TableRow>
                            ) : filteredProfiles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center text-slate-400 italic">
                                        Không tìm thấy dữ liệu phù hợp
                                    </TableCell>
                                </TableRow>
                            ) : filteredProfiles.map((profile) => (
                                <TableRow
                                    key={profile.id}
                                    className="group hover:bg-slate-50 transition-all cursor-default border-l-2 border-l-transparent hover:border-l-slate-900 hover:shadow-sm"
                                    onDoubleClick={() => openEdit(profile)}
                                >
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                                                {profile.avatar_url ? (
                                                    <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-slate-400 font-bold text-xs">
                                                        {(profile.full_name || profile.email)?.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 group-hover:text-slate-950">{profile.full_name || "N/A"}</span>
                                                <span className="text-xs text-slate-400 font-medium">{profile.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge variant="outline" className={cn(
                                            "capitalize px-2 py-0.5 rounded-md text-[9px] font-bold border-none ring-1 ring-inset",
                                            profile.role === 'admin'
                                                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                                                : profile.role === 'editor'
                                                    ? "bg-blue-50 text-blue-700 ring-blue-600/20"
                                                    : "bg-slate-50 text-slate-600 ring-slate-600/20"
                                        )}>
                                            {profile.role || 'viewer'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-xs text-slate-500 font-medium">
                                        {new Date(profile.created_at).toLocaleDateString('vi-VN')}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 transition-colors" onClick={() => openEdit(profile)}>
                                                <Pencil size={14} className="text-slate-400" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors" onClick={() => handleDelete(profile.id)}>
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Sheet
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Cập nhật thành viên"
                description="Điều chỉnh quyền hạn và thông tin hồ sơ nhân sự."
                footer={
                    <Button
                        className="w-full bg-slate-900 h-12 font-bold shadow-xl shadow-slate-200"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Đang xử lý..." : "Lưu thay đổi"}
                    </Button>
                }
            >
                {/* Tabs Header look */}
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Thông tin chính</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Bảo mật</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Nhật ký</button>
                </div>

                <AdminForm data={formData} setData={setFormData} />
            </Sheet>
        </div>
    );
}
