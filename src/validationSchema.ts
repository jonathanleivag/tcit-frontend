import * as Yup from 'yup'

export const validationSchemaFormCreate = Yup.object({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: Yup.string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
})
