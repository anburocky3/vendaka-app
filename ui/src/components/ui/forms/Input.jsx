export default function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  ...rest
}) {
  return (
    <input
      type={type}
      id={id}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      {...rest}
    />
  );
}
