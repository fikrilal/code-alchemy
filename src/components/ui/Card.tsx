import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
};

export function Card({ as: As = "div", className = "", ...rest }: CardProps) {
  const Component = As as React.ElementType;
  return <Component className={`rounded-2xl border border-slate-900 bg-slate-1100 ${className}`} {...rest} />;
}

export default Card;
