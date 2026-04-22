"use client";

import { forwardRef } from "react";

const TextArea = forwardRef(function TextArea(
  { id, placeholder, required = false, ...rest },
  ref,
) {
  return (
    <textarea
      id={id}
      ref={ref}
      required={required}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      {...rest}
    />
  );
});

export default TextArea;
