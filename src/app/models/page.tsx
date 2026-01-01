"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Cpu, Pencil, Trash2 } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import Sheet from "@/components/Sheet";

interface ModelProvider {
    id: number;
    model_id: string;
    name: string;
    pricing_unit: string;
    base_cost: number;
    rate_rmb_vnd: number;
    sell_economy: number;
    sell_standard: number;
    sell_advanced: number;
    sell_pro: number;
}

export default function ModelsPage() {
    const [models, setModels] = useState<ModelProvider[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedModel, setSelectedModel] = useState<ModelProvider | null>(null);
    const [formData, setFormData] = useState<Partial<ModelProvider>>({
        pricing_unit: "1k-tokens",
        base_cost: 0,
        rate_rmb_vnd: 3500
    });

    useEffect(() => {
        fetchModels();
    }, []);

    async function fetchModels() {
        setLoading(true);
        const { data, error } = await supabase.from("model_providers").select("*").order("model_id");
        if (error) {
            console.error("Error fetching models:", error);
        } else if (data) {
            setModels(data);
        }
        setLoading(false);
    }

    const openEdit = (model: ModelProvider) => {
        setSelectedModel(model);
        setFormData({ ...model });
        setIsEditOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (isEditOpen && selectedModel) {
                // Update existing model
                const { error } = await supabase
                    .from("model_providers")
                    .update({
                        name: formData.name,
                        pricing_unit: formData.pricing_unit,
                        base_cost: formData.base_cost,
                        rate_rmb_vnd: formData.rate_rmb_vnd,
                        sell_economy: formData.sell_economy,
                        sell_standard: formData.sell_standard,
                        sell_advanced: formData.sell_advanced,
                        sell_pro: formData.sell_pro,
                        // If model_id is changed, we update it too. 
                        // Note: This works if model_id is not the primary key or if we assume ID is stable.
                        // Ideally we update based on unique 'id' not 'model_id'.
                        model_id: formData.model_id
                    })
                    .eq("id", selectedModel.id);

                if (error) throw error;
            } else {
                // Create new model
                const { error } = await supabase
                    .from("model_providers")
                    .insert([formData]);

                if (error) throw error;
            }

            await fetchModels();
            setIsAddOpen(false);
            setIsEditOpen(false);
            setSelectedModel(null);
        } catch (error: any) {
            console.error("Error saving model:", error);
            alert("Lỗi: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn xóa model này?")) return;

        const { error } = await supabase.from("model_providers").delete().eq("id", id);
        if (error) {
            alert("Lỗi khi xóa");
        } else {
            fetchModels();
        }
    };

    const ModelForm = ({ data, setData }: { data: Partial<ModelProvider>, setData: (d: Partial<ModelProvider>) => void }) => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model ID</label>
                        <Input
                            placeholder="gpt-4o"
                            className="h-10 border-slate-200 font-mono text-xs"
                            disabled={isEditOpen}
                            value={data.model_id || ""}
                            onChange={e => setData({ ...data, model_id: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đơn vị</label>
                        <Input
                            placeholder="1k-tokens"
                            className="h-10 border-slate-200"
                            value={data.pricing_unit || ""}
                            onChange={e => setData({ ...data, pricing_unit: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên hiển thị</label>
                    <Input
                        placeholder="GPT-4 Omni"
                        className="h-10 border-slate-200"
                        value={data.name || ""}
                        onChange={e => setData({ ...data, name: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giá sàn (RMB)</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.base_cost || 0} onChange={e => setData({ ...data, base_cost: parseFloat(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tỷ giá VND</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.rate_rmb_vnd || 3500} onChange={e => setData({ ...data, rate_rmb_vnd: parseFloat(e.target.value) })} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                    <div className="space-y-1.5 col-span-2">
                        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Giá bán (Coins)</h4>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Economy</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.sell_economy || 0} onChange={e => setData({ ...data, sell_economy: parseFloat(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.sell_standard || 0} onChange={e => setData({ ...data, sell_standard: parseFloat(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advanced</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.sell_advanced || 0} onChange={e => setData({ ...data, sell_advanced: parseFloat(e.target.value) })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pro</label>
                        <Input type="number" className="h-10 border-slate-200" value={data.sell_pro || 0} onChange={e => setData({ ...data, sell_pro: parseFloat(e.target.value) })} />
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
                        Cấu hình Model AI
                    </h1>
                    <p className="text-sm text-slate-500">
                        Quản lý giá bán và đơn vị tính cho các mô hình AI tích hợp.
                    </p>
                </div>
                <Button size="sm" className="bg-slate-900 gap-2 h-9 px-4 font-semibold shadow-sm" onClick={() => {
                    setFormData({ pricing_unit: "1k-tokens", base_cost: 0, rate_rmb_vnd: 3500 });
                    setIsAddOpen(true);
                }}>
                    <Plus size={16} /> Thêm Model
                </Button>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Model</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Đơn vị</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Giá sàn (RMB)</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600 text-center">Tiers (E/S/A/P)</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600 text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-400">Đang tải dữ liệu...</TableCell></TableRow>
                            ) : models.length === 0 ? (
                                <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-400 italic">Không có dữ liệu</TableCell></TableRow>
                            ) : models.map((model) => (
                                <TableRow
                                    key={model.id}
                                    className="group hover:bg-slate-50 transition-all cursor-default border-l-2 border-l-transparent hover:border-l-slate-900 hover:shadow-sm"
                                    onDoubleClick={() => openEdit(model)}
                                >
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform">
                                                <Cpu size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 group-hover:text-slate-950">{model.name}</span>
                                                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{model.model_id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge variant="outline" className="text-[9px] bg-slate-50 border-slate-200 text-slate-500 font-bold uppercase tracking-tighter">
                                            {model.pricing_unit}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 font-mono text-sm text-slate-600">
                                        {model.base_cost}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            {[model.sell_economy, model.sell_standard, model.sell_advanced, model.sell_pro].map((price, i) => (
                                                <div key={i} className="flex flex-col items-center min-w-[50px]">
                                                    <span className="text-[8px] text-slate-400 font-bold uppercase scale-90 opacity-70">
                                                        {['ECO', 'STD', 'ADV', 'PRO'][i]}
                                                    </span>
                                                    <span className="text-xs font-bold text-slate-900">
                                                        {Math.round(price).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 transition-colors" onClick={() => openEdit(model)}>
                                                <Pencil size={14} className="text-slate-400" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-rose-500 hover:bg-rose-50 transition-colors" onClick={() => handleDelete(model.id)}>
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
                title="Khởi tạo Model"
                description="Cấu hình thông số và giá bán cho nhà cung cấp AI mới."
                footer={
                    <Button
                        className="w-full bg-slate-900 h-12 font-bold shadow-xl shadow-slate-200"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Đang xử lý..." : "Xác nhận tạo Model"}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Cấu hình Model</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Pricing</button>
                </div>
                <ModelForm data={formData} setData={setFormData} />
            </Sheet>

            <Sheet
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Cập nhật Model"
                description="Điều chỉnh tên hiển thị và cấu hình giá bán cho model."
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
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Cấu hình Model</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Thống kê</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Logs</button>
                </div>
                <ModelForm data={formData} setData={setFormData} />
            </Sheet>
        </div>
    );
}
