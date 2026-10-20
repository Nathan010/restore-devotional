import { categories, type CategoryKey } from "@/data/categories";

export function CategoryBadge({
  category,
  size = "sm",
}: {
  category: CategoryKey;
  size?: "sm" | "md";
}) {
  const c = categories[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${c.className} ${
        size === "md" ? "px-3 py-1 text-[0.7rem]" : "px-2.5 py-0.5 text-[0.62rem]"
      } font-semibold uppercase tracking-[0.12em] whitespace-nowrap`}
    >
      <span className={`size-1.5 rounded-full ${c.dot}`} aria-hidden />
      {c.label}
    </span>
  );
}