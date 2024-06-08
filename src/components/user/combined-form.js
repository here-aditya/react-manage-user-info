import React from 'react';
import { Formik, Form } from 'formik';
import PersonalInfo from './personal-info';
import PersonalAddress from './personal-address';
import { Button } from 'primereact/button';
import './my-form.css'; // For custom styling
import { useDispatch } from 'react-redux';
import { setFormData } from '../../redux-toolkit/personal-data-slice';
import { validationSchema } from '../utils/user-data-validation-schema';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: null,
    gender: '',
    addresses: [{ street: '', city: '', state: '', postalCode: '', country: '' }],
};

const CombinedForm = () => {
    const dispatch = useDispatch();
    
    const handleSubmit = (values, { resetForm }) => {
        console.log('Form data:', values);
        const serializedValues = {
            ...values,
            dob: new Date(values.dob).toISOString(), // Serialize date
        };
        dispatch(setFormData(serializedValues));
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values }) => (
                <Form className="my-form">
                    <div className="my-form-row">
                        <div className="my-form-column">
                            <h2>Personal Information</h2>
                            <PersonalInfo />
                        </div>
                        <div className="my-form-column">
                            <h2>Addresses</h2>
                            <PersonalAddress values={values} />
                        </div>
                    </div>
                    <div className="my-form-row">
                        <Button type="submit" label="Submit" className="m-2" />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CombinedForm;
