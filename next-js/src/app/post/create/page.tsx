/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserCreate() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const addUser = async (e: any) => {
    e.preventDefault();
    if (username !== "" && address !== "" && name !== "" && phone !== "") {
      const formData = {
        username: username,
        name: name,
        address: address,
        phone: phone,
      };

      const add = await fetch("/utils/queries/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const content = await add.json();
      if (content) {
        router.push("/post");
        alert("data berhasil ditambah");
      } else {
        alert(content.message);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl m-auto">
      <form className="w-full" onSubmit={addUser}>
        <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
          Form Add
        </span>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Address
          </label>
          <textarea
            name="address"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setAddress(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: any) => setPhone(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
