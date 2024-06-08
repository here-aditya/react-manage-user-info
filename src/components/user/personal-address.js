import React from 'react';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const PersonalAddress = ({ values }) => {
    return (
        <FieldArray name="addresses">
            {({ insert, remove, push}) => (
                <>
                    <Button
                        type="button"
                        icon="pi pi-plus"
                        label="Add Address"
                        onClick={() => push({ street: '', city: '', state: '', postalCode: '', country: '' })}
                        className="p-mb-3"
                        size="small"
                    />
                    {values && values.addresses?.length > 0 &&
                        values.addresses.map((address, index) => (
                            <div key={index} className="mb-3">
                                <div className="p-mb-4 p-shadow-1 p-p-3">
                                    <div className="p-grid p-fluid">
                                        {index > 0 && (
                                            <div className="p-field p-col-12 p-md-6" style={{ textAlign: 'right' }}>
                                                <Button
                                                    type="button"
                                                    icon="pi pi-trash"
                                                    className="p-button-danger"
                                                    size="small"
                                                    onClick={() => remove(index)}
                                                />
                                            </div>
                                        )}
                                        <div className="p-field p-col-12 p-md-6">
                                            <label htmlFor={`addresses.${index}.street`}>Street Address</label>
                                            <Field name={`addresses.${index}.street`} as={InputText} />
                                            <ErrorMessage name={`addresses.${index}.street`} component="small" className="p-error" />
                                        </div>
                                        <div className="p-field p-col-12 p-md-6">
                                            <label htmlFor={`addresses.${index}.city`}>City</label>
                                            <Field name={`addresses.${index}.city`} as={InputText} />
                                            <ErrorMessage name={`addresses.${index}.city`} component="small" className="p-error" />
                                        </div>
                                        <div className="p-field p-col-12 p-md-6">
                                            <label htmlFor={`addresses.${index}.state`}>State</label>
                                            <Field name={`addresses.${index}.state`} as={InputText} />
                                            <ErrorMessage name={`addresses.${index}.state`} component="small" className="p-error" />
                                        </div>
                                        <div className="p-field p-col-12 p-md-6">
                                            <label htmlFor={`addresses.${index}.postalCode`}>Postal Code</label>
                                            <Field name={`addresses.${index}.postalCode`} as={InputText} />
                                            <ErrorMessage name={`addresses.${index}.postalCode`} component="small" className="p-error" />
                                        </div>
                                        <div className="p-field p-col-12 p-md-6">
                                            <label htmlFor={`addresses.${index}.country`}>Country</label>
                                            <Field name={`addresses.${index}.country`} as={InputText} />
                                            <ErrorMessage name={`addresses.${index}.country`} component="small" className="p-error" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </FieldArray>
    );
};

export default PersonalAddress;