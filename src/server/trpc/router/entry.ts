import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const entryRouter = router({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.entry.findFirst({ where: { id: input } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany();
  }),
  add: publicProcedure
    .input(
      z.object({
        url: z.string(),
        category: z.enum(["Netthandel", "Nettavis", "Byrå"]),
      })
    )
    .mutation(async ({ ctx, input: { url, category } }) => {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}`
      );

      const data = await response.json();

      const entry = await ctx.prisma.page.upsert({
        where: { url },
        create: {
          url,
          category,
        },
        update: {
          history: {
            create: {
              score: 100,
            },
          },
        },
      });

      return entry;
    }),
});
