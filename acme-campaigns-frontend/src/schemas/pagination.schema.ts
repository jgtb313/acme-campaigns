import { z } from "zod";

export const PaginationSchema = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export type Pagination<T> = T & z.infer<typeof PaginationSchema>;
export type PaginationResponse<T> = {
  values: T[];
  meta: {
    totalItems: number;
    totalPages: number;
  };
};
