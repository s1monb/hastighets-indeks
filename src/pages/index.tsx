import clsx from "clsx";
import { useState } from "react";
import DetailsView from "../components/DetailsView";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Table from "../components/Table";

import { trpc } from "../utils/trpc";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Netthandel");

  const pages = trpc.page.getAll.useQuery();
  const create = trpc.entry.add.useMutation();

  const categories = [
    { name: "Netthandel", count: 3 },
    { name: "Nettavis", count: 41 },
    { name: "Byrå", count: 200 },
  ];

  const createNewEntry = () => {
    create.mutate(
      { url: "https://www.inevo.no", category: "Netthandel" },
      {
        onSuccess: () => {
          pages.refetch();
        },
      }
    );
  };

  return (
    <div className="min-h-full">
      <header className="bg-indigo-600 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="hidden py-5 lg:block">
            <div className="grid grid-cols-3 items-center gap-8">
              <div className="col-span-2">
                <h1 className="text-2xl font-semibold text-white">
                  Hastighetsindeksen
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="-mt-24 pb-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Liste med kategorier
              </h2>
              <div className="flex justify-between overflow-hidden rounded-lg bg-indigo-700 px-4 py-2">
                <div className="flex gap-4">
                  {categories.map((c, i) => (
                    <button
                      className={clsx(
                        c.name === selectedCategory && "bg-indigo-500",
                        "group rounded px-2 py-1 text-white transition-all hover:bg-indigo-500 hover:shadow"
                      )}
                      onClick={() => setSelectedCategory(c.name)}
                    >
                      {c.name}{" "}
                      <span className="text-gray-400 transition-colors group-hover:text-white">
                        ({c.count})
                      </span>
                    </button>
                  ))}
                </div>
                <Search />
              </div>
            </section>
          </div>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-5">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Alle sider innenfor kategorien
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <Table
                      addNew={() => createNewEntry()}
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
