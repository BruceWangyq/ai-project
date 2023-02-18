import Link from "next/link";
import menuData from "./menuData";
import React, { useEffect } from "react";
import { Menu, X } from "lucide-react";

import { useState } from "react";
import ThemeToggler from "../ThemeToggler";
import { AnimatePresence } from "framer-motion";

import { useSession } from "next-auth/react";
import { useSignInModal } from "./sign-in-modal";
import { motion } from "framer-motion";
import UserDropdown from "./UserDropdown";
import { FADE_IN_ANIMATION_SETTINGS } from "@/utils/motion";

export default function Header() {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // Sign In Modal
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <header
        className={`header px-2 top-0 left-0 z-40 flex w-full items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="mx-auto flex h-16 min-w-full items-center justify-around">
          <div className="w-80 max-w-full px-4 xl:mr-12">
            <Link href="/">
              <h1 className="text-lg font-bold text-black dark:text-white">
                An AI Startup
              </h1>
            </Link>
          </div>

          <div className="flex w-full items-center justify-between px-4">
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="absolute top-1/2 block translate-y-[-50%] rounded-lg mr-6 px-2 py-[6px]  hover:ring-2 ring-gray-300 lg:hidden"
            >
              {!navbarOpen ? (
                <Menu className="dark:text-white" />
              ) : (
                <X className="dark:text-white" />
              )}
            </button>
            <nav
              id="navbarCollapse"
              className={`navbar flex right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-black lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[120%] opacity-0"
              }`}
            >
              <ul className="block lg:flex lg:space-x-12">
                {menuData.map((menuItem, index) => (
                  <li key={menuItem.id} className="group relative ">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                      >
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <a
                          onClick={() => handleSubmenu(index)}
                          className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                        >
                          {menuItem.title}
                          <span className="pl-3">
                            <svg width="15" height="14" viewBox="0 0 15 14">
                              <path
                                d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </a>
                        <div
                          className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-black lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                            openIndex === index ? "block" : "hidden"
                          }`}
                        >
                          {menuItem?.submenu?.map((submenuItem) => (
                            <>
                              {submenuItem.path && (
                                <Link
                                  href={submenuItem.path}
                                  key={submenuItem.id}
                                  className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              )}
                            </>
                          ))}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex justify-center items-center">
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="w-32 rounded-full border border-black bg-black dark:bg-white p-1.5 px-4 mx-6 text-sm text-white dark:text-black transition-all hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white dark:hover:border-white"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
            <ThemeToggler />
          </div>
        </div>
      </header>
    </>
  );
}
