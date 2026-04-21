export default function BorderLayout({ children }) {
  return (
    <>
      <div className="flex flex-col gap-12 w-full py-4">{children}</div>
    </>
  );
}
