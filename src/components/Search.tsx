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
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="mobile-search"
          className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-3 pl-10 pr-3 leading-5 text-white placeholder-white transition-colors focus:border-transparent focus:bg-opacity-100 focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm lg:py-2"
          placeholder="Søk etter sider"
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
