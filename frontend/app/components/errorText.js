export default function ErrorText({ error }) {
  return (
    <>{error && <label className="text-red-500 text-sm">{error}</label>}</>
  );
}
