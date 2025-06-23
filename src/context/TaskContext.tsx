"use client";

import { Task, TaskContextType } from "@/types/type";
import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design homepage",
      description: "Create mockups for the new landing page",
      status: "pending",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Implement auth",
      description: "Set up OAuth login system",
      status: "in progress",
      date: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Test deployment",
      description: "Verify production deployment and CDN",
      status: "completed",
      date: new Date().toISOString(),
    },
    {
      id: 4,
      title: "Next.js",
      description: "Work on Next.js hydration error",
      status: "pending",
      date: new Date().toISOString(),
    },
    {
      id: 5,
      title: "react.js",
      description: "Look for new react.js frame work",
      status: "in progress",
      date: new Date().toISOString(),
    },
    {
      id: 6,
      title: "Update all tickets",
      description: "Update all tickets",
      status: "completed",
      date: new Date().toISOString(),
    },
  ]);

  const addTask = (id: number, title: string, description: string) => {
    const newTask: Task = {
      id,
      title,
      description,
      status: "pending",
      date: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: number, updatedFields: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
