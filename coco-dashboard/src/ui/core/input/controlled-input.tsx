import * as React from "react";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useController } from "react-hook-form";

import type { NInputProps } from "./input";
import { Input } from "./input";
import { View, Text } from "../../core";

type TRule = Omit<
  RegisterOptions,
  "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { label, name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <View key={`input-${name}`} className="mb-1">
      {label && (
        <Text
          className={` text-[14px] ${
            fieldState.invalid
              ? "text-danger-500"
              : "text-neutral-500 font-bold"
          }  `}
        >
          {label}
        </Text>
      )}
      <Input
        className={`h-[42px] bg-white border-[1px] rounded-[8px] text-neutral-600 placeholder-neutral-600 mt-1 pl-6  ${
          fieldState.invalid ? "border-danger-500" : "border-neutral-100"
        } `}
        ref={field.ref}
        autoCapitalize="none"
        onChangeText={field.onChange}
        value={field.value as string}
        {...inputProps}
        error={fieldState.error?.message}
      />
    </View>
  );
}
