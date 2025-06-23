"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";
import Toast from "@/components/Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSelect from "@/components/CustomSelect";
import { FormValuesType } from "@/types/type";

const EditTaskPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { tasks, updateTask } = useTaskContext();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<FormValuesType>({
    title: "",
    description: "",
    status: "pending",
  });

  const taskId: string | null = searchParams.get("id");

  useEffect(() => {
    if (taskId) {
      const task = tasks.find((item) => String(item.id) === String(taskId));
      if (task) {
        setInitialValues({
          title: task.title,
          description: task.description,
          status: task.status || "pending",
        });
      }
    }
  }, [taskId, tasks]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters required")
      .required("Title is required"),
    description: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters required")
      .required("Description is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    if (!taskId) return;

    updateTask(Number(taskId), {
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/");
    }, 1500);
  };

  if (!taskId || !tasks.find((item) => String(item.id) === String(taskId))) {
    return (
      <section className="box py-4 flex items-center justify-center h-screen">
        <p className=" text-base font-semibold">No task found</p>
      </section>
    );
  }

  return (
    <section className="box py-4">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                type="text"
                name="title"
                placeholder="Enter the title"
                className="border-[#DDDDDD] border-[1.5px] rounded-[3px] py-[10px] outline-none focus:border-primaryColor px-[20px] placeholder:text-secondaryTextColor lg:text-sm w-full xl:w-[500px]"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter the description"
                className="border-[#DDDDDD] border-[1.5px] rounded-[3px] py-[10px] outline-none focus:border-primaryColor min-h-[150px] px-[20px] placeholder:text-secondaryTextColor lg:text-sm w-full xl:w-[500px]"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field name="status">
                {({ field, form }: any) => (
                  <CustomSelect
                    value={field.value}
                    onChange={(val) => form.setFieldValue("status", val)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="status"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mt-[36px] flex items-center justify-between w-full xl:w-[500px]">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  router.back();
                }}
                className="cursor-pointer text-primaryColor text-sm font-medium w-[110px] py-[10px] flex items-center justify-center border-primaryColor border-2 rounded-[3px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer text-white bg-primaryColor text-sm font-medium w-[110px] py-[10px] flex items-center justify-center border-primaryColor border-2 rounded-[3px]"
              >
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <Toast show={showToast} message="Task updated successfully" />
    </section>
  );
};

export default EditTaskPage;
