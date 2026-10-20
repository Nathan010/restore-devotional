export type CategoryKey =
  | "historical"
  | "promise"
  | "ezraneh"
  | "prophet"
  | "prayer"
  | "nt";

export const categories: Record<
  CategoryKey,
  { label: string; className: string; dot: string }
> = {
  historical: {
    label: "Historical Context",
    className:
      "border-[color-mix(in_oklab,var(--stone-deep)_28%,transparent)] bg-[color-mix(in_oklab,var(--stone-deep)_8%,transparent)] text-stone-deep",
    dot: "bg-stone-deep",
  },
  promise: {
    label: "Promise of Restoration",
    className:
      "border-[color-mix(in_oklab,var(--olive)_32%,transparent)] bg-[color-mix(in_oklab,var(--olive)_10%,transparent)] text-olive",
    dot: "bg-olive",
  },
  ezraneh: {
    label: "Ezra–Nehemiah",
    className:
      "border-[color-mix(in_oklab,var(--terracotta)_32%,transparent)] bg-[color-mix(in_oklab,var(--terracotta)_10%,transparent)] text-terracotta",
    dot: "bg-terracotta",
  },
  prophet: {
    label: "Prophet of the Restoration",
    className:
      "border-[color-mix(in_oklab,var(--sandstone)_45%,transparent)] bg-[color-mix(in_oklab,var(--sandstone)_14%,transparent)] text-[color-mix(in_oklab,var(--sandstone)_80%,var(--stone-deep))]",
    dot: "bg-sandstone",
  },
  prayer: {
    label: "Prayer & Wisdom",
    className:
      "border-[color-mix(in_oklab,var(--lapis)_30%,transparent)] bg-[color-mix(in_oklab,var(--lapis)_9%,transparent)] text-lapis",
    dot: "bg-lapis",
  },
  nt: {
    label: "New Testament Fulfilment",
    className:
      "border-[color-mix(in_oklab,var(--plum)_30%,transparent)] bg-[color-mix(in_oklab,var(--plum)_9%,transparent)] text-plum",
    dot: "bg-plum",
  },
};