export default function BorderContainer({title, children}){
    return <>
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-lg font-bold text-primary dark:text-white">
                {title}
              </h4>
            </div>
            {children}
          </section>{" "}
    </>
    
} 