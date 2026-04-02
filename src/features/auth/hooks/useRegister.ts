import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../validations/register.validation";
import { ValidationError } from "yup";

export const useRegister = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordType, setPasswordType] = useState<"text" | "password">('password')
    const [confirmPasswordType, setConfirmPasswordType] = useState<"text" | "password">('password')
    const [validationErrors, setValidationErrors] = useState<{
        email?: string,
        password?: string,
        confirmPassword?: string
    }>({})
    const handlePasswordType = () => {
        if(passwordType === "text")
            setPasswordType("password")
        else
            setPasswordType("text")
    };
    const handleConfirmPasswordType = () => {
        if(confirmPasswordType === "text")
            setConfirmPasswordType("password")
        else
            setConfirmPasswordType("text")
    };
    const handleRegister = async () => {
        setValidationErrors({});
        try{
            await registerSchema.validate(
                { email, password, confirmPassword },
                { abortEarly: false }
            );
        } catch (error) {
            if( error instanceof ValidationError ){
                const errors: { email?: string; password?: string; confirmPassword?: string } = {};
                error.inner.forEach((e) => {
                    if( e.path ){
                        errors[ e.path as "email" | "password" | "confirmPassword" ] = e.message;
                    }
                });
                setValidationErrors(errors);
            }
            return;
        }
        console.log("register....")
    };
    const handleBack = () => {
        navigate("/login", { replace: true });
    };
    return {
        email,
        password,
        confirmPassword,
        passwordType,
        confirmPasswordType,
        validationErrors,
        setEmail,
        setPassword,
        setConfirmPassword,
        handlePasswordType,
        handleConfirmPasswordType,
        handleRegister,
        handleBack
    }
}
