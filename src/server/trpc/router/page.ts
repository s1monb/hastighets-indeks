import { router, publicProcedure } from "../trpc";

export const pageRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.page.findMany({
      select: { id: true, url: true, history: true },
    });
  }),
});
