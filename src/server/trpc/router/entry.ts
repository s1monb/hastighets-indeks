import { Entry, Prisma } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
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
        category: z.enum(["Netthandel", "Nettavis", "Hjemmeside"]),
      })
    )
    .mutation(async ({ ctx, input: { url, category } }) => {
      const data = await (
        await fetch(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=performance&strategy=mobile&key=${process.env.PAGESPEED_API_KEY}`
        )
      ).json();

      if (data.error) {
        console.log(data.error);

        throw new TRPCClientError("Something went wrong");
      }

      if (
        data.lighthouseResult.categories["performance"].score &&
        data.lighthouseResult.audits.metrics.details.items[0]
      ) {
        const metrics = data.lighthouseResult.audits.metrics.details.items[0];

        const entry: Omit<Omit<Prisma.EntryCreateInput, "page">, "score"> = {
          fid: metrics["maxPotentialFID"],
          cls: metrics["cumulativeLayoutShift"],
          fcp: metrics["firstContentfulPaint"],
          lcp: metrics["largestContentfulPaint"],
          ttfb: metrics["firstMeaningfulPaint"],
          speed: metrics["speedIndex"],
        };

        const score =
          data.lighthouseResult.categories["performance"].score * 100;

        const page = await ctx.prisma.page.upsert({
          where: { url },
          create: {
            score,
            url,
            category,
            history: {
              create: {
                score,
                ...entry,
              },
            },
          },
          update: {
            history: {
              create: {
                score,
                ...entry,
              },
            },
          },
        });

        if (page && page.score < score) {
          await ctx.prisma.page.update({
            where: { url },
            data: {
              score,
            },
          });
        }

        return page;
      }
      throw new TRPCClientError("Something went wrong");
    }),
});

// REFERENCE lighthouseResult.metrics.details.items[0]
// {
//     "observedNavigationStart": 0,
//     "observedTimeOrigin": 0,
//     "observedFirstContentfulPaintAllFrames": 536,
//     "observedFirstContentfulPaintAllFramesTs": 502737569649,
//     "observedTraceEnd": 12931,
//     "observedLoadTs": 502747477843,
//     "observedLargestContentfulPaintTs": 502737652285,
//     "observedTimeOriginTs": 502737033590,
//     "maxPotentialFID": 647,
//     "observedLargestContentfulPaintAllFrames": 619,
//     "largestContentfulPaint": 2214,
//     "observedFirstPaintTs": 502737569649,
//     "observedSpeedIndexTs": 502738168002,
//     "observedCumulativeLayoutShiftMainFrame": 0.0015221828884548613,
//     "observedTraceEndTs": 502749964783,
//     "observedFirstVisualChangeTs": 502737572590,
//     "observedFirstPaint": 536,
//     "observedFirstMeaningfulPaintTs": 502737569649,
//     "observedLoad": 10444,
//     "firstMeaningfulPaint": 2139,
//     "observedFirstContentfulPaintTs": 502737569649,
//     "observedLargestContentfulPaint": 619,
//     "observedFirstMeaningfulPaint": 536,
//     "cumulativeLayoutShift": 0.0015221828884548613,
//     "observedSpeedIndex": 1134,
//     "observedLargestContentfulPaintAllFramesTs": 502737652285,
//     "firstContentfulPaint": 2139,
//     "observedCumulativeLayoutShift": 0.0015221828884548613,
//     "speedIndex": 4683,
//     "cumulativeLayoutShiftMainFrame": 0.0015221828884548613,
//     "totalBlockingTime": 1446,
//     "observedDomContentLoadedTs": 502738026640,
//     "interactive": 9933,
//     "observedFirstContentfulPaint": 536,
//     "observedDomContentLoaded": 993,
//     "totalCumulativeLayoutShift": 0.0015221828884548613,
//     "observedTotalCumulativeLayoutShift": 0.0015221828884548613,
//     "observedLastVisualChange": 8089,
//     "observedNavigationStartTs": 502737033590,
//     "observedFirstVisualChange": 539,
//     "observedLastVisualChangeTs": 502745122590
// },
