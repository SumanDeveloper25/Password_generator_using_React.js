import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("ABC");
  const [range, setRange] = useState(20);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsChracterAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let generatedPass = "";
    let str = "ABCCDEFGBIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwsyz";

    if (isNumberAllowed) str += "1234567890";
    if (isCharacterAllowed) str += "~`!@#$%^&*()_+=-{}[]:;.?/<>|";

    for (let i = 1; i <= range; i++) {
      let char = Math.floor(Math.random() * str.length);
      generatedPass += str.charAt(char);
    }

    setPassword(generatedPass);
  }, [range, isNumberAllowed, isCharacterAllowed]);

  useEffect(() => {
    generatePassword();
  }, [range, isCharacterAllowed, isNumberAllowed, generatePassword]);

  useEffect(() => {
    generatePassword();
  }, [range, isCharacterAllowed, isNumberAllowed, generatePassword]);

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-zinc-900">
      <div className="w-xl h-60 bg-zinc-800 rounded-3xl p-6">
        <h1 className="text-white text-2xl text-center font-semibold">
          Password Generator
        </h1>
        <div className="mt-5 flex gap-3">
          <div className="bg-zinc-100 text-black px-6 py-2 rounded-xl w-4/5">
            <input
              type="text"
              className="outline-none"
              placeholder="password"
              ref={passwordRef}
              value={password}
              readOnly
            />
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-gray-900 text-white w-1/5 border-2 rounded-2xl cursor-pointer"
          >
            Copy
          </button>
        </div>

        <div className="flex gap-4 mt-6">
          <div className="w-3/5 flex gap-2">
            <input
              className="w-40 cursor-pointer"
              type="range"
              defaultValue={range}
              min={6}
              max={50}
              onChange={(e) => setRange(Number(e.target.value))}
            />
            <label className="text-white">Range: {range}</label>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              defaultChecked={isNumberAllowed}
              onChange={() => setIsNumberAllowed((prev) => !prev)}
            />
            <label className="text-white">Numbers</label>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              defaultChecked={isCharacterAllowed}
              onChange={() => setIsChracterAllowed((prev) => !prev)}
            />
            <label className="text-white">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
