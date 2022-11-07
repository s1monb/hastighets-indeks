import { FaCrown } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { Entry, Page } from "@prisma/client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import Search from "./Search";

interface IProps {
  category: string;
  pages?: {
    category: string;
    rank: number;
    url: string;
    history?: Entry[];
  }[];
  addNew: (
    url: string,
    category: "Netthandel" | "Nettavis" | "Byrå" | "Resturanter" | "Hjemmeside"
  ) => void;
  showForm: boolean;
  search: string;
  setSearch: (search: string) => void;
  categories: string[];
}

export default function Table({
  category,
  addNew,
  pages,
  showForm,
  search,
  setSearch,
  categories,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [tablePages, setTablePages] = useState(
    pages?.filter((p) => p.category === category)
  );

  const [avrageValues, setAvrageValues] = useState({
    fcp: 0,
    fid: 0,
    lcp: 0,
    ttfb: 0,
    cls: 0,
    speed: 0,
    score: 0,
  });

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  useEffect(() => {
    if (search !== "") {
      setTablePages(pages?.filter((p) => p.url.includes(search)));
    } else {
      setTablePages(pages?.filter((p) => p.category === category));
    }
  }, [search, category, pages]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let url: string = e.target[0].value;

    const category:
      | "Netthandel"
      | "Nettavis"
      | "Byrå"
      | "Resturanter"
      | "Hjemmeside" = categories.includes(e.target[1].value)
      ? e.target[1].value
      : "Hjemmeside";

    if (url.startsWith("http")) {
      url = url.split("://")[1] || "";
    }

    if (url.startsWith("www.")) {
      url = url.slice(4);
    }

    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }

    setLoading(true);

    addNew("https://" + url, category);
  };

  useEffect(() => {
    if (pages) {
      setLoading(false);
    }
  }, [pages]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:items-end">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {search ? `Søkeresultater: ${search}` : `Nettsider: ${category}`}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            En tabell med hastighetsstatistikk for nettsider. <br />
            Legg til egen for å sammenligne.
          </p>
        </div>
        <div className="mt-4 w-full lg:max-w-md">
          <Search search={search} setSearch={setSearch} />
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
          <div className="flex w-full max-w-sm flex-col">
            <label className="mb-1 text-sm" htmlFor="url">
              URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                https://
              </span>
              <input
                className="w-full rounded-r border-gray-300 bg-gray-50/10 shadow-sm focus:border-indigo-500 disabled:cursor-wait disabled:bg-gray-200 disabled:opacity-50"
                type="text"
                name="url"
                id="url"
                placeholder="www.example.com"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm" htmlFor="category">
              Kategori
            </label>
            <select
              disabled={loading}
              name="category"
              className="mt-1 rounded border-gray-300 bg-gray-50/10 shadow-sm focus:border-indigo-500 disabled:cursor-wait disabled:bg-gray-200 disabled:opacity-50"
              id="category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
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
            Laster... Dette kan ta opptil 2 min
          </p>
        )}
      </motion.div>
      <div key={category} className="relative flex flex-col">
        <div className="-my-2 -mx-4 mt-8 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                          Tiden det tar før nettleseren har vist noe innhold på
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
                          Tiden det tar for det største elementet på siden å bli
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
                        TTFB <span className="text-xs text-gray-400">(?)</span>
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
                      className="flex items-center justify-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <p data-tip data-for="score" className="cursor-help">
                        Score <span className="text-xs text-gray-400">(?)</span>
                      </p>
                      <ReactTooltip
                        borderColor="light-gray"
                        role="tooltip"
                        multiline={true}
                        place="left"
                        type="light"
                        border
                        id="score"
                      >
                        <span className="font-bold">Score:</span>{" "}
                        <p className="mt-4 font-light text-gray-600">
                          Vi henter score fra Google&apos;s lighthouse, og gir
                          en
                          <br />
                          gjennomsnittsscore basert på mobil og desktop
                        </p>
                        <p className="mt-4 underline">
                          Høyere er bedre (0 - 100)
                        </p>
                      </ReactTooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tablePages?.map((page, i) => {
                    if (!!page.history && page.history[0]) {
                      const entry = page.history[0];
                      return (
                        <tr
                          className={clsx(
                            (i + 1) % 2 === 0 && "bg-gray-100",
                            "cursor-pointer border-l-4 border-transparent hover:border-indigo-500"
                          )}
                          key={page.rank}
                        >
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
                          <td
                            id={page.url}
                            className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                          >
                            <a
                              target="_blank"
                              rel="noreferrer noopener"
                              href={page.url}
                              className="inline-block max-w-[100px] cursor-pointer overflow-x-scroll text-indigo-600 hover:text-indigo-900 md:max-w-[200px]"
                            >
                              {page.url.split("://")[1]}
                            </a>
                          </td>
                          <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-900 md:table-cell">
                            {((entry.fcp || 0) * 0.001).toFixed(2)}s
                          </td>
                          <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 sm:table-cell">
                            {((entry.lcp || 0) * 0.001).toFixed(2)}s
                          </td>
                          <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 md:table-cell">
                            {((entry.cls || 0) * 1000).toFixed(1)}
                          </td>
                          <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 lg:table-cell">
                            {((entry.ttfb || 0) * 0.001).toFixed(2)}s
                          </td>
                          <td className="hidden whitespace-nowrap px-2 py-2 text-sm text-gray-500 sm:table-cell">
                            {((entry.fid || 0) * 0.001).toFixed(2)}s
                          </td>
                          {/* <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {((page.history[0]?.speed || 0) * 0.001).toFixed(2)}
                            s
                          </td> */}
                          <td className="flex items-center justify-center py-2">
                            <span
                              className={clsx(
                                entry.score > 90
                                  ? "border-green-300"
                                  : entry.score > 65
                                  ? "border-yellow-500"
                                  : "border-red-500",
                                "flex aspect-square w-10 items-center justify-center rounded-full border-2 text-sm"
                              )}
                            >
                              {((entry.score + entry.desktopScore) / 2).toFixed(
                                1
                              )}
                            </span>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
              {search && tablePages?.length === 0 && (
                <div>
                  <p className="flex w-full justify-center py-8 text-center text-gray-500">
                    Fant ingen sider som matcher søket ditt
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
