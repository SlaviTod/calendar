import * as Yup from 'yup';
import { password } from './../LoginForm/formValidationRequirements';

const validationRequirements = {
    password,
};

export const PassValidationSchema = (t: any) => Yup.object().shape({
    oldPass: Yup.string()
        .required(t('err_pass_required'))
        .min(validationRequirements.password.min, t('err_pass_min'))
        .max(validationRequirements.password.max, t('err_pass_max')),
    password: Yup.string()
        .required(t('err_pass_required'))
        .min(validationRequirements.password.min, t('err_pass_min'))
        .max(validationRequirements.password.max, t('err_pass_max'))
        .matches(validationRequirements.password.match, `${t('err_pass_match')} (${validationRequirements.password.matchMsg})`),
    confirmPassword: Yup.string()
        .required(t('err_cf_pass_required'))
        .oneOf([Yup.ref("password"), ''], t('err_cf_pass_not_match')),
});