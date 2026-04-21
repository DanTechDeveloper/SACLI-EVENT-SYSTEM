export default function BorderLayout({ children }) {
  return (
    <>
      <div className="flex flex-col gap-12 w-full py-2">{children}</div>
    </>
  );
}
