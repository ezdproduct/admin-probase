export default function PageHeader({ title, description, children }: { title: string, description?: string, children?: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
                {description && <p className="text-sm text-slate-500 font-medium">{description}</p>}
            </div>
            <div className="flex items-center gap-2">{children}</div>
        </div>
    );
}
