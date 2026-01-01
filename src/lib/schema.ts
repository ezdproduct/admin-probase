import { z } from "zod";

export const agencySchema = z.object({
    name: z.string().min(1, "Tên đại lý là bắt buộc"),
    id: z.string().min(1, "Mã đại lý là bắt buộc").regex(/^[a-z0-9-_]+$/, "ID chỉ được chứa ký tự thường, số, dấu gạch ngang và gạch dưới"),
    markup_economy: z.number().min(0, "Không được âm").max(100, "Tối đa 100%"),
    markup_standard: z.number().min(0, "Không được âm").max(100, "Tối đa 100%"),
    markup_advanced: z.number().min(0, "Không được âm").max(100, "Tối đa 100%"),
    markup_pro: z.number().min(0, "Không được âm").max(100, "Tối đa 100%"),
});

export type AgencyFormData = z.infer<typeof agencySchema>;
