import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const Navbar: FC = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">PRs</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
          </a>
        </div>
        <div className="flex lg:hidden">
          <Link href="/sign-in">
            <Button className="bg-primary">Actualiza tus PRs</Button>
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/sign-in">
            <Button className="bg-primary">Actualiza tus PRs</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
