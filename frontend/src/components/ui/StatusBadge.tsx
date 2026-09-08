interface StatusBadgeProps {
  children: string;
  variant?: "safe" | "warning" | "danger";
}

export function StatusBadge({
  children,
  variant = "safe",
}: StatusBadgeProps) {
  const styles = {
    safe: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    warning: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    danger: "bg-red-400/10 text-red-300 border-red-400/20",
  };

  const dotStyles = {
    safe: "bg-emerald-300",
    warning: "bg-amber-300",
    danger: "bg-red-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${styles[variant]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotStyles[variant]}`}
      />

      {children}
    </span>
  );
}