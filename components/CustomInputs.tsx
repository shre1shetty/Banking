import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { AuthFormSchema } from "@/lib/utils";
import { z } from "zod";

const formSchema = AuthFormSchema("sign-up");
interface CustomInputs {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  type: string;
}

const CustomInputs = ({
  control,
  name,
  label,
  placeholder,
  type,
}: CustomInputs) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex flex-col w-full"></div>
          <FormControl>
            <Input
              className="input-class"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>

          <FormMessage className="form-message mt-2" />
        </div>
      )}
    />
  );
};

export default CustomInputs;
