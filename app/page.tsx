import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <section className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <Image
          src="/images/logo.png"
          alt="DineSpot restaurant discovery platform logo"
          width={600}
          height={320}
          priority
          className="mx-auto h-auto w-full max-w-md rounded-2xl"
        />

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          DineSpot Project Setup Complete
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
          Discover restaurants, explore delicious food and reserve your table
          with confidence.
        </p>

        <div className="mt-8 inline-flex rounded-full bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-600">
          Next.js + TypeScript + Tailwind CSS
        </div>
      </section>
    </main>
  );
}