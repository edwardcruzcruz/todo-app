import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
    const {email, password, passwordType, validationErrors, setEmail, setPassword, handleLogin, handlePasswordType} = useLogin();
    return (
        <div className="container">
            <div className="card">
                <h3>Inicio de Sesión</h3>
                <p>
                    No tienes cuante todavía?{" "}
                    <Link to="/register">Regístrate aquí</Link>
                </p>
                <form className="form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        handleLogin();
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
                    <button type="submit" className="button">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;
