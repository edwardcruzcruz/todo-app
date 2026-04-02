import { IoArrowBack } from "react-icons/io5";
import { useRegister } from "../hooks/useRegister";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
    const {
        name,
        email,
        password,
        confirmPassword,
        passwordType,
        confirmPasswordType,
        validationErrors,
        setName,
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
                <AuthForm 
                    classNameForm="form"
                    classNameFormGroup="formGroup"
                    classNamePasswordInputContainer="formGroupPassword"
                    classNameInput="input"
                    classNameError="error"
                    classNameButton="button"
                    buttonName="Registrar"
                    handleOnSubmit={handleRegister}
                    //fields
                    fields={[
                        {
                            name: 'name',
                            type: 'text',
                            placeholder: 'Nombre',
                            value:name,
                            handleChange:(e) => setName(e.target.value),
                            validationError:validationErrors.name,
                            isRequired:true,
                        },
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
                        },
                        {
                            name: 'confirmPassword',
                            type: confirmPasswordType,
                            placeholder: 'Confirmar Contraseña',
                            value:confirmPassword,
                            handleChange:(e) => setConfirmPassword(e.target.value),
                            validationError:validationErrors.confirmPassword,
                            isRequired:true,
                            isPasswordType:true,
                            classNamePasswordToogleIcon:"passwordToogleIcon",
                            passwordType:confirmPasswordType,
                            handlePasswordType:handleConfirmPasswordType
                        }
                    ]}
                />
            </div>
        </div>
    )
}
export default RegisterPage;