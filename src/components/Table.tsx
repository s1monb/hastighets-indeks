import { Entry } from "@prisma/client";

interface IProps {
  category: string;
  pages?: {
    id: string;
    url: string;
    history?: Entry[];
  }[];
  addNew: () => void;
}

export default function Table({ category, addNew, pages }: IProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Nettsider: {category}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            En tabell med hastighetsstatistikk for nettsider. <br />
            Legg til egen for å sammenligne.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={addNew}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Legg til
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Ranking
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      FCP
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      LCP
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CLS
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      TTFB
                    </th>
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
                  {pages?.map((page) => {
                    if (!!page.history) {
                      return (
                        <tr key={page.id}>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {page.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            <a
                              target="_blank"
                              rel="noreferrer noopener"
                              href={page.url}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {page.url}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                            {page.history[0]?.fcp}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {page.history[0]?.lcp}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {page.history[0]?.cls}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {page.history[0]?.ttfb}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {page.history[0]?.score}
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
      </div>
    </div>
  );
}
