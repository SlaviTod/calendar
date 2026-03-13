import * as Yup from 'yup';
import { password } from './formValidationRequirements';

const validationRequirements = {
    password,
};

export const LoginValidationSchema = (t: any) => Yup.object().shape({
    email: Yup.string()
        .email(t('err_email'))
        .required(t('err_email_required')),
    password: Yup.string()
        .min(validationRequirements.password.min, t('err_pass_min'))
        .max(validationRequirements.password.max, t('err_pass_max'))
        .required(t('err_pass_required'))
});