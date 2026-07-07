import { cn } from "@/lib/utils";

type StripeSeparatorProps = {
  className?: string;
};

export function StripeSeparator({ className }: StripeSeparatorProps) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x border-line",
        className,
      )}
    />
  );
}