import React from "react";

export function Button({ children, onClick, hoverBg, variant }) {
  const classes = buttonClasses({ hoverBg, variant });
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export function CardButton({ children, ...props }) {
  return (
    <Button hoverBg="nord-2" {...props}>
      {children}
    </Button>
  );
}

export function LinkButton({ children, hoverBg, variant, href, ...props }) {
  const classes = buttonClasses({ hoverBg, variant });
  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
}

function buttonClasses({ hoverBg, variant }) {
  const validVariants = ["primary", "secondary", "tertiary", undefined];
  if (!validVariants.includes(variant)) {
    throw new Error(
      `Invalid Button variant '${variant}'. Has to be one of ${validVariants} or undefined`
    );
  }

  let textColor = "text-nord-10"; // Tertiary
  if (variant === "secondary") {
    textColor = "text-nord-9";
  } else if (variant === "primary") {
    textColor = "text-nord-8";
  }

  const backgroundColor = hoverBg
    ? `hover:bg-${hoverBg}`
    : "hover:bg-opacity-10 bg-opacity-0 bg-white";
  const transitions = "transition transition-color duration-200";
  return `p-2 font-bold uppercase rounded
          ${textColor} ${backgroundColor} ${transitions}`;
}
