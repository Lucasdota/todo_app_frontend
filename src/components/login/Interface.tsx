"use client";
import Login from "./Login";
import Footer from "../shared/Footer";
import Title from "../shared/Title";

type Props = {};

const Interface = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 text-neutral-700 gap-10 xxl:px-16 xl:px-8">
      <Title />
      <Login />
      <Footer />
    </main>
  );
};

export default Interface;
