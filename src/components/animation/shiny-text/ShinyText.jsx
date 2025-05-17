import "./ShinyText.css";

const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  onClick,
}) => {
  const animationDuration = `${speed}s`;

  return (
    <button
      className={`ring-2 ring-offset-0 ring-border_color hover:cursor-pointer px-4 py-2 rounded-lg shiny-text ${
        disabled ? "disabled" : ""
      } ${className}`}
      style={{ animationDuration }}
      onClick={!disabled ? onClick : undefined}
    >
      {text}
    </button>
  );
};

export default ShinyText;
