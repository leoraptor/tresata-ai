"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import ArrowIcon from "./icons/ArrowIcon";

const statusOptions = [
  { label: "Pending", value: "pending", color: "#d0d0d0" },
  { label: "In Progress", value: "in progress", color: "#ffb03c" },
  { label: "Completed", value: "completed", color: "#368a04" },
];

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const CustomSelect: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = statusOptions.find((opt) => opt.value === value);

  return (
    <div className="relative w-full xl:w-[500px]" ref={ref}>
      <div
        className="border border-[#DDDDDD] px-4 py-2 rounded cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedOption?.color }}
          />
          <span className="capitalize text-sm">{selectedOption?.label}</span>
        </div>
        <span className="rotate-180">
          <ArrowIcon size={12} />
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 bg-white border border-[#DDDDDD] mt-1 w-full rounded shadow-sm"
          >
            {statusOptions.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  value === item.value ? "bg-gray-100" : ""
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="capitalize text-sm">{item.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
