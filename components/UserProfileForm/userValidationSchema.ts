import * as Yup from 'yup';
import { firstName, lastName } from './../LoginForm/formValidationRequirements';

const validationRequirements = {
    firstName,
    lastName,
};

export const UserValidationSchema = (t: any) => Yup.object().shape({
    firstName: Yup.string()
        .required(t('err_firstName_required'))
        .min(validationRequirements.firstName.min, t('err_firstName_min'))
        .max(validationRequirements.firstName.max, t('err_firstName_max'))
        .matches(validationRequirements.firstName.match, t('err_firstName_match')),
    lastName: Yup.string()
        .required(t('err_lastName_required'))
        .min(validationRequirements.lastName.min, t('err_lastName_min'))
        .max(validationRequirements.lastName.max, t('err_lastName_max'))
        .matches(validationRequirements.firstName.match, t('err_lastName_match')),
    voice: Yup.string()
});