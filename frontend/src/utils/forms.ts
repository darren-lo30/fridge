import { useForm } from "react-hook-form"

interface GeneralFormError {
  formError: string,  
}

type useFormParameters<T> = Parameters<typeof useForm<T & GeneralFormError>>[0];
const fridgeUseForm = <T>(args?: useFormParameters<T>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useForm<T & GeneralFormError>(args);
}

export {
  fridgeUseForm as useForm,
}
