export type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
  date: string;
};

export interface TaskContextType {
  tasks: Task[];
  addTask: (id: number, title: string, description: string) => void;
  updateTask: (id: number, updatedFields: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

type TaskStatus = "pending" | "in progress" | "completed";

export type FormValuesType = {
  title: string;
  description: string;
  status: TaskStatus;
};
