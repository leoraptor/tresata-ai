"use client";

import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const page = () => {
  const router = useRouter();
  const { tasks, addTask } = useTaskContext();
  const [showToast, setShowToast] = useState<boolean>(false);

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),
    description: Yup.string().trim().required("Description is required"),
  });

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    addTask(newId, values.title.trim(), values.description.trim());

    resetForm();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push("/");
    }, 1500);
  };

  return (
    <section className="box py-4">
      <Formik
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
                ADD
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <Toast show={showToast} message="Task added successfully" />
    </section>
  );
};

export default page;
