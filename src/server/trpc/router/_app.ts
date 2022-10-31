import { router } from "../trpc";
import { entryRouter } from "./entry";
import { pageRouter } from "./page";

export const appRouter = router({
  entry: entryRouter,
  page: pageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
