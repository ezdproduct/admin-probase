"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Filter,
    Download,
    Mail,
    User as UserIcon,
    Wallet,
    ArrowUpDown,
    Check,
    AlertCircle
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Sheet from "@/components/Sheet";

interface User {
    id: string;
    email: string;
    full_name: string;
    balance?: number;
    agency_id: string;
    created_at: string;
    phone?: string;
    status?: string;
}

export default function UsersPage() {
    const searchParams = useSearchParams();
    const appParam = searchParams.get('app');

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({
        full_name: "",
        email: "",
        phone: "",
        balance: 0,
        agency_id: "direct",
        status: "active"
    });
    const [actionLoading, setActionLoading] = useState(false);
    const [isWalletOpen, setIsWalletOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [walletAmount, setWalletAmount] = useState<number>(0);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [agencyFilter, setAgencyFilter] = useState<string>("all");

    useEffect(() => {
        if (appParam) {
            fetchUsers(appParam);
        }
    }, [appParam]);

    async function fetchUsers(slug: string) {
        setLoading(true);
        const tableName = `data_${slug.replace(/-/g, '_')}`;

        const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setUsers(data as User[]);
        } else {
            setUsers([]);
        }
        setLoading(false);
    }

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || u.status === statusFilter;
        const matchesAgency = agencyFilter === "all" || u.agency_id === agencyFilter;
        return matchesSearch && matchesStatus && matchesAgency;
    });

    const openAdd = () => {
        setIsEditing(false);
        setFormData({
            full_name: "",
            email: "",
            phone: "",
            balance: 0,
            agency_id: "direct",
            status: "active"
        });
        setIsSheetOpen(true);
    };

    const openEdit = (user: User) => {
        setIsEditing(true);
        setFormData({ ...user });
        setIsSheetOpen(true);
    };

    async function handleSubmit() {
        if (!appParam) {
            alert("Vui lòng chọn ứng dụng trước khi thực hiện thao tác này.");
            return;
        }
        setActionLoading(true);
        const tableName = `data_${appParam.replace(/-/g, '_')}`;

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from(tableName)
                    .update({
                        full_name: formData.full_name,
                        phone: formData.phone,
                        balance: formData.balance,
                        agency_id: formData.agency_id,
                        status: formData.status
                    })
                    .eq("id", formData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from(tableName)
                    .insert([{
                        full_name: formData.full_name,
                        email: formData.email,
                        phone: formData.phone,
                        balance: formData.balance,
                        agency_id: formData.agency_id,
                        status: formData.status,
                        created_at: new Date().toISOString()
                    }]);
                if (error) throw error;
            }
            setIsSheetOpen(false);
            fetchUsers(appParam);
        } catch (err: any) {
            alert("Lỗi: " + err.message);
        } finally {
            setActionLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!appParam) {
            alert("Lỗi: Không xác định được ứng dụng.");
            return;
        }
        if (!confirm("Xác nhận xóa người dùng này?")) return;
        const tableName = `data_${appParam.replace(/-/g, '_')}`;
        const { error } = await supabase.from(tableName).delete().eq("id", id);
        if (!error) {
            fetchUsers(appParam!);
        } else {
            alert("Lỗi khi xóa: " + error.message);
        }
    }

    async function handleAddFunds() {
        if (!selectedUser || !appParam) {
            alert("Vui lòng chọn ứng dụng và người dùng.");
            return;
        }
        if (walletAmount <= 0) {
            alert("Vui lòng nhập số tiền hợp lệ");
            return;
        }
        setActionLoading(true);
        const tableName = `data_${appParam.replace(/-/g, '_')}`;
        const newBalance = (selectedUser.balance || 0) + walletAmount;

        const { error } = await supabase
            .from(tableName)
            .update({ balance: newBalance })
            .eq("id", selectedUser.id);

        if (!error) {
            await fetchUsers(appParam);
            setIsWalletOpen(false);
            setWalletAmount(0);
        } else {
            alert("Lỗi khi nạp tiền: " + error.message);
        }
        setActionLoading(false);
    }

    const openWallet = (user: User) => {
        setSelectedUser(user);
        setWalletAmount(0);
        setIsWalletOpen(true);
    };

    const UserForm = ({ data, setData }: { data: Partial<User>, setData: (d: Partial<User>) => void }) => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Họ và tên</label>
                    <Input
                        placeholder="Nguyễn Văn A"
                        className="border-slate-200 h-10"
                        value={data.full_name || ""}
                        onChange={(e) => setData({ ...data, full_name: e.target.value })}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Email đăng nhập</label>
                    <Input
                        placeholder="user@gmail.com"
                        className={`border-slate-200 h-10 ${isEditing ? 'bg-slate-50 opacity-60' : ''}`}
                        disabled={isEditing}
                        value={data.email || ""}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Số điện thoại</label>
                        <Input
                            placeholder="09xxx..."
                            className="border-slate-200 h-10"
                            value={data.phone || ""}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Số dư ví (Coins)</label>
                        <Input
                            type="number"
                            className="border-slate-200 h-10"
                            value={data.balance || 0}
                            onChange={(e) => setData({ ...data, balance: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Mã đại lý (ID)</label>
                    <Input
                        placeholder="direct"
                        className="border-slate-200 h-10"
                        value={data.agency_id || ""}
                        onChange={(e) => setData({ ...data, agency_id: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Quản lý người dùng
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Cơ sở dữ liệu: <span className="text-slate-900 font-bold">{appParam?.replace(/-/g, ' ').toUpperCase() || 'Toàn hệ thống'}</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 border-slate-200 h-9 font-semibold text-slate-600">
                        <Download size={14} /> Xuất dữ liệu
                    </Button>
                    <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800 shadow-sm h-9 font-semibold" onClick={openAdd}>
                        <Plus size={14} /> Thêm User
                    </Button>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input
                                placeholder="Tìm theo tên, email..."
                                className="pl-9 h-9 bg-white border-slate-200 focus:ring-slate-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-9 gap-2 border-slate-200 font-semibold transition-colors ${statusFilter !== 'all' || agencyFilter !== 'all' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'text-slate-600'}`}
                                onClick={() => setIsFilterOpen(true)}
                            >
                                <Filter size={14} />
                                {statusFilter !== 'all' || agencyFilter !== 'all' ? 'Đang lọc' : 'Lọc kết quả'}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Người dùng</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Liên hệ</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Số dư</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600">Trạng thái</TableHead>
                                <TableHead className="px-6 py-4 font-semibold text-slate-600 text-right">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!appParam ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-slate-400 italic">
                                        Vui lòng chọn một Ứng dụng để xem danh sách người dùng
                                    </TableCell>
                                </TableRow>
                            ) : loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-slate-400">
                                        Đang tải dữ liệu...
                                    </TableCell>
                                </TableRow>
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-slate-400 italic">
                                        Không tìm thấy dữ liệu phù hợp
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="hover:bg-slate-50 transition-all group cursor-default border-l-2 border-l-transparent hover:border-l-slate-900 hover:shadow-sm"
                                        onDoubleClick={() => openEdit(user)}
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-bold border border-slate-100 group-hover:scale-110 transition-transform">
                                                    {user.full_name?.charAt(0) || <UserIcon size={16} />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 group-hover:text-slate-950 transition-colors">{user.full_name || "N/A"}</span>
                                                    <span className="text-[10px] text-slate-400 font-mono select-all truncate max-w-[120px]">{user.id}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Mail size={12} className="text-slate-300" />
                                                    <span className="text-xs font-medium">{user.email}</span>
                                                </div>
                                                {user.phone && <span className="text-[10px] text-slate-400 ml-5 font-mono">{user.phone}</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{(user.balance || 0).toLocaleString()}</span>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Coins</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge variant="outline" className={`text-[10px] font-bold border-none ring-1 ring-inset ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 shadow-sm shadow-emerald-100/50' : 'bg-slate-50 text-slate-600 ring-slate-600/20 shadow-sm shadow-slate-100/50'
                                                }`}>
                                                {user.status || 'active'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 transition-colors">
                                                        <MoreHorizontal size={16} className="text-slate-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[180px] font-sans shadow-xl border-slate-100">
                                                    <DropdownMenuLabel className="text-[10px] uppercase text-slate-400 font-bold tracking-widest px-2 py-1.5">Quản lý User</DropdownMenuLabel>
                                                    <DropdownMenuItem className="text-xs gap-2 py-2 cursor-pointer font-medium" onClick={() => openEdit(user)}>
                                                        <Pencil size={12} className="text-slate-400" /> Chỉnh sửa thông tin
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs gap-2 py-2 cursor-pointer font-medium">
                                                        <Wallet size={12} className="text-slate-400" /> Nạp tiền vào ví
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-slate-50" />
                                                    <DropdownMenuItem className="text-xs gap-2 py-2 cursor-pointer text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium" onClick={() => handleDelete(user.id)}>
                                                        <Trash2 size={12} /> Xóa vĩnh viễn
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Sheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                title={isEditing ? "Cập nhật User" : "Tạo User mới"}
                description="Điền thông tin tài khoản để quản lý trong hệ sinh thái."
                footer={
                    <Button
                        className="w-full bg-slate-900 border-none h-12 font-bold shadow-xl shadow-slate-200"
                        onClick={handleSubmit}
                        disabled={actionLoading}
                    >
                        {actionLoading ? "Đang xử lý..." : (isEditing ? "Cập nhật tài khoản" : "Khởi tạo tài khoản")}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Hồ sơ người dùng</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Quyền hạn</button>
                </div>
                <UserForm data={formData} setData={setFormData} />
            </Sheet>

            <Sheet
                isOpen={isWalletOpen}
                onClose={() => setIsWalletOpen(false)}
                title="Nạp tiền vào ví"
                description={`Cấp thêm số dư Coins cho người dùng ${selectedUser?.full_name}.`}
                footer={
                    <Button
                        className="w-full bg-slate-900 border-none h-12 font-bold shadow-xl shadow-slate-200"
                        onClick={handleAddFunds}
                        disabled={actionLoading}
                    >
                        {actionLoading ? "Đang xử lý..." : "Xác nhận nạp tiền"}
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Số dư nạp</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Lịch sử GD</button>
                </div>
                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-medium">Số dư hiện tại</span>
                            <span className="font-bold text-slate-900">{(selectedUser?.balance || 0).toLocaleString()} Coins</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Số lượng Coins cần nạp</label>
                        <Input
                            type="number"
                            placeholder="Nhập số lượng..."
                            className="border-slate-200 h-10 text-lg font-bold"
                            value={walletAmount || ""}
                            onChange={(e) => setWalletAmount(Number(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[10000, 50000, 100000].map(amount => (
                            <Button
                                key={amount}
                                variant="outline"
                                size="sm"
                                className="text-[10px] font-bold h-8 border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600"
                                onClick={() => setWalletAmount(amount)}
                            >
                                +{amount.toLocaleString()}
                            </Button>
                        ))}
                    </div>
                </div>
            </Sheet>

            <Sheet
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                title="Bộ lọc nâng cao"
                description="Tùy chỉnh danh sách hiển thị theo các tiêu chí cụ thể."
                footer={
                    <Button
                        variant="outline"
                        className="w-full border-slate-200 h-12 font-bold text-slate-600"
                        onClick={() => {
                            setStatusFilter("all");
                            setAgencyFilter("all");
                            setIsFilterOpen(false);
                        }}
                    >
                        Xóa tất cả bộ lọc
                    </Button>
                }
            >
                <div className="flex gap-4 border-b border-slate-100 mb-6">
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900">Tiêu chí lọc</button>
                    <button className="pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Sắp xếp</button>
                </div>
                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Trạng thái tài khoản</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['all', 'active', 'inactive'].map(status => (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? "default" : "outline"}
                                    size="sm"
                                    className={`h-9 font-semibold ${statusFilter === status ? 'bg-slate-900 border-slate-900' : 'border-slate-200 text-slate-600'}`}
                                    onClick={() => setStatusFilter(status)}
                                >
                                    {status === 'all' ? 'Tất cả' : status === 'active' ? 'Đang hoạt động' : 'Tạm khóa'}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Mã Đại lý (ID)</label>
                        <Input
                            placeholder="Nhập mã đại lý..."
                            className="border-slate-200 h-10"
                            value={agencyFilter === 'all' ? '' : agencyFilter}
                            onChange={(e) => setAgencyFilter(e.target.value || 'all')}
                        />
                    </div>
                </div>
            </Sheet>
        </div>
    );
}
