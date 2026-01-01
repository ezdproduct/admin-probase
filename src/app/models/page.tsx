"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Cpu, Pencil, Trash2, Image as ImageIcon, Upload, Loader2, X, Info, Eraser, Wallet, Check, AlertCircle, RefreshCw, ChevronDown, Filter, Search } from "lucide-react";

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
import { cn } from "@/lib/utils";

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
    avatar_url?: string;
    support_type?: string;
    category?: string;
}

export default function ModelsPage() {
    const [models, setModels] = useState<ModelProvider[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedModel, setSelectedModel] = useState<ModelProvider | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const [filterType, setFilterType] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    // Bento state
    const [globalRmbRate, setGlobalRmbRate] = useState(4000);
    const [globalUsdRate, setGlobalUsdRate] = useState(26000);
    const [syncingRmb, setSyncingRmb] = useState(false);
    const [syncingUsd, setSyncingUsd] = useState(false);
    const [isEditingRmb, setIsEditingRmb] = useState(false);
    const [isEditingUsd, setIsEditingUsd] = useState(false);

    const initialFormState: Partial<ModelProvider> = {
        name: "",
        model_id: "",
        pricing_unit: "1k-tokens",
        base_cost: 0,
        rate_rmb_vnd: globalRmbRate,
        avatar_url: "",
        sell_economy: 0,
        sell_standard: 0,
        sell_advanced: 0,
        sell_pro: 0,
        support_type: "",
        category: ""
    };

    const [formData, setFormData] = useState<Partial<ModelProvider>>(initialFormState);
    const [searchQuery, setSearchQuery] = useState("");

    // Feature-based categories from user image
    const modelCategories = useMemo(() => [
        "all", "Image recognition", "GPTs", "Image editing", "Digital Human",
        "Multimodal", "Real-time voice dialogue", "Vector Embedding",
        "tool", "asynchronous tasks", "reasoning", "Document Analysis", "Text-to-speech"
    ], []);

    const filteredModels = useMemo(() => {
        return models.filter(m => {
            const id = m.model_id.toLowerCase();
            const name = (m.name || "").toLowerCase();
            const matchesSearch = id.includes(searchQuery.toLowerCase()) || name.includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;
            if (filterType === "all") return true;

            // Prefer explicit category field if it exists
            if (m.category && m.category === filterType) return true;

            const support = (m as any).support_type?.toLowerCase() || "";

            if (filterType === "Image recognition") return id.includes('vision') || id.includes('vl') || id.includes('v-') || id.includes('recognition');
            if (filterType === "GPTs") return id.includes('gpt');
            if (filterType === "Image editing") return id.includes('editing') || id.includes('edit') || id.includes('canvas') || id.includes('upscale');
            if (filterType === "Digital Human") return id.includes('avatar') || id.includes('talk') || id.includes('human') || id.includes('liveportrait') || id.includes('animate-anyone') || id.includes('emo-') || id.includes('emoji-');
            if (filterType === "Multimodal") return id.includes('multimodal') || id.includes('4o') || id.includes('gemini-1.5') || id.includes('glm-4v');
            if (filterType === "Real-time voice dialogue") return id.includes('voice') || id.includes('talk') || id.includes('dialogue');
            if (filterType === "Vector Embedding") return id.includes('embedding') || id.includes('bge') || support.includes('embedding');
            if (filterType === "tool") return id.includes('tool') || id.includes('function');
            if (filterType === "asynchronous tasks") return ['pika', 'luma', 'kling', 'runway', 'video', 'async'].some(key => id.includes(key));
            if (filterType === "reasoning") return id.includes('reasoner') || id.includes('r1') || id.includes('o1') || id.includes('o3') || id.includes('thinking');
            if (filterType === "Document Analysis") return id.includes('long') || id.includes('doc') || id.includes('pdf') || id.includes('k2');
            if (filterType === "Text-to-speech") return id.includes('tts') || id.includes('speech') || id.includes('audio');

            return false;
        });
    }, [models, filterType, searchQuery]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "Bạn có thay đổi chưa lưu.";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    // Close filter on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSettings = useCallback(async () => {
        const { data } = await supabase.from("system_settings").select("*");
        if (data) {
            const rmb = data.find(s => s.key === "rate_rmb_vnd");
            const usd = data.find(s => s.key === "rate_usd_vnd");
            if (rmb) setGlobalRmbRate(rmb.value);
            if (usd) setGlobalUsdRate(usd.value);
        }
    }, []);

    const fetchModels = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from("model_providers").select("*").order("model_id");
        if (error) {
            console.error("Error fetching models:", error);
        } else if (data) {
            setModels(data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchModels();
        fetchSettings();

        const modelsSubscription = supabase
            .channel('model_providers_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'model_providers' }, () => {
                fetchModels();
            })
            .subscribe();

        const settingsSubscription = supabase
            .channel('system_settings_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'system_settings' }, () => {
                fetchSettings();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(modelsSubscription);
            supabase.removeChannel(settingsSubscription);
        };
    }, [fetchModels, fetchSettings]);

    const handleChange = (newData: Partial<ModelProvider>) => {
        setFormData(prev => ({ ...prev, ...newData }));
        setIsDirty(true);
    };

    const resetForm = () => {
        if (isDirty && !confirm("Huỷ bỏ thay đổi?")) return;
        setSelectedModel(null);
        setFormData({ ...initialFormState, rate_rmb_vnd: globalRmbRate });
        setIsDirty(false);
    };

    const startEdit = (model: ModelProvider) => {
        if (isDirty && !confirm("Chỉnh sửa model khác?")) return;
        setSelectedModel(model);
        setFormData({ ...model });
        setIsDirty(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `model-avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            handleChange({ avatar_url: publicUrl });
        } catch (error: any) {
            alert("Lỗi tải ảnh: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.name || !formData.model_id) {
            alert("Vui lòng nhập tên và Model ID");
            return;
        }
        setSaving(true);
        try {
            const payload = {
                name: formData.name,
                pricing_unit: formData.pricing_unit,
                base_cost: formData.base_cost,
                rate_rmb_vnd: formData.rate_rmb_vnd,
                sell_economy: formData.sell_economy,
                sell_standard: formData.sell_standard,
                sell_advanced: formData.sell_advanced,
                sell_pro: formData.sell_pro,
                model_id: formData.model_id,
                avatar_url: formData.avatar_url,
                support_type: formData.support_type,
                category: formData.category
            };

            if (selectedModel) {
                const { error } = await supabase
                    .from("model_providers")
                    .update(payload)
                    .eq("id", selectedModel.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("model_providers")
                    .insert([payload]);
                if (error) throw error;
            }

            setIsDirty(false);
            await fetchModels();
            if (!selectedModel) setFormData({ ...initialFormState, rate_rmb_vnd: globalRmbRate });
        } catch (error: any) {
            alert("Lỗi: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Xoá model này?")) return;
        const { error } = await supabase.from("model_providers").delete().eq("id", id);
        if (!error && selectedModel?.id === id) resetForm();
    };

    const updateGlobalRate = async (key: string, value: number, setSyncing: (v: boolean) => void, fieldInModel?: string) => {
        setSyncing(true);
        try {
            const { error: settingError } = await supabase
                .from("system_settings")
                .upsert({ key, value, updated_at: new Date().toISOString() });
            if (settingError) throw settingError;

            if (fieldInModel) {
                if (!confirm(`Cập nhật ${value.toLocaleString()} cho TẤT CẢ models?`)) {
                    setSyncing(false);
                    return;
                }
                const { error: updateError } = await supabase.from("model_providers").update({ [fieldInModel]: value }).neq("id", -1);
                if (updateError) throw updateError;
                await fetchModels();
            }
        } catch (error: any) {
            alert("Lỗi: " + error.message);
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="space-y-4 pt-4">
                {/* Simplified Professional Header */}
                <Card className="bg-white border-none ring-1 ring-slate-100 rounded-3xl overflow-hidden shadow-none">
                    <CardContent className="p-0">
                        <div className="flex flex-wrap lg:flex-nowrap items-stretch divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

                            {/* Search & Filter Group */}
                            <div className="flex-[2] p-4 flex items-center gap-4 bg-slate-50/20">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <Input
                                        placeholder="Tìm kiếm model theo ID hoặc tên..."
                                        className="w-full h-11 pl-10 border-slate-100 bg-white rounded-xl focus:ring-4 ring-indigo-50 text-sm font-medium shadow-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="w-48 relative group">
                                    <select
                                        className="w-full h-11 px-4 bg-white border border-slate-100 rounded-xl text-xs font-black uppercase tracking-wider text-indigo-900 focus:ring-4 ring-indigo-50 appearance-none cursor-pointer outline-none"
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        {modelCategories.map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat === 'all' ? 'TẤT CẢ MODEL' : cat.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                </div>
                            </div>

                            {/* Rates Section */}
                            <div className="flex-[2] p-4 flex items-center justify-center gap-8">
                                {/* RMB Rate */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                                        <Wallet size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Tỷ giá RMB</span>
                                        <div className="flex items-center gap-2">
                                            {isEditingRmb ? (
                                                <Input
                                                    type="number"
                                                    className="w-16 h-7 border-indigo-100 bg-indigo-50/30 px-2 text-sm font-black text-indigo-900 focus:ring-2 ring-indigo-100 shadow-none rounded-lg"
                                                    value={globalRmbRate}
                                                    onChange={e => setGlobalRmbRate(parseFloat(e.target.value))}
                                                    onBlur={() => {
                                                        updateGlobalRate('rate_rmb_vnd', globalRmbRate, setSyncingRmb, 'rate_rmb_vnd');
                                                        setIsEditingRmb(false);
                                                    }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="text-base font-black text-indigo-900 tracking-tight">{globalRmbRate.toLocaleString()}</span>
                                            )}
                                            {!isEditingRmb && (
                                                <button onClick={() => setIsEditingRmb(true)} className="p-1 text-slate-300 hover:text-indigo-600">
                                                    <Pencil size={12} />
                                                </button>
                                            )}
                                            <span className="text-[10px] font-bold text-slate-300">VND</span>
                                        </div>
                                    </div>
                                </div>

                                {/* USD Rate */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                                        <Wallet size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Tỷ giá USD</span>
                                        <div className="flex items-center gap-2">
                                            {isEditingUsd ? (
                                                <Input
                                                    type="number"
                                                    className="w-20 h-7 border-indigo-100 bg-indigo-50/30 px-2 text-sm font-black text-indigo-900 focus:ring-2 ring-indigo-100 shadow-none rounded-lg"
                                                    value={globalUsdRate}
                                                    onChange={e => setGlobalUsdRate(parseFloat(e.target.value))}
                                                    onBlur={() => {
                                                        updateGlobalRate('rate_usd_vnd', globalUsdRate, setSyncingUsd, 'rate_usd_vnd');
                                                        setIsEditingUsd(false);
                                                    }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="text-base font-black text-indigo-900 tracking-tight">{globalUsdRate.toLocaleString()}</span>
                                            )}
                                            {!isEditingUsd && (
                                                <button onClick={() => setIsEditingUsd(true)} className="p-1 text-slate-300 hover:text-indigo-600">
                                                    <Pencil size={12} />
                                                </button>
                                            )}
                                            <span className="text-[10px] font-bold text-slate-300">VND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="flex-1 p-4 bg-slate-50/50 flex flex-col justify-center items-center divide-y divide-slate-100">
                                <div className="w-full flex items-center justify-between mb-1 pb-1">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Hệ thống</span>
                                    <button onClick={() => { fetchModels(); fetchSettings(); }} title="Làm mới">
                                        <RefreshCw size={12} className={cn("text-slate-300 hover:text-indigo-600 transition-colors", loading && "animate-spin")} />
                                    </button>
                                </div>
                                <div className="w-full pt-1 flex items-baseline justify-between">
                                    <span className="text-xl font-black text-indigo-600">{filteredModels.length}</span>
                                    <span className="text-[9px] font-bold text-slate-300">MODELS</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="flex gap-6 flex-1 min-h-0 pb-8">
                {/* Column 1: Table List */}
                <div className="w-2/3 h-full overflow-hidden">
                    <Card className="border-none ring-1 ring-slate-200 overflow-hidden bg-white rounded-3xl h-full flex flex-col shadow-none">
                        <CardContent className="p-0 flex-1 overflow-auto no-scrollbar">
                            <Table>
                                <TableHeader className="bg-slate-50 sticky top-0 z-10">
                                    <TableRow className="hover:bg-transparent border-slate-100 shadow-none">
                                        <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Model</TableHead>
                                        <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Định giá</TableHead>
                                        <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Khả năng</TableHead>
                                        <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Gói dịch vụ</TableHead>
                                        <TableHead className="px-6 py-4 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-right">Thao tác</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading && models.length === 0 ? (
                                        <TableRow><TableCell colSpan={4} className="h-40 text-center text-slate-300 italic uppercase text-[10px] tracking-widest">Đang tải...</TableCell></TableRow>
                                    ) : filteredModels.length === 0 ? (
                                        <TableRow><TableCell colSpan={4} className="h-40 text-center text-slate-300 italic uppercase text-[10px] tracking-widest">Không có dữ liệu phù hợp</TableCell></TableRow>
                                    ) : filteredModels.map((model) => (
                                        <TableRow
                                            key={model.id}
                                            className={cn(
                                                "group hover:bg-indigo-50/30 transition-all cursor-pointer border-b border-slate-50 shadow-none",
                                                selectedModel?.id === model.id ? "bg-indigo-50/50" : ""
                                            )}
                                            onClick={() => startEdit(model)}
                                        >
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden shrink-0 shadow-none">
                                                        {model.avatar_url ? (
                                                            <img src={model.avatar_url} alt={model.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Cpu size={20} className="text-indigo-100" />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-bold text-indigo-900 group-hover:text-indigo-600 transition-colors truncate text-sm">{model.name}</span>
                                                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest">ID: {model.model_id}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="font-mono text-sm text-indigo-900 font-bold truncate">
                                                        {model.base_cost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 4 })}
                                                    </span>
                                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">
                                                        {model.pricing_unit}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="flex flex-wrap justify-center gap-1 max-w-[120px] mx-auto">
                                                    {(model as any).support_type ? (model as any).support_type.split(',').map((t: string) => (
                                                        <Badge key={t} variant="outline" className="text-[8px] font-black uppercase text-indigo-600 border-indigo-100 bg-indigo-50/50 px-1 py-0 h-4">
                                                            {t.trim()}
                                                        </Badge>
                                                    )) : (
                                                        <span className="text-[9px] text-slate-300 italic">N/A</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="flex justify-center gap-3">
                                                    {[model.sell_economy, model.sell_standard, model.sell_advanced, model.sell_pro].map((price, i) => (
                                                        <div key={i} className="flex flex-col items-center min-w-[40px]">
                                                            <span className="text-[7px] text-slate-300 font-bold uppercase tracking-widest">
                                                                {['ECO', 'STD', 'ADV', 'PRO'][i]}
                                                            </span>
                                                            <span className="text-[11px] font-bold text-indigo-900">
                                                                {Math.round(price).toLocaleString('en-US')}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all shadow-none"
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(model.id); }}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Column 2: CRUD Form (Fixed) */}
                <div className="w-1/3 h-full overflow-hidden relative">
                    {isDirty && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200 flex items-center gap-1.5 px-3 py-1 scale-90 shadow-none">
                                <AlertCircle size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Chưa lưu thay đổi</span>
                            </Badge>
                        </div>
                    )}

                    <Card className="border-none ring-1 ring-slate-200 bg-white rounded-3xl h-full flex flex-col overflow-hidden border-t-8 border-t-indigo-600 shadow-none">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    selectedModel ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                                )}>
                                    {selectedModel ? <Pencil size={20} /> : <Plus size={20} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-indigo-900 leading-none">{selectedModel ? "Chỉnh sửa" : "Tạo mới"}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Cấu hình chi tiết</p>
                                </div>
                            </div>
                            {selectedModel && (
                                <button onClick={resetForm} className="p-2 bg-white rounded-xl text-slate-300 hover:text-indigo-600 border border-slate-200 transition-all shadow-none" title="Hủy chọn">
                                    <Eraser size={18} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 no-scrollbar space-y-8">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-50 rounded-3xl bg-indigo-50/10 gap-4 group/avatar relative">
                                <div className="relative">
                                    <div className="w-28 h-28 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center ring-8 ring-white shadow-none">
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                                        ) : formData.avatar_url ? (
                                            <img src={formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-10 h-10 text-indigo-50" />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-white shadow-none"
                                    >
                                        <Upload size={16} />
                                    </button>
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                <div className="text-center">
                                    <p className="text-[9px] font-bold text-indigo-900 uppercase tracking-widest">Ảnh đại diện</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mã định danh</label>
                                        <Input
                                            placeholder="gpt-4o"
                                            className="h-11 border-slate-100 bg-slate-50 font-mono text-[11px] rounded-xl focus:bg-white focus:ring-4 ring-indigo-50 text-indigo-900 font-bold shadow-none"
                                            disabled={!!selectedModel}
                                            value={formData.model_id || ""}
                                            onChange={e => handleChange({ model_id: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Đơn vị tính</label>
                                        <Input
                                            placeholder="1k-tokens"
                                            className="h-11 border-slate-100 bg-slate-50 rounded-xl focus:bg-white focus:ring-4 ring-indigo-50 text-[11px] text-indigo-900 font-bold shadow-none"
                                            value={formData.pricing_unit || ""}
                                            onChange={e => handleChange({ pricing_unit: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tên hiển thị</label>
                                    <Input
                                        placeholder="GPT-4 Omni"
                                        className="h-11 border-slate-100 bg-slate-50 rounded-xl focus:bg-white focus:ring-4 ring-indigo-50 text-sm font-bold text-indigo-900 shadow-none px-4"
                                        value={formData.name || ""}
                                        onChange={e => handleChange({ name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Loại hỗ trợ (Capability)</label>
                                        <Input
                                            placeholder="openai, image"
                                            className="h-11 border-slate-100 bg-slate-50 rounded-xl focus:bg-white focus:ring-4 ring-indigo-50 text-[11px] font-mono text-indigo-900 shadow-none px-4"
                                            value={formData.support_type || ""}
                                            onChange={e => handleChange({ support_type: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Danh mục AI</label>
                                        <Input
                                            placeholder="reasoning"
                                            className="h-11 border-slate-100 bg-slate-50 rounded-xl focus:bg-white focus:ring-4 ring-indigo-50 text-[11px] font-bold text-indigo-900 shadow-none px-4"
                                            value={formData.category || ""}
                                            onChange={e => handleChange({ category: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-1">Giá sàn (RMB)</label>
                                        <Input type="number" className="h-11 border-indigo-50 bg-indigo-50/50 rounded-xl focus:bg-white text-indigo-600 font-bold text-sm shadow-none" value={formData.base_cost || 0} onChange={e => handleChange({ base_cost: parseFloat(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tỷ giá hệ thống</label>
                                        <Input type="number" className="h-11 border-slate-100 bg-slate-50 rounded-xl focus:bg-white text-indigo-900 font-bold text-sm shadow-none" value={formData.rate_rmb_vnd || 3500} onChange={e => handleChange({ rate_rmb_vnd: parseFloat(e.target.value) })} />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-50">
                                    <h4 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest text-center">Các mức giá dịch vụ</h4>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                        {['economy', 'standard', 'advanced', 'pro'].map((tier) => (
                                            <div key={tier} className="space-y-1.5">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">{tier.toUpperCase()}</label>
                                                <Input
                                                    type="number"
                                                    className="h-10 border-slate-100 bg-slate-50 rounded-xl focus:bg-white text-xs font-bold text-indigo-900 shadow-none"
                                                    value={formData[`sell_${tier}` as keyof ModelProvider] || 0}
                                                    onChange={e => handleChange({ [`sell_${tier}`]: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50/50">
                            <Button
                                className={cn(
                                    "w-full h-14 text-sm font-bold rounded-2xl transition-all uppercase tracking-widest shadow-none gap-2",
                                    isDirty ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-300 cursor-not-allowed"
                                )}
                                onClick={handleSave}
                                disabled={saving || uploading}
                            >
                                {saving ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        {selectedModel ? "Cập nhật thay đổi" : "Lưu vào hệ thống"}
                                        {isDirty && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                                    </>
                                )}
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
