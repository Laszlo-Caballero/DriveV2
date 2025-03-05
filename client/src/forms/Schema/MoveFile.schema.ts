import { z } from "zod";

export const MoveFileSchema = z.object({
  folder: z.string().nonempty({
    message: "Selecciona una carpeta",
  }),
});
