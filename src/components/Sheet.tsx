import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    description?: string;
    className?: string;
}

export default function Sheet({ isOpen, onClose, title, description, children, footer, className }: SheetProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end bg-transparent transition-all duration-300">
            {/* Backdrop wrapper to capture clicks outside */}
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className={cn(
                    "relative w-full max-w-md bg-white border-l border-slate-100 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-500 ease-out",
                    className
                )}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sheet
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-slate-50">
                    <div className="space-y-1">
                        <h3 className="font-bold text-xl text-slate-900 tracking-tight">{title}</h3>
                        {description && <p className="text-sm text-slate-400 font-medium">{description}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 -mt-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-6 border-t border-slate-50 bg-slate-50/50">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
