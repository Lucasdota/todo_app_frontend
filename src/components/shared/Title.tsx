import Image from 'next/image';
import React from 'react'
import ListIcon from "../../../public/list.png";

const Title = () => {
	return (
    <section
      aria-label="title"
      className="flex flex-col items-center gap-6"
    >
      <div className="flex items-center gap-1">
        <Image
          src={ListIcon}
          width={24}
          height={24}
          alt="logo, a notebook and a pen"
        />
        <h1 className="text-lg font-bold">Notarium</h1>
      </div>
      <h2 className="text-2xl font-bold drop-shadow-sm text-center">
        To-Do List App
      </h2>
    </section>
  );
}

export default Title