export const InputError = ({
  id,
  errors,
}: {
  id: string;
  errors: string[];
}) => {
  return (
    <div
      id={id}
      aria-atomic="true"
      aria-live="polite"
      className="  text-sm text-red-500"
    >
      {errors.map((err) => (
        <p className="flex gap-2 items-center max-w-xl text-pretty" key={err}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-x"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
          {err}
        </p>
      ))}
    </div>
  );
};
