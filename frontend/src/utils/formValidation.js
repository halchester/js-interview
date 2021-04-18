import * as Yup from 'yup'

export const signupValidation = Yup.object().shape({
  username: Yup.string().required('Email must be provided'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 letters')
    .max(20, 'Password must not be longer than 20 letters')
    .required('Password must be provided')
})
