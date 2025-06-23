"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast = ({ message, show }: ToastProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-8 font-medium text-base py-2 rounded shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
