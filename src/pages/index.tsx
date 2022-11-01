import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import Table from "../components/Table";

import { trpc } from "../utils/trpc";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Netthandel");
  const [search, setSearch] = useState("");

  const pages = trpc.page.getAll.useQuery();
  const create = trpc.entry.add.useMutation();

  const categories = [
    { name: "Netthandel" },
    { name: "Nettavis" },
    { name: "Hjemmeside" },
  ];

  const createNewEntry = (
    url: string,
    category: "Netthandel" | "Nettavis" | "Hjemmeside"
  ) => {
    create.mutate(
      { url, category },
      {
        onSuccess: () => {
          pages.refetch();
        },
      }
    );
  };

  return (
    <div className="min-h-full">
      <Header />
      <main className="-mt-24 pb-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Liste med kategorier
              </h2>
              <div className="flex flex-col-reverse justify-between gap-4 overflow-hidden rounded-lg bg-indigo-700 px-3 py-3 lg:flex-row">
                <div className="hidden gap-4 md:flex">
                  {categories.map((c, i) => (
                    <button
                      key={c.name}
                      className={clsx(
                        c.name === selectedCategory &&
                          !search &&
                          "bg-indigo-500",
                        "group rounded px-2 py-1 text-white transition-all hover:bg-indigo-500 hover:shadow"
                      )}
                      onClick={() => setSelectedCategory(c.name)}
                    >
                      {c.name}{" "}
                      <span className="text-gray-400 transition-colors group-hover:text-white">
                        (
                        {
                          pages.data?.filter((p) => p.category === c.name)
                            .length
                        }
                        )
                      </span>
                    </button>
                  ))}
                </div>
                <div className="md:hidden">
                  <select
                    value={selectedCategory}
                    className="rounded border-white/40 bg-white/20 text-white"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <Search search={search} setSearch={setSearch} />
              </div>
            </section>
          </div>
          {/* Main 3 column grid */}
          <div className="mt-4 grid grid-cols-1 items-start gap-4 lg:mt-0 lg:grid-cols-5">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-5">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Alle sider innenfor kategorien
                </h2>
                <div className="relative overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <Table
                      search={search}
                      addNew={(url, category) => createNewEntry(url, category)}
                      pages={pages.data}
                      category={selectedCategory}
                    />
                  </div>
                </div>
              </section>
            </div>
            {/* Right column
            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Top 10 in category
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <DetailsView page={{ id: 1, score: 2 }} />
                  </div>
                </div>
              </section>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
