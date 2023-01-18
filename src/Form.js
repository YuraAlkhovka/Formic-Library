import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

import * as yup from 'yup';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return(
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}
const CustomForm = () => {
    return (
       <Formik 
            initialValues= {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {yup.object({
                name: yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
                email: yup.string()
                    .email('Неправильный email адрес')
                    .required('Обязательное поле!'),
                amount: yup.number()
                    .min(5, 'Минимум 5')
                    .required('Обязательное поле!'),
                currency: yup.string()
                    .required('Выберите валюту пожалуйста'),
                text: yup.string()
                    .min(5, 'Минимум 5 символов'),
                terms: yup.boolean()
                    .required('Необходимо согласие')
                    .oneOf([true], 'Необходимо согласие')
            })}
            onSubmit =  {values => console.log(JSON.stringify(values, null, 2))}>

            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <MyTextInput
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"
                />
                <MyTextInput
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"
                />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage name="currency" className="error" component="div"/>  
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage name="text" className="error" component="div"/>  
                <label className="checkbox">
                    <Field
                    name="terms" 
                    type="checkbox" 
                    />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage name="terms" className="error" component="div"/>  
                <button type="submit">Отправить</button>
            </Form>
       </Formik>
    )
}

export default CustomForm;