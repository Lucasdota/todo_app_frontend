import React, { Dispatch, SetStateAction, useRef, useEffect, useState } from 'react'
import { LiaWindowCloseSolid } from "react-icons/lia";
import Spinner from '../shared/Spinner';

type Props = {
  userId: number | null;
  setPopUp: Dispatch<SetStateAction<boolean>>;
  fetchUserInfo: () => void;
};

export default function PopUp({ userId, setPopUp, fetchUserInfo }: Props) {
  const formSection = useRef<HTMLFormElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const backendURL = "https://todo-app-backend-1nyx.onrender.com";	

  const validateInputs = () => {
    let isValid = true;
    if (name.length === 0) {
      setNameError("Name is required.");
      isValid = false;
    } else if (name.length > 100) {
      setNameError("To-do name cannot be more than 100 characters.");
      isValid = false;
    } else {
      setNameError("");
    }
    if (description.length === 0) {
      setDescriptionError("Description is required.");
      isValid = false;
    } else if (description.length > 255) {
      setDescriptionError("Description cannot be more than 255 characters.");
      isValid = false;
    } else {
      setDescriptionError("");
    }
    return isValid;
  };

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();	
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await fetch(`${backendURL}/todo`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          name: name,
          description: description,
        }),
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to create todo.");
      }
    } catch (err) {
	  console.error(err);		
      setLoading(false);
    } finally {
			setLoading(false);
      fetchUserInfo();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formSection.current &&
        !formSection.current.contains(event.target as Node)
      ) {
        setPopUp(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPopUp]);

  return (
    <section
      ref={formSection}
      className="absolute w-full h-full z-10 bg-slate-200/30 backdrop-blur-lg flex flex-col items-center justify-center"
    >
      <button
        onClick={() => setPopUp(false)}
        className="absolute right-8 top-4 text-neutral-500"
      >
        <LiaWindowCloseSolid />
      </button>
      <form
        onSubmit={createTodo}
        className="flex flex-col items-center justify-center gap-2 w-full"
      >
        {/* name */}
        <div aria-label="name" className="w-4/5">
          <label
            htmlFor="todo-name"
            className="text-[.75rem] font-bold text-neutral-500 mb-1"
          >
            Name
          </label>
          <input
            id="todo-name"
            name="todo-name"
            aria-label="Put the to-do name here"
            placeholder="To-do name"
            required
            onChange={(e) => setName(e.target.value)}
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-2 text-[.75rem] w-full"
          />
          {nameError && (
            <span
              role="alert"
              aria-label="name field error"
              key="nameError-span"
              className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
            >
              {nameError}
            </span>
          )}
        </div>
        {/* description */}
        <div aria-label="description" className="w-4/5">
          <label
            htmlFor="todo-description"
            className="text-[.75rem] font-bold text-neutral-500 mb-1"
          >
            Description
          </label>
          <input
            id="todo-description"
            name="todo-description"
            aria-label="Put the to-do description here"
            placeholder="To-do description"
            required
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-2 text-[.75rem] w-full"
          />
          {descriptionError && (
            <span
              role="alert"
              aria-label="description field error"
              key="descriptionError-span"
              className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
            >
              {descriptionError}
            </span>
          )}
        </div>
        {/* add btn */}
        <button className="text-[.85rem] font-bold text-neutral-500 py-1 px-2 bg-white rounded border">
          {loading ? <Spinner width={1} height={1} /> : "Add"}
        </button>
      </form>
    </section>
  );
}
