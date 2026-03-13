import * as Yup from 'yup';

const validationRequirements = {
    mapLink: {
        match: /^[https://maps.google.com]{1}|[https://maps.app.goo.gl]{1}/,
        matchMsg: 'https://maps.google.com/https://maps.app.goo.gl',
    },
    title: {
        min: 2,
        max: 255,
        match: /^[A-Za-zА-Яа-я .,\/:"@\(\)\d\?\|!'\*-]+$/,
        matchMsg: `.,/|:?!()"-*'`,
    },
    address: {
        max: 255,
        match: /^[A-Za-zА-Яа-я .,\/:"@\(\)\d\?\|!'\*-]+$/,
        matchMsg: `.,/|:?!()"-*'`,
    },
    city: {
        max: 50,
        match: /^[A-Za-zА-Яа-я .-]+$/,
        matchMsg: '-.',
    },
    country: {
        max: 30,
        match: /^[A-Za-zА-Яа-я .-]+$/,
        matchMsg: '-.',
    },
    description: {
        max: 32700,
    },
    durationInMinutes: {
        min: 0,
        max: (10 * 60),
    }
};


export const EventValidationSchema = (t: any) => Yup.object().shape({
    eventType: Yup.string().required(t('err_eventType_r')),
    mapLink: Yup.string().matches(validationRequirements.mapLink.match, `${t('err_map_link_match')} ${validationRequirements.mapLink.matchMsg}`)
        .nullable(),
    start: Yup.date().required(t('err_date_r')),
    end: Yup.date().required(t('err_date_r')),
    durationInMinutes: Yup.number()
        .min(validationRequirements.durationInMinutes.min, t('err_duration_min'))
        .max(validationRequirements.durationInMinutes.max, `${t('err_duration_max_1')} ${validationRequirements.durationInMinutes.max} min ${t('err_duration_max_2')}`),
    title: Yup.string()
        // .required(t('err_name_r_required'))
        .min(validationRequirements.title.min, `${t('err_name_r_min')} ${validationRequirements.title.min} ${t('err_name_r_1')}`)
        .max(validationRequirements.title.max, `${t('err_name_r_max')} ${validationRequirements.title.max} ${t('err_name_r_1')}`)
        .matches(validationRequirements.title.match, `${t('err_name_r_match')} ${validationRequirements.title.matchMsg}`)
        .nullable(),
    description: Yup.string()
        // .required(t('err_description_r_required'))
        .max(validationRequirements.description.max, `${t('err_description_r_max')} ${validationRequirements.description.max} ${t('err_name_r_1')}`)
        .nullable(),
    address: Yup.string()
        .max(validationRequirements.address.max, `${t('err_address_r_max')} ${validationRequirements.address.max} ${t('err_name_r_1')}`)
        .matches(validationRequirements.address.match, `${t('err_address_r_match')} ${validationRequirements.address.matchMsg}`)
        .nullable(),
    city: Yup.string()
        .max(validationRequirements.city.max, `${t('err_city_r_max')} ${validationRequirements.city.max} ${t('err_name_r_1')}`)
        .matches(validationRequirements.city.match, `${t('err_city_r_match')} ${validationRequirements.city.matchMsg}`)
        .nullable(),
    country: Yup.string()
        .max(validationRequirements.country.max, `${t('err_country_r_max')} ${validationRequirements.country.max} ${t('err_name_r_1')}`)
        .matches(validationRequirements.country.match, `${t('err_country_r_match')} ${validationRequirements.country.matchMsg}`)
        .nullable(),
});

