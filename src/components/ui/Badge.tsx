import * as React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: "default" | "success" | "warning" | "danger";
};

export function Badge({ color = "default", className = "", ...rest }: BadgeProps) {
  const colorCls: Record<string, string> = {
    default: "bg-slate-800 text-slate-300",
    success: "bg-green-900/30 text-green-300",
    warning: "bg-yellow-900/30 text-yellow-300",
    danger: "bg-red-900/30 text-red-300",
  };
  return <span className={`px-3 py-1 rounded-full text-sm ${colorCls[color]} ${className}`} {...rest} />;
}

export default Badge;

