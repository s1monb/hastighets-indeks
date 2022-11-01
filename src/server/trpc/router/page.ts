import { router, publicProcedure } from "../trpc";

export const pageRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    let pages = await ctx.prisma.page.findMany({
      orderBy: { score: "desc" },
      include: { history: { orderBy: { score: "desc" } } },
    });

    return pages.map((page, i: number) => ({ ...page, rank: i + 1 }));
  }),
});
