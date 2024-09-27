"use client";
import { Spacer } from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <header className="w-full h-14 ">
        <div className="fixed top-4 right-8 flex justify-stretch items-center">
          <UserButton />
          <Spacer x={4} />
          <ThemeSwitcher />
        </div>
      </header>
      <div className="flex justify-center items-center m-4">
        <main className="flex flex-col items-center justify-center w-full border-x-2 sm:w-full md:w-9/12 lg:w-6/12">
          <p>this is a main paragraph</p>
          <p>this is a main paragraph</p>
          <p>this is a main paragraph</p>
          <p>this is a main paragraph</p>
        </main>
      </div>
    </div>
  );
}
