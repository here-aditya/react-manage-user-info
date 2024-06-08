import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const PersonalInfo = () => {
    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
    ];

    return (
        <div className="p-mb-4 p-shadow-1 p-p-3">
            <div className="p-grid p-fluid">
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" as={InputText} />
                    <ErrorMessage name="firstName" component="small" className="p-error" />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" as={InputText} />
                    <ErrorMessage name="lastName" component="small" className="p-error" />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="email">Email</label>
                    <Field name="email" as={InputText} />
                    <ErrorMessage name="email" component="small" className="p-error" />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field name="phoneNumber" as={InputText} />
                    <ErrorMessage name="phoneNumber" component="small" className="p-error" />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="dob">Date of Birth</label>
                    <Field name="dob">
                        {({ field, form }) => (
                            <Calendar
                                value={field.value}
                                onChange={(e) => form.setFieldValue('dob', e.value)}
                                dateFormat="yy-mm-dd"
                                showIcon
                            />
                        )}
                    </Field>
                    <ErrorMessage name="dob" component="small" className="p-error" />
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="gender">Gender</label>
                    <Field name="gender">
                        {({ field, form }) => (
                            <Dropdown
                                value={field.value}
                                options={genderOptions}
                                onChange={(e) => form.setFieldValue('gender', e.value)}
                                placeholder="Select a Gender"
                            />
                        )}
                    </Field>
                    <ErrorMessage name="gender" component="small" className="p-error" />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
