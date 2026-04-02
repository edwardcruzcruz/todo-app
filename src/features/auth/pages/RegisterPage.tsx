import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { registerSchema } from "../validations/register.validation";
import { ValidationError } from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
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
    return (
        <div className="container">
            <div className="card"> 
                <div className="backContainer">
                    <button onClick={handleBack} className="backButton">
                        <IoArrowBack />
                    </button>
                </div>               
                <h3>Registro</h3>
                <form className="form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        handleRegister();
                    }}
                >
                    <div className="formGroup">
                        <input 
                            className="email"
                            name="email"
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span
                            className="error"
                        >
                            { validationErrors.email || "" }
                        </span>
                    </div>    
                    <div className="formGroup">
                        <div className="formGroupPassword">
                            <input 
                                className="password"
                                name="password"
                                type={passwordType}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="passwordToogleIcon"
                                onClick={handlePasswordType}
                            >
                                {passwordType === "text" ? <FaEye /> : <FaEyeSlash />}   
                            </span>
                        </div>
                        <span
                            className="error"
                        >
                            { validationErrors.password || "" }
                        </span>
                    </div>    
                    <div className="formGroup">
                        <div className="formGroupPassword">
                            <input 
                                className="confirmPassword"
                                name="confirmPassword"
                                type={confirmPasswordType}
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span
                                className="passwordToogleIcon"
                                onClick={handleConfirmPasswordType}
                            >
                                {confirmPasswordType === "text" ? <FaEye /> : <FaEyeSlash />}   
                            </span>
                        </div>
                        <span
                            className="error"
                        >
                            { validationErrors.confirmPassword || "" }
                        </span>
                    </div>    
                    <button type="submit" className="button">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    )
}
export default RegisterPage;