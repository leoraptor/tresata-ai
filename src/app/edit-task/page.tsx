import React, { Suspense } from "react";
import EditTask from "./EditTask";

export default function EditTaskPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen text-base font-semibold">
          Loading...
        </div>
      }
    >
      <EditTask />
    </Suspense>
  );
}
