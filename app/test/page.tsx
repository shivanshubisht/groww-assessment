export default function TestPage() {
  return (
    <>
      {/* --background-groww': 'hsl(20, 14.3%, 4.1%)',
    '--foreground-groww': 'hsl(0, 0%, 95%)',
    '--primary-groww': 'hsl(346.8, 77.2%, 49.8%)',
    '--primary-foreground-groww */}
      <div className="w-100 h-100 bg-[var(--background-groww)]">test</div>
      <div className="w-100 h-100 bg-[var(--foreground-groww)]">test</div>
      <div className="w-100 h-100 bg-[var(--primary-groww)]">test</div>
      <div className="w-100 h-100 bg-[var(--primary-foreground-groww)]">
        test
      </div>
    </>
  );
}
