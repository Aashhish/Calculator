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
      console.log("Input before calculation:", input); // Debug log

      if (!input.trim()) return;

      const sanitizedInput = input.replace(/[\+\-\*\/\.]+$/, "");

      if (!sanitizedInput || /[^\d\+\-\*\/\.]/.test(sanitizedInput)) {
        setInput("Error");
        return;
      }

      if (/\b\/0(\.0*)?\b/.test(sanitizedInput)) {
        setInput("Cannot divide by zero");
        return;
      }

      const result = eval(sanitizedInput);
      setInput(result.toString());
    } catch (error) {
      console.error(error);
      setInput("Error");
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const button = document.querySelector(`button[data-key="${key}"]`);

    if (button) {
      button.classList.add("active");
      setTimeout(() => {
        button.classList.remove("active");
      }, 150);
    }

    if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", "."].includes(key)) {
      appendValue(key);
    } else if (key === "Enter") {
      event.preventDefault();
      calculateResult();
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      clearInput();
    }
  };

  useEffect(() => {
    console.log("Input after change:", input); // Check updated input value

    const handle = (e) => handleKeyDown(e);
    window.addEventListener("keydown", handle);
    inputRef.current?.focus(); // Ensure input is focused

    return () => window.removeEventListener("keydown", handle);
  }, [input]); // Only re-run when the input state changes

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
          <button onClick={clearInput} data-key="Escape">
            C
          </button>
          <button onClick={() => appendValue("/")} data-key="/">
            /
          </button>
          <button onClick={() => appendValue("*")} data-key="*">
            *
          </button>
          <button onClick={() => appendValue("-")} data-key="-">
            -
          </button>

          <button onClick={() => appendValue("7")} data-key="7">
            7
          </button>
          <button onClick={() => appendValue("8")} data-key="8">
            8
          </button>
          <button onClick={() => appendValue("9")} data-key="9">
            9
          </button>
          <button onClick={() => appendValue("+")} data-key="+">
            +
          </button>

          <button onClick={() => appendValue("4")} data-key="4">
            4
          </button>
          <button onClick={() => appendValue("5")} data-key="5">
            5
          </button>
          <button onClick={() => appendValue("6")} data-key="6">
            6
          </button>
          <button onClick={calculateResult} data-key="Enter">
            =
          </button>

          <button onClick={calculateResult} data-key="Backspace">
            BS
          </button>

          <button onClick={() => appendValue("1")} data-key="1">
            1
          </button>
          <button onClick={() => appendValue("2")} data-key="2">
            2
          </button>
          <button onClick={() => appendValue("3")} data-key="3">
            3
          </button>
          <button onClick={() => appendValue(".")} data-key=".">
            .
          </button>

          <button
            onClick={() => appendValue("0")}
            className="zero"
            data-key="0"
          >
            0
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
