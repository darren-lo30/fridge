import { useForm } from "react-hook-form"

interface GeneralFormError {
  formError: string,  
}
// type useFormParameters = Parameters<typeof useForm>;

const fridgeUseForm = <T>() => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useForm<T & GeneralFormError>();
}

export {
  fridgeUseForm as useForm,
}
