import { CustomInput } from "../../../shared/components/CustomInput";
import Spinner from "../../../shared/components/Spinner";

interface inputField {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    handleChange: (e: any) => void;
    validationError?: string;
    isRequired: boolean;

    //password-specific
    isPasswordType?: boolean;
    classNamePasswordToogleIcon?: string;
    passwordType?: "text" | "password";
    handlePasswordType?: () => void;
}
interface Props {
    classNameForm: string;
    classNameFormGroup: string;
    classNamePasswordInputContainer: string;
    handleOnSubmit: () => void;
    classNameInput: string;
    classNameError: string;
    classNameButton: string;
    loading: boolean;
    buttonName: string;
    //fields
    fields: inputField[]

}
const AuthForm = ({classNameForm, classNameFormGroup, classNamePasswordInputContainer, handleOnSubmit, classNameInput, classNameError, fields, classNameButton,loading, buttonName}:Props) => {
  return (
    <form className={classNameForm}
        onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
        }}
        >
        {fields.map(field =>
            !field.isPasswordType && (
                <CustomInput 
                    key={field.name}
                    classNameFormGroup={classNameFormGroup}
                    classNameInput={classNameInput}
                    classNameError={classNameError}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    HandleChange={field.handleChange}
                    isRequired={field.isRequired}
                    validationError={field.validationError}
                />
            ) || 
            field.isPasswordType && (
            <div key={field.name} className={classNameFormGroup}>
                <CustomInput 
                    classNameFormGroup={classNamePasswordInputContainer}
                    classNameInput={classNameInput}
                    classNameError={classNameError}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    HandleChange={field.handleChange}
                    isRequired={field.isRequired}
                    validationError={field.validationError}
                    isPasswordType={field.isPasswordType}
                    passwordType={field.passwordType}
                    classNamePasswordToogleIcon={field.classNamePasswordToogleIcon}
                    HandlePasswordType={field.handlePasswordType}
                />
            </div>)
        )}
        <button type="submit" className={classNameButton} disabled={loading}>
            { loading ? <Spinner />: buttonName }
        </button>
    </form>
  )
}
export default AuthForm;