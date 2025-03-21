import React from "react";

const Label = (props) => {
  const { htmlFor, children, styling } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-bold text-white mb-2 ${styling}`}
    >
      {children}
    </label>
  );
};

export default Label;
