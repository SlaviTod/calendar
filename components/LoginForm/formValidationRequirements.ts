export const firstName = {
    min: 2,
    max: 20,
    match: /^[A-Za-z -]+|[А-Яа-я -]+$/,
};

export const lastName = {
    min: 2,
    max: 20,
    match: /^[A-Za-z -]+|[А-Яа-я -]+$/,
};

export const password = {
    min: 8,
    max: 40,
    match: /^(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-zА-Яа-я0-9!@#$%^&*]+$/,
    matchMsg: '!@#$%^&*',
};
