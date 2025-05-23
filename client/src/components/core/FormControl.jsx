export default function FormControl({ title, className, ...props }) {
  return <label className={`block my-4 ${className}`}>
    <span className="block cursor-pointer font-bold">{title}</span>
    <input type={props.text || "text"}
      className="input bg-secondary w-full mt-2 px-4 py-2 focus:outline-none border-1 border-[#DEDEDE]"
      {...props}
    />
  </label>
}