import React from "react";

export function Button({ children, hoverBg, onClick, size, variant }) {
  const classes = buttonClasses({ hoverBg, size, variant });
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

export function LinkButton({
  children,
  hoverBg,
  href,
  size,
  variant,
  ...props
}) {
  const classes = buttonClasses({ hoverBg, variant });
  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
}

function buttonClasses({ hoverBg, size, variant }) {
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

  let padding = "p-2";
  if (size === "small") {
    padding = "p-1";
  } else if (size === "minimal") {
    padding = "p-0";
  }

  const backgroundColor = hoverBg
    ? `hover:bg-${hoverBg}`
    : "hover:bg-opacity-10 bg-opacity-0 bg-white";
  const transitions = "transition transition-color duration-200";
  return `font-bold uppercase rounded cursor-pointer
          ${textColor} ${padding} ${backgroundColor} ${transitions}`;
}
