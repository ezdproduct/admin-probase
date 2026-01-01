"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Building2, AlertCircle, ChevronDown, Filter } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agencySchema, AgencyFormData } from "@/lib/schema";

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

interface Agency extends AgencyFormData {
    id: string;
    total_users_count?: number;
    total_income_vnd?: number;
}

export default function AgenciesContent() {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
    const [saving, setSaving] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);

    // Form definition
    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<AgencyFormData>({
        resolver: zodResolver(agencySchema),
        defaultValues: {
            name: "",
            id: "",
            markup_economy: 0,
            markup_standard: 0,
            markup_advanced: 0,
            markup_pro: 0,
        }
    });

    useEffect(() => {
        fetchAgencies();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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

    const filteredAgencies = agencies.filter(a => {
        if (filterType === "all") return true;
        if (filterType === "active") return (a.total_users_count || 0) > 0;
        if (filterType === "has_revenue") return (a.total_income_vnd || 0) > 0;
        if (filterType === "newest") {
            // Just show newest 5 as an example if this filter is picked
            return agencies.indexOf(a) < 5;
        }
        return true;
    });

    const openEdit = (agency: Agency) => {
        setSelectedAgency(agency);
        reset({
            name: agency.name,
            id: agency.id,
            markup_economy: agency.markup_economy,
            markup_standard: agency.markup_standard,
            markup_advanced: agency.markup_advanced,
            markup_pro: agency.markup_pro,
        });
        setIsEditOpen(true);
    };

    const onSubmit = async (data: AgencyFormData) => {
        setSaving(true);
        try {
            if (isEditOpen && selectedAgency) {
                const { error } = await supabase
                    .from("agencies")
                    .update(data)
                    .eq("id", selectedAgency.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("agencies")
                    .insert([data]);
                if (error) throw error;
            }
            await fetchAgencies();
            setIsAddOpen(false);
            setIsEditOpen(false);
            reset();
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
        if (!error) fetchAgencies();
    };

    const AgencyFormContent = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên đại lý</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <Input
                                    {...field}
                                    placeholder="Probase Agency VN"
                                    className={`h-11 border-slate-100 bg-slate-50 rounded-xl focus:bg-white text-sm font-bold text-indigo-900 ${errors.name ? "border-rose-300 bg-rose-50" : ""}`}
                                />
                                {errors.name && <AlertCircle size={14} className="text-rose-500 absolute right-3 top-1/2 -translate-y-1/2" />}
                            </div>
                        )}
                    />
                </div>

                {!isEditOpen && (
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã định danh (ID)</label>
                        <Controller
                            name="id"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="probase-vn"
                                        className={`h-11 border-slate-100 bg-slate-50 rounded-xl focus:bg-white text-[11px] font-mono font-bold text-indigo-900 ${errors.id ? "border-rose-300 bg-rose-50" : ""}`}
                                    />
                                    {errors.id && <AlertCircle size={14} className="text-rose-500 absolute right-3 top-1/2 -translate-y-1/2" />}
                                </div>
                            )}
                        />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <div className="space-y-1.5 col-span-2">
                        <h4 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest text-center">Chiết khấu (%)</h4>
                    </div>
                    {['economy', 'standard', 'advanced', 'pro'].map((tier) => (
                        <div key={tier} className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest capitalize">{tier}</label>
                            <Controller
                                name={`markup_${tier}` as keyof AgencyFormData}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        className="h-10 border-slate-100 bg-slate-50 rounded-xl focus:bg-white text-xs font-bold text-indigo-900"
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Custom Dropdown Filter for Agencies */}
                <div className="relative w-full max-w-xs" ref={filterRef}>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full h-12 px-5 bg-white ring-1 ring-slate-200 rounded-2xl flex items-center justify-between hover:ring-indigo-100 transition-all shadow-none"
                    >
                        <div className="flex items-center gap-3">
                            <Filter size={14} className="text-indigo-600" />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lọc đại lý</span>
                                <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider">
                                    {filterType === 'all' ? 'Tất cả đại lý' :
                                        filterType === 'active' ? 'Đang hoạt động' :
                                            filterType === 'has_revenue' ? 'Có doanh thu' : 'Mới cập nhật'}
                                </span>
                            </div>
                        </div>
                        <ChevronDown size={14} className={cn("text-slate-300 transition-transform duration-300", isFilterOpen && "rotate-180 text-indigo-600")} />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute top-full left-0 w-full bg-white border border-slate-100 rounded-2xl mt-2 z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-300 shadow-xl ring-1 ring-slate-200">
                            {[
                                { id: 'all', label: 'Tất cả đại lý' },
                                { id: 'active', label: 'Đang hoạt động' },
                                { id: 'has_revenue', label: 'Có doanh thu' },
                                { id: 'newest', label: 'Mới cập nhật' }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => { setFilterType(item.id); setIsFilterOpen(false); }}
                                    className={cn("w-full px-6 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-50/50 transition-colors", filterType === item.id ? "text-indigo-600 bg-indigo-50/30" : "text-slate-500")}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 font-bold shadow-none rounded-2xl gap-2 transition-all" onClick={() => {
                    reset({
                        name: "",
                        id: "",
                        markup_economy: 0,
                        markup_standard: 0,
                        markup_advanced: 0,
                        markup_pro: 0,
                    });
                    setIsAddOpen(true);
                }}>
                    <Plus size={18} /> Thêm đại lý
                </Button>
            </div>

            <Card className="border-none ring-1 ring-slate-200 shadow-none overflow-hidden bg-white rounded-3xl">
                <CardContent className="p-0 border-none shadow-none">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="hover:bg-transparent border-slate-100 shadow-none">
                                <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Đại lý</TableHead>
                                <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Chiết khấu (E/S/A/P)</TableHead>
                                <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">User</TableHead>
                                <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Doanh thu (VNĐ)</TableHead>
                                <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-300 italic uppercase text-[10px] tracking-widest">Đang tải...</TableCell></TableRow>
                            ) : filteredAgencies.length === 0 ? (
                                <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-300 italic uppercase text-[10px] tracking-widest">Không có dữ liệu</TableCell></TableRow>
                            ) : filteredAgencies.map((agency) => (
                                <TableRow
                                    key={agency.id}
                                    className="group hover:bg-indigo-50/30 transition-all cursor-default border-l-4 border-l-transparent hover:border-l-indigo-600 border-b border-slate-50 shadow-none"
                                    onDoubleClick={() => openEdit(agency)}
                                >
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:scale-110 transition-transform shadow-none">
                                                <Building2 size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-indigo-900">{agency.name}</span>
                                                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{agency.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-center">
                                        <div className="flex gap-1 justify-center">
                                            {[agency.markup_economy, agency.markup_standard, agency.markup_advanced, agency.markup_pro].map((m, i) => (
                                                <Badge key={i} variant="outline" className="text-[9px] font-bold px-1.5 py-0 rounded-md border-slate-100 bg-slate-50 text-slate-600">
                                                    {m}%
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-center text-[13px] font-bold text-slate-600">
                                        {agency.total_users_count || 0}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-center font-bold text-indigo-900">
                                        {(agency.total_income_vnd || 0).toLocaleString('en-US')}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 shadow-none" onClick={() => openEdit(agency)}>
                                                <Pencil size={14} className="text-slate-300 hover:text-indigo-600" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 shadow-none" onClick={() => handleDelete(agency.id)}>
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
                        className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 font-bold shadow-none rounded-2xl uppercase tracking-widest text-sm"
                        onClick={handleSubmit(onSubmit)}
                        disabled={saving}
                    >
                        {saving ? "Đang xử lý..." : "Xác nhận tạo"}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6 shadow-none">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-indigo-900 border-b-2 border-indigo-600 shadow-none">Thông tin đại lý</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors shadow-none">Cấu hình nâng cao</button>
                </div>
                <AgencyFormContent />
            </Sheet>

            <Sheet
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Cập nhật Đại lý"
                description="Chỉnh sửa tên và cấu hình chiết khấu cho đại lý."
                footer={
                    <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 font-bold shadow-none rounded-2xl uppercase tracking-widest text-sm"
                        onClick={handleSubmit(onSubmit)}
                        disabled={saving}
                    >
                        {saving ? "Đang cập nhật..." : "Lưu thay đổi"}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6 shadow-none">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-indigo-900 border-b-2 border-indigo-600 shadow-none">Thông tin đại lý</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors shadow-none">Dữ liệu doanh thu</button>
                </div>
                <AgencyFormContent />
            </Sheet>
        </div>
    );
}
