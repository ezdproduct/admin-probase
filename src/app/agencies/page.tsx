"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Search, Building2, Save, MoreHorizontal } from "lucide-react";

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

interface Agency {
    id: string;
    name: string;
    markup_economy: number;
    markup_standard: number;
    markup_advanced: number;
    markup_pro: number;
    total_users_count: number;
    total_income_vnd: number;
}

export default function AgenciesPage() {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
    const [formData, setFormData] = useState<Partial<Agency>>({});

    useEffect(() => {
        fetchAgencies();
    }, []);

    async function fetchAgencies() {
        setLoading(true);
        const { data } = await supabase
            .from("agencies")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setAgencies(data);
        setLoading(false);
    }

    const filteredAgencies = agencies.filter(a =>
        a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openEdit = (agency: Agency) => {
        setSelectedAgency(agency);
        setFormData({ ...agency });
        setIsEditOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (isEditOpen && selectedAgency) {
                const { error } = await supabase
                    .from("agencies")
                    .update(formData)
                    .eq("id", selectedAgency.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("agencies")
                    .insert([formData]);
                if (error) throw error;
            }
            await fetchAgencies();
            setIsAddOpen(false);
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error saving agency:", error);
            alert("Lỗi khi lưu đại lý");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Xác nhận xóa đại lý này?")) return;
        const { error } = await supabase.from("agencies").delete().eq("id", id);
        if (error) {
            alert("Lỗi: " + error.message);
        } else {
            fetchAgencies();
        }
    };

    const AgencyForm = ({ data, setData }: { data: Partial<Agency>, setData: (d: Partial<Agency>) => void }) => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên đại lý</label>
                    <Input
                        placeholder="Probase Agency VN"
                        className="h-10 border-slate-200"
                        value={data.name || ""}
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </div>
                {!isEditOpen && (
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã định danh (ID)</label>
                        <Input
                            placeholder="probase-vn"
                            className="h-10 border-slate-200"
                            value={data.id || ""}
                            onChange={e => setData({ ...data, id: e.target.value })}
                        />
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                    <div className="space-y-1.5 col-span-2">
                        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Chiết khấu (%)</h4>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Economy</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.markup_economy || 0} onChange={e => setData({ ...data, markup_economy: parseFloat(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.markup_standard || 0} onChange={e => setData({ ...data, markup_standard: parseFloat(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advanced</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.markup_advanced || 0} onChange={e => setData({ ...data, markup_advanced: parseFloat(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pro</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.markup_pro || 0} onChange={e => setData({ ...data, markup_pro: parseFloat(e.target.value) })} />
                    </div>
                </div>
            </div>
        </div>
    );

    const [saving, setSaving] = useState(false);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Quản lý Đại lý
                    </h1>
                    <p className="text-sm text-slate-500">
                        Cấu hình chiết khấu và theo dõi doanh thu từ các đối tác.
                    </p>
                </div>
                <Button className="bg-slate-900 gap-2 shadow-sm" onClick={() => {
                    setFormData({ markup_economy: 0, markup_standard: 0, markup_advanced: 0, markup_pro: 0 });
                    setIsAddOpen(true);
                }}>
                    <Plus size={16} /> Thêm đại lý
                </Button>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <Input
                            placeholder="Tìm đại lý..."
                            className="pl-9 h-9 border-slate-200 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Đại lý</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Chiết khấu (E/S/A/P)</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">User</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Doanh thu (VNĐ)</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600 text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-400">Đang tải...</TableCell></TableRow>
                            ) : filteredAgencies.length === 0 ? (
                                <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-400 italic">Không có dữ liệu</TableCell></TableRow>
                            ) : filteredAgencies.map((agency) => (
                                <TableRow
                                    key={agency.id}
                                    className="group hover:bg-slate-50 transition-all cursor-default border-l-2 border-l-transparent hover:border-l-slate-900 hover:shadow-sm"
                                    onDoubleClick={() => openEdit(agency)}
                                >
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:scale-110 transition-transform">
                                                <Building2 size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900">{agency.name}</span>
                                                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{agency.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex gap-1">
                                            {[agency.markup_economy, agency.markup_standard, agency.markup_advanced, agency.markup_pro].map((m, i) => (
                                                <Badge key={i} variant="outline" className="text-[9px] font-bold px-1.5 py-0 rounded-md border-slate-100 bg-slate-50 text-slate-600">
                                                    {m}%
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm font-medium text-slate-600">
                                        {agency.total_users_count || 0}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 font-bold text-slate-900">
                                        {(agency.total_income_vnd || 0).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEdit(agency)}>
                                                <Pencil size={14} className="text-slate-400" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-rose-500 hover:bg-rose-50" onClick={() => handleDelete(agency.id)}>
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
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                title="Khởi tạo Đại lý"
                description="Thiết lập thông tin cơ bản và quyền lợi chiết khấu cho đối tác mới."
                footer={
                    <Button
                        className="w-full bg-slate-900 h-12 font-bold shadow-xl shadow-slate-200"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Đang xử lý..." : "Xác nhận tạo đại lý"}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Thông tin đại lý</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Cấu hình nâng cao</button>
                </div>
                <AgencyForm data={formData} setData={setFormData} />
            </Sheet>

            <Sheet
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Cập nhật Đại lý"
                description="Chỉnh sửa tên và cấu hình chiết khấu cho đại lý."
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
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Thông tin đại lý</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Dữ liệu doanh thu</button>
                </div>
                <AgencyForm data={formData} setData={setFormData} />
            </Sheet>
        </div>
    );
}
