export default function SelectControl({
  field,
  className,
  options,
  ...props
}) {
  return <label className={className}>
    <span className="label font-[600]">{field.label}</span>
    <select
      {...props}
      className="select w-full input block mt-1 px-4 py-2 rounded-[8px] focus:outline-none border-1 border-[#D6D6D6] placeholder:text-[#1C1B1F]/25"
    >
      {field.options.map(option => <option
        key={option.id}
        value={option.value}
      >
        {option.name}
      </option>)}
    </select>
  </label>
}