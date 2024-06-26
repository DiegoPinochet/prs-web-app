import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/generalUI/Navbar";
import Link from "next/link";
import { getCurrentUser } from "./_fetchers/get-current.fetcher";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect(`/${user.username}`);
  }

  return (
    <div>
      <Navbar />
      <main className="isolate">
        <div className="relative pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Ten tus PRs en un solo lugar
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Aquí podrás ver tus PRs solo utilizando tu nombre de usuario
                  en el url. Revisa:
                </p>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  <Link href="/diego" className="text-primary">
                    {process.env.DEPLOYMENT_URL}/diego
                  </Link>
                  .
                </p>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Para crear PRs necesitas una cuenta, solo tarda 3 minutos.
                </p>
                <div className="mt-10 flex items-center justify-center w-full">
                  <Link href="/signup" className="w-full">
                    <Button className="bg-primary w-full">Vamos</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
