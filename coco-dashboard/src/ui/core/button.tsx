import React from "react";
import type { TouchableOpacityProps } from "react-native";

import { ActivityIndicator } from "./activity-indicator";
import { Text } from "./text";
import { TouchableOpacity } from "./touchable-opacity";

type Variant = {
  container: string;
  label: string;
  indicator: string;
};
type VariantName = "defaults" | "primary" | "outline" | "secondary" | "danger";
type BVariant = {
  [key in VariantName]: Variant;
};

export const buttonVariants: BVariant = {
  defaults: {
    container:
      "flex-row items-center justify-center a rounded-[6px] px-12 py-3 my-1",
    label: "text-[16px] font-medium text-white",
    indicator: "text-white h-[30px]",
  },
  primary: {
    container: "bg-green-500",
    label: "",
    indicator: "text-white",
  },
  secondary: {
    container: "bg-green-500",
    label: "",
    indicator: "text-white",
  },
  danger: {
    container: "bg-danger-600",
    label: "text-secondary-600",
    indicator: "text-white",
  },
  outline: {
    container: "border border-green-500",
    label: "text-[#D64131] font-bold dark:text-charcoal-100",
    indicator: "text-black",
  },
};

interface Props extends TouchableOpacityProps {
  variant?: VariantName;
  label?: string;
  loading?: boolean;
}

export const Button = ({
  label,
  loading = false,
  variant = "primary",
  disabled = false,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      className={`
    ${buttonVariants.defaults.container}
     ${buttonVariants[variant].container}
     ${disabled ? "opacity-50" : ""}
    `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          className={`
          ${buttonVariants.defaults.indicator}
           ${buttonVariants[variant].indicator}
          `}
        />
      ) : (
        <Text
          className={`
          ${buttonVariants.defaults.label}
           ${buttonVariants[variant].label}
          `}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
