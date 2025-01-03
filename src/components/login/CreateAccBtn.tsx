import Link from 'next/link';
import React from 'react'

const CreateAccBtn = () => {
  return (
      <Link href="/create-account" className="flex justify-center items-center text-blue-700 font-bold text-[.75rem]">
        <button className="underline active:text-blue-800 visited:text-blue-900">
          Does not have an account?
        </button>
      </Link>
  );
};

export default CreateAccBtn