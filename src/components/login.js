import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import './login-form.css';
import { loginAction } from '../redux-toolkit/auth-slice';
import { useEffect } from 'react';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, redirectUrl, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate(redirectUrl);
        }
    }, [user, redirectUrl, navigate])

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const resultAction = dispatch(loginAction(values));
        setSubmitting(false);
        if (loginAction.fulfilled.match(resultAction)) {
            navigate(redirectUrl);
        }
    };

    return (
        <div className="login-form border-solid border-primary-100 p-3 mt-6">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className="p-field">
                            <label htmlFor="username">Username</label>
                            <Field
                                id="username"
                                name="username"
                                as={InputText}
                                className="p-inputtext p-component"
                            />
                            <ErrorMessage name="username" component="small" className="p-error" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Password</label>
                            <Field
                                id="password"
                                name="password"
                                as={Password}
                                className="p-inputtext p-component"
                            />
                            <ErrorMessage name="password" component="small" className="p-error" />
                        </div>
                        <div className="p-field p-d-flex p-jc-end">
                            <Button type="submit" label="Login" className="p-mt-2" disabled={isSubmitting} />
                        </div>

                        {loading && <Message severity="info" text="Logging in..." />}
                        {error && <Message severity="error" text={error} />}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
