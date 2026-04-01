import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
                    </div>    
                    <div className="formGroup">
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
                    <button type="submit" className="button">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;
