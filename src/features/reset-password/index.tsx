import React, { FC, useState, Fragment } from 'react';
import ResetPasswordForm from './reset-password-form';
import ConfirmationCard from './email-confirmation/confirmation-card';
import NewPasswordForm from './new-password-form';

const ResetPassword: FC = () => {
  const [values, setValues] = useState({
    step: 1,
    email: ''
  });

  return (
    <Fragment>
      {values.step === 1 ?
        <ResetPasswordForm setValues={setValues} /> :
        <ConfirmationCard email={values.email} />}
    </Fragment>
  );
};

export default ResetPassword;