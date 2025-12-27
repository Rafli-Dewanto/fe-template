import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

import { showErrorToast } from "@/utils/error-handling";
import { sanitizeObject } from "@/utils/sanitization";

interface UseFormConfig<T extends z.ZodType> extends Omit<UseFormProps<z.infer<T>>, "resolver"> {
  schema: T;
  sanitizeInputs?: boolean;
}

export const useForm = <T extends z.ZodType>({
  schema,
  sanitizeInputs = true,
  ...formConfig
}: UseFormConfig<T>) => {
  const form = useReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    ...formConfig,
  });

  const handleSubmit = form.handleSubmit(data => {
    try {
      const validatedData = schema.parse(data);
      const processedData = sanitizeInputs ? sanitizeObject(validatedData) : validatedData;
      return Promise.resolve(processedData);
    } catch (error) {
      showErrorToast(error);
      return Promise.reject(error);
    }
  });

  return {
    ...form,
    handleSubmit,
  };
};

// Example usage:
/*
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  schema,
  defaultValues: {
    email: '',
    password: '',
  },
});

const onSubmit = handleSubmit(async (data) => {
  // data is type-safe and sanitized
  await api.login(data);
});
*/
