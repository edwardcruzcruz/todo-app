import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import AuthForm from "../components/AuthForm";

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
                <AuthForm 
                    classNameForm="form"
                    classNameFormGroup="formGroup"
                    classNamePasswordInputContainer="formGroupPassword"
                    classNameInput="input"
                    classNameError="error"
                    classNameButton="button"
                    buttonName="Ingresar"
                    handleOnSubmit={handleLogin}
                    //fields
                    fields={[
                        {
                            name: 'email',
                            type: 'email',
                            placeholder: 'Correo',
                            value:email,
                            handleChange:(e) => setEmail(e.target.value),
                            validationError:validationErrors.email,
                            isRequired:true,
                        },
                        {
                            name: 'password',
                            type: passwordType,
                            placeholder: 'Contraseña',
                            value:password,
                            handleChange:(e) => setPassword(e.target.value),
                            validationError:validationErrors.password,
                            isRequired:true,
                            isPasswordType:true,
                            classNamePasswordToogleIcon:"passwordToogleIcon",
                            passwordType:passwordType,
                            handlePasswordType:handlePasswordType
                        }
                    ]}
                />
            </div>
        </div>
    )
}
export default LoginPage;
