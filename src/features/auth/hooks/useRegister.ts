import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../validations/register.validation";
import { ValidationError } from "yup";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { registerThunk } from "../states/register.slice";

export const useRegister = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { success, loading, error } = useAppSelector(
        (state) => state.register
    )
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordType, setPasswordType] = useState<"text" | "password">('password')
    const [confirmPasswordType, setConfirmPasswordType] = useState<"text" | "password">('password')
    const [validationErrors, setValidationErrors] = useState<{
        name?: string,
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
                { name, email, password, confirmPassword },
                { abortEarly: false }
            );
        } catch (error) {
            if( error instanceof ValidationError ){
                const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
                error.inner.forEach((e) => {
                    if( e.path ){
                        errors[ e.path as "name" | "email" | "password" | "confirmPassword" ] = e.message;
                    }
                });
                setValidationErrors(errors);
            }
            return;
        }
        dispatch(registerThunk({email,password,name}));
    };
    useEffect(() => {
        if( success ){
            handleBack()
        }
    }, [success])
    const handleBack = () => {
        navigate("/login", { replace: true });
    };
    return {
        name,
        email,
        password,
        confirmPassword,
        passwordType,
        confirmPasswordType,
        loading,
        error,
        validationErrors,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        handlePasswordType,
        handleConfirmPasswordType,
        handleRegister,
        handleBack
    }
}
