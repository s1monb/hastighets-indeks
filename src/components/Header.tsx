export default function Header() {
  return (
    <header className="bg-indigo-600 pt-12 pb-24 md:pt-24 md:pb-48">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-5">
          <div className="relative items-center gap-8 md:grid md:grid-cols-3">
            <div className="md:col-span-2">
              <h1 className="text-2xl font-semibold text-white md:text-4xl">
                Hastighetsindeksen
              </h1>
              <p className="mt-2 hidden text-sm text-white/80 md:block">
                Hvor rask er din nettside i sammenligna med bransje-standarden?{" "}
                <br /> Legg inn ditt nettsted og test opp mot dine konkurrenter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
