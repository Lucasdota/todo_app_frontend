"use client";
import React from "react";
import CreateAcc from "@/components/createAcc/CreateAcc";
import Title from "@/components/shared/Title";
import Footer from "@/components/shared/Footer";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 text-neutral-700 gap-10 xxl:px-16 xl:px-8">
      <Title />
      <CreateAcc />
      <Footer />
    </main>
  );
};

export default page;
