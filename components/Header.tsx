import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <header className="flex justify-start items-center w-full mt-5 border-b-2">
        <Link href="/">
          <h1 className="text-2xl">AI Photo Restoration</h1>
        </Link>
      </header>
    </div>
  );
}
