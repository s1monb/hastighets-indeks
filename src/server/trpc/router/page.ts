import { Page } from ".prisma/client";
import { router, publicProcedure } from "../trpc";

export const pageRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const pages = await ctx.prisma.page.findMany({
      orderBy: { score: "desc" },
      include: { history: { orderBy: { updatedAt: "desc" } } },
    });

    const splitByCategory = pages.reduce((acc, page) => {
      const category = page.category || "uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }

      if (acc[category]) {
        // @ts-ignore
        acc[category].push(page);
      }

      return acc;
    }, {} as Record<string, Page[]>);

    const rankedPages: (Page & { rank: number })[] = Object.keys(
      splitByCategory
    )
      .map((category) =>
        splitByCategory[category]?.map((page, i) => ({
          ...page,
          rank: i + 1,
        }))
      )
      .flat() as (Page & { rank: number })[];

    return rankedPages;
  }),
});
