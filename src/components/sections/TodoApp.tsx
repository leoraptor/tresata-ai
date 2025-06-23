"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/types/type";
import { format } from "date-fns";
import SearchIcon from "../icons/SearchIcon";
import ArrowIcon from "../icons/ArrowIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import useMediaQuery from "@/hooks/useMediaQuery";

const statuses: { key: Task["status"]; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "in progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export default function TodoApp() {
  const router = useRouter();
  const { tasks, deleteTask } = useTaskContext();
  const isMobile: boolean = useMediaQuery("(max-width: 768px)");
  const [openSection, setOpenSection] = useState<Task["status"] | null>(
    "pending"
  );
  const [searchTerm, setSearchTerm] = useState("");

  // filter tasks based on search
  const filteredTasksByStatus = statuses.map(({ key }) =>
    tasks
      .filter((t) => t.status === key)
      .filter((t) =>
        [t.title, t.description].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
  );

  const allFilteredTasks = filteredTasksByStatus.flat();

  return (
    <section className="py-4">
      {/* search input */}
      <div className="relative">
        <div className="absolute top-[22%] left-[1%]">
          <SearchIcon size={24} />
        </div>
        <input
          type="text"
          placeholder="Search To-do"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-[#DDDDDD] border-[1.5px] rounded-[3px] py-[10px] outline-none focus:border-primaryColor pl-[40px] pr-[20px] placeholder:text-secondaryTextColor lg:text-sm w-full xl:w-[500px]"
        />
      </div>

      {allFilteredTasks.length === 0 ? (
        <div className="mt-5 text-center text-primaryTextColor text-sm py-40 font-semibold">
          No task found
        </div>
      ) : (
        // task sections
        <div className="mt-5">
          {statuses.map(({ key, label }, index) => {
            const filtered = filteredTasksByStatus[index];
            if (filtered.length === 0) return null;

            const isOpen = openSection === key;

            return (
              <motion.div layout key={key} className="mb-5">
                <motion.div
                  layout
                  className="py-[10px] px-[14px] bg-secondaryColor rounded-[3px] cursor-pointer flex justify-between items-center"
                  onClick={() => setOpenSection(isOpen ? null : key)}
                >
                  <h2 className="text-primaryTextColor">
                    <span className="font-normal">{label}</span>{" "}
                    <span className="font-bold">({filtered.length})</span>
                  </h2>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowIcon size={12} />
                  </motion.span>
                </motion.div>

                {/*  */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      layout
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white"
                    >
                      {filtered.map((task) => (
                        <div
                          key={task.id}
                          className="relative p-4 border-b border-[#DDDDDD] group"
                        >
                          <div className="flex items-start gap-[18px]">
                            <div className="h-[30px] w-[33px] xl:w-[30px] p-2 rounded-full border-2 border-primaryColor flex items-center justify-center text-primaryColor text-base font-medium">
                              {task.title[0]}
                            </div>
                            <div className="w-full">
                              <div className="flex items-center justify-between w-full">
                                <div className="text-primaryColor text-sm font-semibold">
                                  {task.title}
                                </div>
                                <div className="flex items-center gap-[5px]">
                                  <div
                                    className={`rounded-full ${
                                      task.status === "pending"
                                        ? "bg-pendingTaskColor"
                                        : task.status === "in progress"
                                        ? "bg-inProgressTaskColor"
                                        : "bg-compeletedTaskColor"
                                    } h-[10px] w-[10px]`}
                                  ></div>
                                  <p className="text-xs text-primaryColor font-normal capitalize">
                                    {task.status}
                                  </p>
                                </div>
                              </div>
                              <p className="text-xs text-primaryTextColor font-normal mt-[6px]">
                                {task.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-[10px] text-shadow-secondaryTextColor font-normal mt-[14px]">
                                  {format(
                                    new Date(task.date),
                                    "eee dd, LLLL yyyy"
                                  )}
                                </p>
                                {/* Hover Icons */}

                                <div
                                  className={`flex gap-2 ${
                                    isMobile
                                      ? ""
                                      : "opacity-0 group-hover:opacity-100"
                                  }  transition-opacity`}
                                >
                                  <button
                                    onClick={() =>
                                      router.push(`/edit-task?id=${task.id}`)
                                    }
                                    title="Edit"
                                    className="cursor-pointer"
                                  >
                                    <EditIcon />
                                  </button>
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    title="Delete"
                                    className="cursor-pointer"
                                  >
                                    <DeleteIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/*  add button */}
      <div
        onClick={() => {
          router.push("/add-task");
        }}
        className="bg-primaryColor cursor-pointer rounded-full flex items-center justify-center h-[70px] w-[70px] fixed bottom-4 right-[8px] xl:right-4"
      >
        <svg
          width="22"
          height="25"
          viewBox="0 0 22 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 5.54688V19.3281M4.875 12.4375H17.125"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
