import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FaUser, FaEye } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Spinner from "../shared/Spinner";

interface formDataObj {
  userEmail: string | null;
  userPass: string | null;
  passConfirm: string | null;
}

const Form = () => {
  const [passError, setPassError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");
	const [serverError, setServerError] = useState<string>("");
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
	const [passValidated, setPassValidated] = useState<boolean>(false);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const passErrorRef = useRef<HTMLSpanElement | null>(null);
	const confirmPassErrorRef = useRef<HTMLSpanElement | null>(null);
	const router = useRouter();

  function validateForm(data: formDataObj) {
    // validate password
		const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?])(?=.{8,}).*$/;
    if (!regexPassword.test(data.userPass!)) {
      // nice animations when submit
      if (passErrorRef.current) {
        passErrorRef.current?.classList.remove("text-red-400");
        passErrorRef.current?.classList.add("text-slate-100");
        setTimeout(() => {
          passErrorRef.current?.classList.remove("text-slate-100");
          passErrorRef.current?.classList.add("text-red-400");
        }, 100);
      }
      setPassError(
        "Please enter, at least, an uppercase and a lowercase letter, a number and an special character."
      );
      setPassValidated(false);
      return false;
    }
    // validate that password and confirm password fields are the same
    else if (data.userPass !== data.passConfirm) {
      setPassValidated(true);
      setPassError("");
			if (confirmPassErrorRef.current) {
        confirmPassErrorRef.current?.classList.remove("text-red-400");
        confirmPassErrorRef.current?.classList.add("text-slate-100");
        setTimeout(() => {
          confirmPassErrorRef.current?.classList.remove("text-slate-100");
          confirmPassErrorRef.current?.classList.add("text-red-400");
        }, 100);
      }
      setConfirmError("Passwords are not the same.");
      return false;
    } else {
      setPassError("");
      setConfirmError("");
      setPassValidated(true);
      return true;
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmittedOnce(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObj: formDataObj = {
      userEmail: formData.get("user_email") as string | null,
      userPass: formData.get("user_pass") as string | null,
      passConfirm: formData.get("pass_confirm") as string | null,
    };
		const validated = validateForm(formDataObj);
		// send request to the server if validated
		if (validated) {
			try {
				setIsFetching(true);
				const response = await fetch(
          `https://todo-app-backend-1nyx.onrender.com/auth/register`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formDataObj.userEmail,
              password: formDataObj.userPass,
            }),
          }
        );
				const data = await response.text();
				if (!response.ok) {	
					setServerError(data);
        } else {
          console.log(data);
          router.push("/dashboard");
        }
			} catch (err) {
				if (err instanceof Error) {
          setServerError(err.message);
					console.log(err.message);		
				} else {
					setServerError("Unknown server error while creating account.")
				}		
			} finally {
				setIsFetching(false);
			}
		}    
  };

  function validatePasswordOnChange(e: ChangeEvent<HTMLInputElement>) {
    // compare passwords
    setPasswordValue(e.target.value);
    if (!submittedOnce) return;
    // ^: in the beginning of an string.
    // (?=.*[a-z]): at least a lowercase.
    // (?=.*[A-Z]): at least an uppercase.
    // (?=.*\d): at least a number.
    // (?=.*[@$!%*?&]): at least an special character.
    // [A-Za-z\d@$!%*?&]{8,}: verify if the actual value has at least 8 characters.
    // $: at the end of the string.
    if (
      e.target.value === "" ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        e.target.value
      )
    ) {
      setPassError(
        "Please enter, at least, an uppercase and a lowercase letter, a number and an special character."
      );
    } else {
      setPassError("");
    }
  }

  function validateConfirmPassOnChange(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPasswordValue(e.target.value);
  }

  //show error when both passwords are not the same in each interaction
  useEffect(() => {
    if (!submittedOnce) return;
    if (
      passwordValue !== confirmPasswordValue && passValidated
    ) {
      setConfirmError("Passwords are not the same.");
    } else {
      setConfirmError("");
    }
  }, [passwordValue, submittedOnce, confirmPasswordValue]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-3 w-full"
    >
      {/* email */}
      <div aria-label="email" className="flex flex-col w-full">
        <label
          htmlFor="user_email"
          className="text-[.75rem] font-bold text-neutral-400 mb-1"
        >
          Your email
        </label>
        <div className="relative flex items-center mb-2.5">
          <input
            id="user_email"
            name="user_email"
            type="email"
            autoComplete="email"
            aria-label="put your email here"
            placeholder="your@email.com"
            required
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-10 text-[.75rem] w-full"
          />
          <div className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100">
            <FaUser className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>

      {/* password */}
      <div aria-label="password" className="flex flex-col w-full">
        <label
          htmlFor="user_pass"
          className="text-[.75rem] font-bold text-neutral-400 mb-1"
        >
          Your password
        </label>
        <div className="relative flex items-center">
          <input
            id="user_pass"
            name="user_pass"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            aria-label="put your password here"
            placeholder="Password123!"
            required
            onChange={validatePasswordOnChange}
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-10 text-[.75rem] w-full pr-7"
          />
          <div
            aria-label="lock icon"
            className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100"
          >
            <FaLock className="w-2.5 h-2.5" />
          </div>
          <div
            role="button"
            id="show_pass"
            aria-label="click to show/hide password"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5"
          >
            <FaEye
              className={`w-3 h-3  ${
                showPassword ? "text-neutral-600" : "text-neutral-400"
              }`}
            />
          </div>
        </div>
        <div className="min-h-1.5 flex mt-1 ml-2">
          {passError && (
            <span
							ref={passErrorRef}
              role="alert"
              aria-label="password field error"
              key="passError-span"
              className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
            >
              {passError}
            </span>
          )}
        </div>
      </div>

      {/* confirm password */}
      <div aria-label="password" className="flex flex-col w-full">
        <label
          htmlFor="pass_confirm"
          className="text-[.75rem] font-bold text-neutral-400 mb-1"
        >
          Confirm your password
        </label>
        <div className="relative flex items-center">
          <input
            id="pass_confirm"
            name="pass_confirm"
            type={showConfirm ? "text" : "password"}
            aria-label="confirm your password here"
            placeholder="Password123!"
            required
            autoComplete="new-password"
            onChange={validateConfirmPassOnChange}
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-10 text-[.75rem] w-full pr-7"
          />
          <div
            aria-label="lock icon"
            className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100"
          >
            <FaLock className="w-2.5 h-2.5" />
          </div>
          <div
            role="button"
            id="show_pass_confirm"
            aria-label="click to show/hide password"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-2.5"
          >
            <FaEye
              className={`w-3 h-3  ${
                showConfirm ? "text-neutral-600" : "text-neutral-400"
              }`}
            />
          </div>
        </div>
        <div className="min-h-1.5 flex mt-1 ml-2">
          {confirmError && (
            <span
							ref={confirmPassErrorRef}
              role="alert"
              aria-label="confirm password field error"
              key="confirmError-span"
              className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
            >
              {confirmError}
            </span>
          )}
        </div>
      </div>

      {/* server error */}
      {serverError && (
        <span
					role="alert"
					aria-label="create account field error"
					key="createError-span"
          className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
        >
          {serverError}
        </span>
      )}

      {/* sign in button */}
      <button
        type="submit"
        aria-label="click to submit"
        className="text-[.75rem] w-4/5 bg-gradient-to-r from-green-700 to-green-500 text-white font-bold rounded-full py-1.5 shadow mt-2"
      >
        {isFetching ? <Spinner width={1} height={1} /> : "Create"}
      </button>
    </form>
  );
};

export default Form;
