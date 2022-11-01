import { FaCrown } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { Entry } from "@prisma/client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

interface IProps {
  category: string;
  pages?: {
    category: string;
    rank: number;
    url: string;
    history?: Entry[];
  }[];
  search: string;
  addNew: (
    url: string,
    category: "Netthandel" | "Nettavis" | "Hjemmeside"
  ) => void;
}

export default function Table({ category, addNew, pages, search }: IProps) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  const tabelPages = search
    ? pages?.filter((p) => p.url.includes(search))
    : pages?.filter((p) => p.category === category);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const url = e.target[0].value;
    const category: "Netthandel" | "Nettavis" | "Hjemmeside" = [
      "Netthandel",
      "Nettavis",
      "Hjemmeside",
    ].includes(e.target[1].value)
      ? e.target[1].value
      : "Hjemmeside";

    setLoading(true);
    addNew(url, category);
  };

  useEffect(() => {
    if (pages) {
      setLoading(false);
    }
  }, [pages]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {search ? "Søkeresultater" : `Nettsider: ${category}`}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            En tabell med hastighetsstatistikk for nettsider. <br />
            Legg til egen for å sammenligne.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(!showForm)}
            type="button"
            className={clsx(
              showForm
                ? "border-indigo-700 bg-white text-indigo-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700",
              "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm  transition-colors  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            )}
          >
            {showForm ? "Lukk skjema" : "Mål din side"}
          </button>
        </div>
      </div>
      <motion.div
        initial={false}
        animate={showForm ? "open" : "closed"}
        variants={variants}
      >
        <form
          className="mt-4 flex w-full flex-col gap-4 md:flex-row"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full max-w-md flex-col">
            <label className="mb-1 text-sm" htmlFor="url">
              URL <span className="text-xs text-gray-600">(husk https://)</span>
            </label>
            <input
              className="rounded border-gray-300 bg-gray-50/10 shadow-sm focus:border-indigo-500 disabled:cursor-wait disabled:bg-gray-200 disabled:opacity-50"
              type="text"
              name="url"
              id="url"
              placeholder="https://www.example.com"
              required
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm" htmlFor="category">
              Kategori
            </label>
            <select
              disabled={loading}
              name="category"
              className="rounded border-gray-300 bg-gray-50/10 shadow-sm focus:border-indigo-500 disabled:cursor-wait disabled:bg-gray-200 disabled:opacity-50"
              id="category"
            >
              <option value="Netthandel">Netthandel</option>
              <option value="Nettavis">Nettavis</option>
              <option value="Hjemmeside">Hjemmeside/Blogg e.l.</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <button
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-wait disabled:bg-gray-300 disabled:opacity-50 sm:w-auto"
              type="submit"
              disabled={loading}
            >
              Mål siden min!
            </button>
          </div>
        </form>
        {loading && (
          <p className="text-md mt-6 mb-4 flex items-center gap-2">
            <GrReactjs className="h-5 w-5 animate-spin-slow opacity-80 duration-200" />{" "}
            Laster... Dette kan ta opptil 1 min
          </p>
        )}
      </motion.div>
      <AnimatePresence mode="popLayout">
        <motion.div
          initial={{ x: "40%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-40%", opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.2,
            ease: "easeOut",
          }}
          key={category}
          className="relative mt-8 flex flex-col"
        >
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-16 whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Ranking
                      </th>
                      <th
                        scope="col"
                        className="max-w-[100px] whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        URL
                      </th>
                      <th
                        scope="col"
                        className="hidden whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        <p data-tip data-for="fcp" className="cursor-help">
                          FCP <span className="text-xs text-gray-400">(?)</span>
                        </p>
                        <ReactTooltip
                          borderColor="light-gray"
                          role="tooltip"
                          multiline={true}
                          type="light"
                          border
                          id="fcp"
                        >
                          <span className="font-bold">
                            First Contentful Paint:
                          </span>{" "}
                          <p className="mt-4 font-light text-gray-600">
                            Tiden det tar før nettleseren har vist noe innhold
                            på
                            <br />
                            siden.
                          </p>
                          <p className="mt-4 underline">Lavere er bedre</p>
                        </ReactTooltip>
                      </th>
                      <th
                        scope="col"
                        className="hidden whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        <p data-tip data-for="lcp" className="cursor-help">
                          LCP <span className="text-xs text-gray-400">(?)</span>
                        </p>
                        <ReactTooltip
                          borderColor="light-gray"
                          role="tooltip"
                          multiline={true}
                          type="light"
                          border
                          id="lcp"
                        >
                          <span className="font-bold">
                            Largest Contentful Paint:
                          </span>{" "}
                          <p className="mt-4 font-light text-gray-600">
                            Tiden det tar for det største elementet på siden å
                            bli
                            <br />
                            synlig for brukeren av siden.
                          </p>
                          <p className="mt-4 underline">Lavere er bedre</p>
                        </ReactTooltip>
                      </th>
                      <th
                        scope="col"
                        className="hidden whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        <p data-tip data-for="cls" className="cursor-help">
                          CLS <span className="text-xs text-gray-400">(?)</span>
                        </p>
                        <ReactTooltip
                          borderColor="light-gray"
                          role="tooltip"
                          multiline={true}
                          type="light"
                          border
                          id="cls"
                        >
                          <span className="font-bold">
                            Cumulative Layout Shift:
                          </span>{" "}
                          <p className="mt-4 font-light text-gray-600">
                            Måling på mengden elementer som beveger på seg på
                            <br />
                            siden uten at det er meningen.
                          </p>
                          <p className="mt-4 underline">Lavere er bedre</p>
                        </ReactTooltip>
                      </th>
                      <th
                        scope="col"
                        className="hidden whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        <p data-tip data-for="ttfb" className="cursor-help">
                          TTFB{" "}
                          <span className="text-xs text-gray-400">(?)</span>
                        </p>
                        <ReactTooltip
                          borderColor="light-gray"
                          role="tooltip"
                          multiline={true}
                          type="light"
                          border
                          id="ttfb"
                        >
                          <span className="font-bold">Time To First Byte:</span>{" "}
                          <p className="mt-4 font-light text-gray-600">
                            Måler tiden det tar før nettleseren får første byte
                            fra
                            <br />
                            serveren.
                          </p>
                          <p className="mt-4 underline">Lavere er bedre</p>
                        </ReactTooltip>
                      </th>
                      <th
                        scope="col"
                        className="hidden whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        <p data-tip data-for="fid" className="cursor-help">
                          FID <span className="text-xs text-gray-400">(?)</span>
                        </p>
                        <ReactTooltip
                          borderColor="light-gray"
                          role="tooltip"
                          multiline={true}
                          type="light"
                          border
                          id="fid"
                        >
                          <span className="font-bold">First Input Delay:</span>{" "}
                          <p className="mt-4 font-light text-gray-600">
                            den tiden det tar før en bruker kan interagere med
                            <br />
                            siden.
                          </p>
                          <p className="mt-4 underline">Lavere er bedre</p>
                        </ReactTooltip>
                      </th>
                      {/* <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <p data-tip data-for="speed" className="cursor-help">
                        Speed Index{" "}
                        <span className="text-xs text-gray-400">(?)</span>
                      </p>
                      <ReactTooltip
                        borderColor="light-gray"
                        role="tooltip"
                        multiline={true}
                        type="light"
                        border
                        id="speed"
                      >
                        <span className="font-bold">Speed Index:</span>{" "}
                        <p className="mt-4 font-light text-gray-600">
                          Tiden det tar før nettleseren er klar for brukeren.
                        </p>
                        <p className="mt-4 underline">Lavere er bedre</p>
                      </ReactTooltip>
                    </th> */}
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Score
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {tabelPages?.map((page) => {
                      if (!!page.history && page.history[0]) {
                        return (
                          <tr key={page.rank}>
                            <td className="flex justify-between gap-4 whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                              #{page.rank}
                              {page.rank <= 3 && (
                                <FaCrown
                                  className={clsx(
                                    page.rank === 1 && "text-yellow-400",
                                    page.rank === 2 && "text-gray-400",
                                    page.rank === 3 && "text-red-400",
                                    "mr-2 h-5 w-5"
                                  )}
                                />
                              )}{" "}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                              <a
                                target="_blank"
                                rel="noreferrer noopener"
                                href={page.url}
                                className="inline-block max-w-[100px] cursor-pointer text-indigo-600 hover:text-indigo-900"
                              >
                                {page.url}
                              </a>
                            </td>
                            <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-900 md:table-cell">
                              {(page.history[0]?.fcp || 0) * 0.001}s
                            </td>
                            <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 sm:table-cell">
                              {(page.history[0]?.lcp || 0) * 0.001}s
                            </td>
                            <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 md:table-cell">
                              {((page.history[0]?.cls || 0) * 1000).toFixed(1)}
                            </td>
                            <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 lg:table-cell">
                              {(page.history[0]?.ttfb || 0) * 0.001}s
                            </td>
                            <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 sm:table-cell">
                              {((page.history[0]?.fid || 0) * 0.001).toFixed(2)}
                              s
                            </td>
                            {/* <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {((page.history[0]?.speed || 0) * 0.001).toFixed(2)}
                            s
                          </td> */}
                            <td className="flex items-center justify-center py-2">
                              <span
                                className={clsx(
                                  page.history[0]?.score > 90
                                    ? "border-green-300"
                                    : page.history[0]?.score > 65
                                    ? "border-yellow-500"
                                    : "border-red-500",
                                  "flex aspect-square w-8 items-center justify-center rounded-full border-2 text-sm"
                                )}
                              >
                                {page.history[0]?.score}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
