import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone Number is not valid').required('Phone Number is required'),
    dob: Yup.date().required('Date of Birth is required').test(
        'age',
        'You must be at least 18 years old',
        (value) => {
            return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
        }
    ),
    gender: Yup.string().required('Gender is required'),
    addresses: Yup.array().of(
        Yup.object().shape({
            street: Yup.string().required('Street Address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            postalCode: Yup.string().matches(/^[0-9]{6}$/, 'Postal Code is not valid').required('Postal Code is required'),
            country: Yup.string().required('Country is required'),
        })
    ),
});