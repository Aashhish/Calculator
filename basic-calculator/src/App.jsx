import { useState, useEffect, useRef } from "react";
import "./App.css";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PercentIcon from "@mui/icons-material/Percent";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { FaDivide } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";

function App() {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState("");
  const inputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const displayMap = {
    "*": "×",
    "/": "÷",
  };

  const reverseDisplayMap = {
    "×": "*",
    "÷": "/",
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const appendValue = (value) => {
    setInput((prev) => prev + value);
    setDisplay((prev) => prev + (displayMap[value] || value));
  };

  const clearInput = () => {
    setInput("");
    setDisplay("");
  };

  const calculateResult = () => {
    try {
      if (!input.trim()) return;

      let expression = input;

      // Handle expressions like `450 + 10%` => `450 + (450 * 10 / 100)`
      expression = expression.replace(
        /(\d+(\.\d+)?)(\s*[\+\-])\s*(\d+(\.\d+)?)%/g,
        (match, base, _decimal1, operator, percent, _decimal2) => {
          return `${base}${operator}(${base}*${percent}/100)`;
        }
      );

      // Handle standalone percentages: 20% => (20/100)
      expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

      // Remove trailing operators
      expression = expression.replace(/[\+\-\*\/\.]+$/, "");

      // Validate input
      if (!expression || /[^\d\+\-\*\/\.\(\)]/.test(expression)) {
        setInput("Error");
        setDisplay("Error");
        return;
      }

      if (/\b\/0(\.0*)?\b/.test(expression)) {
        setInput("Cannot divide by zero");
        setDisplay("Cannot divide by zero");
        return;
      }

      const result = eval(expression);
      setInput(result.toString());
      setDisplay(result.toString());
    } catch (error) {
      console.error(error);
      setInput("Error");
      setDisplay("Error");
    }
  };

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
    setDisplay((prev) => prev.slice(0, -1));
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
      backspace();
    } else if (key === "Escape") {
      clearInput();
    }
  };

  useEffect(() => {
    const handle = (e) => handleKeyDown(e);
    window.addEventListener("keydown", handle);
    inputRef.current?.focus();

    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="title">Calculator</div>
      </div>
      <div className="calculator-wrapper">
        <div className={`calculator ${darkMode ? "dark" : ""}`}>
          <input
            type="text"
            value={display}
            readOnly
            className="display"
            ref={inputRef}
            tabIndex="0"
          />
          <div className="buttons">
            <button
              onClick={clearInput}
              data-key="Escape"
              style={{ color: "#ffa500" }}
            >
              AC
            </button>

            <button onClick={backspace} data-key="Backspace">
              <BackspaceIcon style={{ color: "#ffa500" }} />
            </button>

            <button onClick={() => appendValue("%")} data-key="%">
              <PercentIcon style={{ color: "#ffa500" }} />
            </button>

            <button onClick={() => appendValue("/")} data-key="/">
              <FaDivide color="#ffa500" />
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

            <button onClick={() => appendValue("*")} data-key="*">
              <ClearIcon style={{ color: "#ffa500" }} />
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

            <button onClick={() => appendValue("-")} data-key="-">
              <RemoveIcon style={{ color: "#ffa500" }} />
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

            <button onClick={() => appendValue("+")} data-key="+">
              <AddIcon style={{ color: "#ffa500" }} />
            </button>

            <button onClick={toggleDarkMode} className="dark-mode-toggle">
              <MdDarkMode />
            </button>

            <button onClick={() => appendValue("0")} data-key="0">
              0
            </button>
            <button onClick={() => appendValue(".")} data-key=".">
              .
            </button>

            <button
              className="equals"
              onClick={calculateResult}
              data-key="Enter"
            >
              =
            </button>
          </div>
        </div>
      </div>
      <div>
        <h6 className="bottom">Made By SURAJ</h6>
      </div>
    </>
  );
}

export default App;
