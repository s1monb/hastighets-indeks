import { Page } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Table from "../components/Table";

import { trpc } from "../utils/trpc";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Netthandel");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [addedSite, setAddedSite] = useState<Page>();

  const pages = trpc.page.getAll.useQuery(undefined, {
    cacheTime: 1000 * 60 * 60 * 24,
    placeholderData: [],
    keepPreviousData: true,
  });
  const create = trpc.entry.add.useMutation();

  const categories = [
    "Netthandel",
    "Nettavis",
    "Resturanter",
    "Byrå",
    "Hjemmeside",
  ];

  const createNewEntry = (
    url: string,
    category: "Netthandel" | "Nettavis" | "Byrå" | "Resturanter" | "Hjemmeside"
  ) => {
    create.mutate(
      { url, category },
      {
        onSuccess: (page) => {
          pages.refetch();
          setAddedSite(page);
        },
      }
    );
  };

  useEffect(() => {
    console.log(addedSite);
  }, [addedSite]);

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
                      key={c}
                      className={clsx(
                        c === selectedCategory && !search && "bg-indigo-500",
                        "group rounded px-2 py-1 text-white transition-all hover:bg-indigo-500 hover:shadow"
                      )}
                      onClick={() => {
                        setSelectedCategory(c);
                      }}
                    >
                      {c}{" "}
                      <span className="text-gray-400 transition-colors group-hover:text-white">
                        ({pages.data?.filter((p) => p?.category === c).length})
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
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setShowForm(!showForm)}
                  type="button"
                  className={clsx(
                    showForm
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border-indigo-700 bg-white text-indigo-700",
                    "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm  transition-colors  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  )}
                >
                  {showForm ? "Lukk skjema" : "Mål din side"}
                </button>
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
                    {addedSite && (
                      <div className="flex">
                        <div className="">{addedSite.url}</div>
                      </div>
                    )}
                    <Table
                      categories={categories}
                      search={search}
                      setSearch={setSearch}
                      showForm={showForm}
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
