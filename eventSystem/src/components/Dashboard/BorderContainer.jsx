export default function BorderContainer({ title, children }) {
  return (
    <>
      <section className="bg-white dark:bg-surface-dark rounded-2xl border border-violet-100 dark:border-violet-900/40 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-violet-100 dark:border-violet-900/40 bg-violet-50/50 dark:bg-violet-900/10 flex items-center justify-between">
          <h4 className="text-sm font-black text-primary dark:text-primary-light uppercase tracking-widest">
            {title}
          </h4>
        </div>
        {children}
      </section>{" "}
    </>
  );
}