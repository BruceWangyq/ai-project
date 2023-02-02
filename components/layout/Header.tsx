import Link from "next/link";
import Popover from "../Popover";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="mx-auto flex h-16 min-w-full items-center justify-around">
      <Link href="/">
        <h1 className="text-xl text-black dark:text-white">An AI Project</h1>
      </Link>
      <div className="flex">
        <Popover
          content={
            <div className="w-full rounded-md bg-white dark:bg-black p-2 sm:w-40">
              <Link
                href="/grammarcorrection"
                className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm dark:text-gray-200 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
              >
                Grammar Correction
              </Link>
            </div>
          }
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        >
          <button
            onClick={() => setOpenPopover(!openPopover)}
            className="flex w-40 items-center justify-between rounded-md  px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-600"
          >
            <p className="text-gray-600 dark:text-gray-200">AI Text</p>
            <ChevronDown
              className={`h-4 w-4 text-gray-600 dark:text-gray-200 transition-all ${
                openPopover ? "rotate-180" : ""
              }`}
            />
          </button>
        </Popover>
        <Popover
          content={
            <div className="w-full rounded-md bg-white dark:bg-black p-2 sm:w-40">
              <Link
                href="/prompt2image"
                className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm dark:text-gray-200 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
              >
                Prompt to Image
              </Link>
              <Link
                href="/image2prompt"
                className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm dark:text-gray-200 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
              >
                Image to Prompt
              </Link>
              <Link
                href="/restore"
                className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm dark:text-gray-200 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
              >
                Restore Image
              </Link>
            </div>
          }
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        >
          <button
            onClick={() => setOpenPopover(!openPopover)}
            className="flex w-40 items-center justify-between rounded-md  px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-600"
          >
            <p className="text-gray-600 dark:text-gray-200">AI Image</p>
            <ChevronDown
              className={`h-4 w-4 text-gray-600 dark:text-gray-200 transition-all ${
                openPopover ? "rotate-180" : ""
              }`}
            />
          </button>
        </Popover>
      </div>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-800 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {mounted && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-800 dark:text-gray-200"
          >
            {resolvedTheme === "dark" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        )}
      </button>
    </div>
  );
}
