// =============================================================================
// BUTTON COMPONENT
// Krug-konform: Klare Beschriftung, eindeutige Aktion
// =============================================================================

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "secondary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  type = "button",
}) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    border: "none",
    borderRadius: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s ease",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.5 : 1,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    small: { padding: "8px 12px", fontSize: 13 },
    medium: { padding: "10px 16px", fontSize: 14 },
    large: { padding: "14px 24px", fontSize: 15 },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "#4f46e5",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
    },
    danger: {
      backgroundColor: "#fef2f2",
      color: "#dc2626",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#6b7280",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      {children}
    </button>
  );
};
