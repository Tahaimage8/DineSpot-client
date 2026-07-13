
import Image from "next/image";

export default function HomePage() {
  return (
   <main className="min-h-[calc(100vh-76px)] py-12 sm:py-16">
      <div className="container-shell">
        <section className="surface-card mx-auto max-w-3xl rounded-3xl p-6 text-center shadow-sm sm:p-10 lg:p-14">
          <Image
            src="/images/logo.png"
            alt="DineSpot restaurant discovery platform"
            width={600}
            height={320}
            priority
            className="mx-auto h-auto w-full max-w-md rounded-2xl"
          />

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
            Discover • Dine • Reserve
          </p>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Discover your next dining experience
          </h1>

          <p className="muted-text mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg">
            Find trusted restaurants, explore different cuisines and reserve
            your table through one simple platform.
          </p>
        </section>
      </div>
    </main>
  );
}