"use client"
import React from 'react'
import { useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";
import Todos from './Todos';
import TodosType from "./types/todos";
import { PiGearSix } from "react-icons/pi";
import { useRouter } from 'next/navigation';

export default function Interface() {
	const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [todos, setTodos] = useState<TodosType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
	const [popUp, setPopUp] = useState<boolean>(false);
	const [menu, setMenu] = useState<boolean>(false);
	const [redirectPopUp, setRedirectPopUp] = useState<boolean>(false);
	const router = useRouter();

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user information, you can try to logout and login again.");
      }
      const userDetails = await response.json();							
		setUserId(userDetails.id);
      setEmail(userDetails.email);
	  const sortedTodos = userDetails.todos.sort(
      (a: TodosType, b: TodosType) => a.id - b.id
    );
      setTodos(sortedTodos);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
			setPopUp(false);
    }
  };

	const Logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include", // include cookies in the request
      });

      if (response.ok) {
        console.log("Logged out successfully");
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

	return (
    <>
      {loading && <Spinner width={8} height={8} />}
      {error && (
        <p className="text-red-500 font-bold text-center mb-4">{error}</p>
      )}
      {error && (
        <button
          onClick={Logout}
          className="text-xs md:text-[0.7rem] sm:text-[0.65rem] py-1 px-2 shadow bg-slate-50 shadow-black/20 rounded transition-transform duration-150 ease-in-out transform active:scale-95"
        >
          Logout
        </button>
      )}
      {email && (
        <>
          <h1 className="text-xl font-bold md:text-base xs:text-sm">
            Welcome to your dashboard
          </h1>
          <div className="flex justify-between items-center gap-4">
            <h2 className="italic md:text-sm xs:text-[0.75rem]">{email}</h2>
            <button
              onClick={() => setMenu(true)}
              className={`shadow bg-white rounded p-0.5
								${menu || popUp || redirectPopUp ? "pointer-events-none" : null}`}
            >
              <PiGearSix className="text-gray-800 transform transition-transform active:rotate-45" />
            </button>
          </div>
          <Todos
            todos={todos}
            userId={userId}
            fetchUserInfo={fetchUserInfo}
            popUp={popUp}
            setPopUp={setPopUp}
            menu={menu}
            setMenu={setMenu}
            redirectPopUp={redirectPopUp}
            setRedirectPopUp={setRedirectPopUp}
            logout={Logout}
          />
        </>
      )}
    </>
  );
}
