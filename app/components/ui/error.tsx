export const Error = ({ id, errors }: { id: string; errors: string[] }) => {
  return (
    <div id={id} aria-atomic="true" aria-live="polite">
      {errors.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </div>
  );
};
