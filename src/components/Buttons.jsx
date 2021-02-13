import React from "react";
import { Link as RouterLink } from "@reach/router";

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
    <Button hoverBg="theme-background-2" {...props}>
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

export function RouterLinkButton({
  children,
  hoverBg,
  to,
  size,
  variant,
  ...props
}) {
  const classes = buttonClasses({ hoverBg, size, variant });
  return (
    <RouterLink className={classes} to={to} {...props}>
      {children}
    </RouterLink>
  );
}

export function ExternalLinkButton({
  children,
  hoverBg,
  href,
  size,
  variant,
  ...props
}) {
  const classes = buttonClasses({ hoverBg, size, variant });
  return (
    <a
      className={`flex flex-row items-center ${classes}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <ExternalLinkSvg />
    </a>
  );
}

function ExternalLinkSvg() {
  return (
    <svg
      className="inline w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
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

  const backgroundColor = hoverBg ? `hover:bg-${hoverBg}` : "";
  const transitions = "transition-colors duration-200";
  return `font-bold uppercase rounded cursor-pointer
          ${textColor} ${padding} ${backgroundColor} ${transitions}`;
}
