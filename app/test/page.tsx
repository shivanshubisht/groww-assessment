export default function TestPage() {
  return (
    <>
      {/* --background-groww': 'hsl(20, 14.3%, 4.1%)',
    '--foreground-groww': 'hsl(0, 0%, 95%)',
    '--primary-groww': 'hsl(346.8, 77.2%, 49.8%)',
    '--primary-foreground-groww */}
      bg-[var(--background-groww)]
      <div className="w-100 h-100 bg-[var(--background-groww)]">
        bg-[var(--background-groww)]
      </div>
      bg-[var(--foreground-groww)]
      <div className="w-100 h-100 bg-[var(--foreground-groww)]">
        bg-[var(--foreground-groww)]
      </div>
      bg-[var(--primary-groww)]
      <div className="w-100 h-100 bg-[var(--primary-groww)]">
        bg-[var(--primary-groww)]
      </div>
      bg-[var(--primary-foreground-groww)]
      <div className="w-100 h-100 bg-[var(--primary-foreground-groww)]">
        bg-[var(--primary-foreground-groww)]
      </div>
    </>
  );
}
