"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Form() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean | null>(null);
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (username && password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [username, password]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setError(null);
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const form = e.target as HTMLFormElement;
    form.reset();

    if (!res.ok) {
      return setError(true);
    }

    const message = await res.json();
    console.log(message);
    return setError(false);
  };
  return (
    <form data-testid="formEle" onSubmit={onSubmitHandler}>
      <p>
        {typeof error === "object" ? "null" : error ? "Error" : "Successfull"}
      </p>
      <label htmlFor="username">Username</label>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
        type="text"
        id="username"
        name="username"
      />

      <label htmlFor="password">Password</label>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        type="password"
        id="password"
        name="password"
      />

      <button disabled={disable} type="submit">
        Login
      </button>
    </form>
  );
}
