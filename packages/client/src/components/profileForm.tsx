// import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
}
const ProfileForm = (props: Props) => {
  const styleClasses = {
    input: `text-gray-200 bg-slate-800 border-2 border-slate-500`,
  };

  const areInputsInvalid = (errors: Record<string, any>) => {
    return Object.values(errors).some((errValue) => Boolean(errValue));
  };

  const fields = {
    'profile Name': 'default',
    'DB vendor': 'mysql',
    'DB host': 'localhost',
    'DB port': '3306',
    'DB name': 'mydb',
  };
  const validationSchema = yup.object().shape({
    'profile Name': yup.string().required('Name is required'),
    'DB vendor': yup.string().required('Name is required'),
    'DB host': yup.string().required('DB host is required!'),
    'DB port': yup.string().required('DB port is required!'),
    'DB name': yup.string().required('DB name is required!'),
  });

  // If I forget to update the schema, this will prevent me from wasting time looking in the wrong piece code.
  validationSchema
    .validate(fields)
    .then(() => {
      // console.log({ valid });
    })
    .catch((err) => {
      console.log({ err });
    });

  const handleClose = () => {
    props.onCancel();
  };

  const handleSubmit = async (values: Record<string, any>) => {
    console.log({ values });
    props.onSubmit();
    // await handleCreate(values);

    // todo: redirect to profile tables.
  };

  const listInputs = (
    touched: Record<string, any>,
    errors: Record<string, any>,
  ) => {
    return Object.keys(fields).map((fieldName, index) => {
      return (
        <label
          key={fieldName}
          className={
            '' +
            'z-30 relative' +
            (touched[fieldName] && errors[fieldName] ? ' invalid' : ' valid')
          }
        >
          {fieldName}: &nbsp;
          <Field
            autoFocus={index === 0}
            type='text'
            name={fieldName}
            className={`${styleClasses.input}`}
          />
          <div
            className={`text-error ${
              touched[fieldName] && errors[fieldName]
                ? 'opacity-1'
                : 'opacity-0'
            } p-1 transition-opacity duration-200 ease-in-out`}
          >
            {(touched[fieldName] && errors[fieldName]) ??
              'this text wont be visible'}
          </div>
        </label>
      );
    });
  };

  return (
    <Formik
      // enableReinitialize={true}
      onSubmit={(values, actions) => {
        // console.log({ values, actions })
        handleSubmit(values);
        // toast.success('Resume was edited successfully');
        actions.setSubmitting(false);
        // actions.resetForm();
      }}
      initialValues={fields}
      validationSchema={validationSchema}
    >
      {({
        touched,
        errors,
        values,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form className='flex flex-col gap-2 '>
          <div
            aria-label='close form'
            onClick={handleClose}
            className='absolute content-["X"] top-2 right-2
                            text-xl cursor-pointer
                            hover:text-primary
                            transition-color duration-200'
          >
            X
          </div>
          {listInputs(touched, errors)}
          <button
            disabled={isSubmitting || areInputsInvalid(errors)}
            type='submit'
            className={`w-[100px] bg-lime-700 leading-8
                               rounded-md  text-gray-300
                               mx-auto z-10
                               disabled:bg-slate-500`}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
