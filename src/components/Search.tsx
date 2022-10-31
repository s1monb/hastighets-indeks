export default function Search() {
  return (
    <div>
      <div className="mx-auto flex w-full max-w-md">
        <label htmlFor="mobile-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-white focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {/* <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" /> */}
          </div>
          <input
            id="mobile-search"
            className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white transition-colors focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Søk etter sider"
            type="search"
            name="search"
          />
        </div>
      </div>
    </div>
  );
}
