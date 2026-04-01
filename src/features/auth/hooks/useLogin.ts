import { useState } from "react";

export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordType, setPasswordType] = useState<"text" | "password">('password')
    const handlePasswordType = () => {
        if(passwordType === "text")
            setPasswordType("password")
        else
            setPasswordType("text")
    };
    const handleLogin = () => {
        console.log("login....")
    };
    return {
        email,
        password,
        passwordType,
        setEmail,
        setPassword,
        handlePasswordType,
        handleLogin
    }
}
