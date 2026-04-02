import * as yup from 'yup';
export const registerSchema = yup.object({
    name: yup
        .string()
        .required("El nombre es requerido"),
    email: yup
        .string()
        .required("El correo es requerido")
        .email("El correo debe ser válido"),
    password: yup
        .string()
        .required("La contraseña es requerida")
        .min(8,"La contraseña debe contener al menos 8 caracteres")
        .matches(/[A-Z]/,"La contraseña debe contener al menos una letra en mayúscula"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Confirmar contraseña")
});