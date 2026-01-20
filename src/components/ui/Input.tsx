// =============================================================================
// INPUT COMPONENT
// Krug-konform: Klare Labels, hilfreiche Platzhalter
// =============================================================================

import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  type?: "text" | "email" | "tel" | "url";
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  helpText,
  type = "text",
  disabled = false,
}) => {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <div
        style={{
          marginBottom: 6,
          fontWeight: 500,
          fontSize: 14,
          color: "#374151",
        }}
      >
        {label}
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          fontSize: 14,
          fontFamily: "'Inter', sans-serif",
          color: "#111827",
          backgroundColor: disabled ? "#f9fafb" : "#ffffff",
          transition: "border-color 0.15s ease",
          outline: "none",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#4f46e5";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d1d5db";
        }}
      />
      {helpText && (
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          {helpText}
        </div>
      )}
    </label>
  );
};

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  rows?: number;
  disabled?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  helpText,
  rows = 4,
  disabled = false,
}) => {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <div
        style={{
          marginBottom: 6,
          fontWeight: 500,
          fontSize: 14,
          color: "#374151",
        }}
      >
        {label}
      </div>
      <textarea
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          fontSize: 14,
          fontFamily: "'Inter', sans-serif",
          color: "#111827",
          backgroundColor: disabled ? "#f9fafb" : "#ffffff",
          transition: "border-color 0.15s ease",
          outline: "none",
          resize: "vertical",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#4f46e5";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d1d5db";
        }}
      />
      {helpText && (
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          {helpText}
        </div>
      )}
    </label>
  );
};
