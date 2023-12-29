"use client";

import "./globals.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";

const LoginPage = () => {
  const [length, setLength] = useState(50);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(password);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+";
    }
    for (var i = 1; i <= length; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  var copyPasswordToClipBoard = useCallback(() => {
    navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center global">
      <div className="w-auto mx-auto rounded-lg px-5 p-4 text-orange-500 bg-gray-700 text-xl">
        <p className="text-white text-center my-2">Password Generator</p>
        <div className="flex rounded-lg mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 my-3 rounded-lg"
            placeholder="Password"
            readOnly
          />
          <Button
            className="outline-none my-3 mx-2 rounded-full bg-green-400"
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </Button>
        </div>
        <div className="flex text-m gap-x-10">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              ref={passwordRef}
            />
            <label>Length : {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
