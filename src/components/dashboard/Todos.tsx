import React, { Dispatch, SetStateAction } from 'react'
import TodosType from "./types/todos";
import { CiSquarePlus } from "react-icons/ci";
import PopUp from './PopUp';
import { MdDeleteForever } from "react-icons/md";
import ConfigMenu from "./ConfigMenu";
import RedirectPopUp from './RedirectPopUp';

type Props = {
  todos: TodosType[] | null;
  userId: number | null;
  fetchUserInfo: () => void;
  popUp: boolean;
  setPopUp: Dispatch<SetStateAction<boolean>>;
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
  redirectPopUp: boolean;
  setRedirectPopUp: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
};

export default function Todos({
  todos,
  userId,
  fetchUserInfo,
  popUp,
  setPopUp,
  menu,
  setMenu,
  redirectPopUp,
  setRedirectPopUp,
  logout
}: Props) {
	
  const handleCreate = () => {
    setPopUp(true);
  };

  const handleCheckboxChange = async (todoId: number) => {	
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/todo`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update todo: ${errorMessage}`);
      }
      fetchUserInfo();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/todo`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId }),
      });
      if (!response.ok) {
        throw new Error("Failed to create todo.");
      }
      fetchUserInfo();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section
      className={`my-8 rounded shadow shadow-black/20 w-4/5 max-w-4xl md:w-full min-h-96 bg-slate-50/60 relative border-black/10 border flex justify-center  
			${todos!.length > 0 ? null : "items-center"}`}
    >
      {todos!.length > 0 ? (
        <div className="overflow-x-auto w-full flex flex-col items-center">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left border-black/10 border-b border-r"></th>
                <th className="p-2 text-left border-black/10 border-b border-r md:text-sm xs:text-[0.7rem]">
                  Name
                </th>
                <th className="p-2 text-left border-black/10 border-b border-r md:text-sm xs:text-[0.7rem]">
                  Description
                </th>
                <th className="p-2 border-black/10 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {todos!.map((todo, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b border-black/10"
                >
                  <td className="p-2 md:p-1 md:mb-1 border-r flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() =>
                        handleCheckboxChange(todo.id)
                      }
                      className="cursor-pointer md:w-2.5 accent-green-400"
                    />
                  </td>
                  <td
                    className={`p-2 md:py-1 border-r max-w-56 xxl:max-w-44 lg:max-w-32 md:max-w-24 md:text-sm xs:text-[0.7rem] break-words ${
                      todo.done ? "line-through decoration-green-800" : null
                    }`}
                  >
                    {todo.name}
                  </td>
                  <td
                    className={`p-2 md:py-1 border-r max-w-96 xxl:max-w-72 lg:max-w-64 md:max-w-52 sn:max-w-32 md:text-sm xs:text-[0.7rem] w-full break-words ${
                      todo.done ? "line-through decoration-green-800" : null
                    }`}
                  >
                    {todo.description}
                  </td>
                  <td className="p-2 md:p-1 flex items-center justify-center">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-400 transition-transform active:translate-y-0.5"
                    >
                      <MdDeleteForever className="w-5 h-5 md:w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCreate} className="w-fit m-2">
            <CiSquarePlus className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleCreate}
          className="flex-col items-center justify-center"
        >
          <p className="font-semibold">Create To-do</p>
          <CiSquarePlus className="w-6 h-6 mx-auto" />
        </button>
      )}
      {popUp && (
        <PopUp
          userId={userId}
          setPopUp={setPopUp}
          fetchUserInfo={fetchUserInfo}
        />
      )}
      {menu && (
        <ConfigMenu
          setMenu={setMenu}				
          setRedirectPopUp={setRedirectPopUp}
          logout={logout}
        />
      )}
      {redirectPopUp && <RedirectPopUp />}
    </section>
  );
}
