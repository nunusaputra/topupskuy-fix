import "./ShinyText.css";

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <button
      className={`ring-2 ring-offset-0 ring-purple-500 hover:cursor-pointer px-4 py-2 rounded-lg shiny-text ${
        disabled ? "disabled" : ""
      } ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </button>
  );
};

export default ShinyText;
