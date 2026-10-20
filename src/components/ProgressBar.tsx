export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  return (
    <div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--sandstone)_22%,transparent)]"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Reading progress"}
      >
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--sandstone),var(--terracotta))] transition-[width] duration-700 ease-out"
          style={{ width: `${Math.max(percent, 1.5)}%` }}
        />
      </div>
    </div>
  );
}