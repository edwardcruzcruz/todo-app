import { useState } from "react";
import { loginSchema } from "../validations/login.validation";
import { ValidationError } from "yup";

export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordType, setPasswordType] = useState<"text" | "password">('password')
    const [validationErrors, setValidationErrors] = useState<{
        email?: string,
        password?: string
    }>({})
    const handlePasswordType = () => {
        if(passwordType === "text")
            setPasswordType("password")
        else
            setPasswordType("text")
    };
    const handleLogin = async () => {
        setValidationErrors({});
        try{
            await loginSchema.validate(
                { email,password },
                { abortEarly: false }
            );
        } catch (error) {
            if( error instanceof ValidationError ){
                const errors: { email?: string; password?: string } = {};
                error.inner.forEach((e) => {
                    if( e.path ){
                        errors[e.path as "email" | "password"] = e.message;
                    }
                });
                setValidationErrors(errors);
            }
            return;
        }
        console.log("login....")
    };
    return {
        email,
        password,
        passwordType,
        validationErrors,
        setEmail,
        setPassword,
        handlePasswordType,
        handleLogin
    }
}
