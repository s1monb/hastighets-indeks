import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface IProps {
  search: string;
  setSearch: (search: string) => void;
}
export default function Search({ search, setSearch }: IProps) {
  return (
    <div className="flex w-full lg:max-w-lg">
      <label htmlFor="mobile-search" className="sr-only">
        Søk etter sider
      </label>
      <div className="relative w-full text-white focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-600"
            aria-hidden="true"
          />
        </div>
        <input
          id="mobile-search"
          className="block w-full rounded-md border-[1.5px] border-gray-300 bg-white py-3 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-500 shadow-sm transition-colors focus:border-indigo-400 focus:bg-opacity-100 focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm lg:py-2"
          placeholder="Søk etter sider"
          type="search"
          name="search"
          value={search}
          onReset={() => setSearch("")}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
