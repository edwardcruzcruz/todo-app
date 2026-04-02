import { IoArrowBack } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
    const {
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
    } = useRegister();
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