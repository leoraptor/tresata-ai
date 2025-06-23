"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import BackArrow from "./icons/BackArrow";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  let pageTitle = "TODO APP";
  const isFormPage =
    pathname.includes("/edit-task") || pathname.includes("/add-task");

  if (pathname.includes("/edit-task")) {
    pageTitle = "Edit Task";
  } else if (pathname.includes("/add-task")) {
    pageTitle = "Add Task";
  }

  return (
    <nav className="bg-primaryColor sticky top-0 left-0 right-0 z-50">
      <div className="box h-[60px] text-base font-semibold flex items-center gap-4">
        {isFormPage && (
          <div className="cursor-pointer" onClick={() => router.back()}>
            <BackArrow size={16} />
          </div>
        )}
        <p className="text-white">{pageTitle}</p>
      </div>
    </nav>
  );
};

export default Navbar;
