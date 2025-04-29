import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const appendValue = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculateResult = () => {
    try {
      // Trim trailing operators (like 1+ or 4/)
      const sanitizedInput = input.replace(/[\+\-\*\/\.]+$/, "");

      // Reject empty or invalid inputs
      if (!sanitizedInput || /[^\d\+\-\*\/\.]/.test(sanitizedInput)) {
        setInput("Error");
        return;
      }

      // Division by zero check
      if (/\b\/0(\.0*)?\b/.test(sanitizedInput)) {
        setInput("Cannot divide by zero");
        return;
      }

      const result = eval(sanitizedInput);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleKeyDown = (event) => {
    if (
      (event.key >= "0" && event.key <= "9") ||
      ["+", "-", "*", "/", "."].includes(event.key)
    ) {
      appendValue(event.key);
    } else if (event.key === "Enter") {
      event.preventDefault();
      calculateResult();
    } else if (event.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (event.key === "Escape") {
      clearInput();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="calculator">
        <input
          type="text"
          value={input}
          readOnly
          className="display"
          ref={inputRef}
          tabIndex="0"
        />
        <div className="buttons">
          <button onClick={clearInput}>C</button>
          <button onClick={() => appendValue("/")}>/</button>
          <button onClick={() => appendValue("*")}>*</button>
          <button onClick={() => appendValue("-")}>-</button>

          <button onClick={() => appendValue("7")}>7</button>
          <button onClick={() => appendValue("8")}>8</button>
          <button onClick={() => appendValue("9")}>9</button>
          <button onClick={() => appendValue("+")}>+</button>

          <button onClick={() => appendValue("4")}>4</button>
          <button onClick={() => appendValue("5")}>5</button>
          <button onClick={() => appendValue("6")}>6</button>
          <button onClick={calculateResult}>=</button>

          <button onClick={() => appendValue("1")}>1</button>
          <button onClick={() => appendValue("2")}>2</button>
          <button onClick={() => appendValue("3")}>3</button>
          <button onClick={() => appendValue(".")}>.</button>

          <button onClick={() => appendValue("0")} className="zero">
            0
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
