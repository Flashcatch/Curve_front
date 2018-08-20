const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required'
    }
    if (!values.lastName) {
        errors.lastName = 'Required'
    }
    if (!values.birthdate) {
        errors.birthdate = 'Required'
    }
    if (!values.name) {
        errors.name = 'Обязательно для заполенния'
    } else if (values.name.length < 3) {
        errors.name = 'Должно быть не меньше 3'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    // console.log('Valid: ', values, errors);
    return errors
};

export default validate;