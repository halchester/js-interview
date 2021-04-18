import {
	Box,
	Button,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
// import axios from 'axios';
import { Formik } from 'formik';
import { signupValidation } from '../../utils/formValidation';
import axios from '../../api/index';
import { useHistory } from 'react-router';
import { useState } from 'react';
import Spinner from '../../utils/Spinner/Spinner';

const FormikInitialValues = {
	email: '',
	password: '',
};

const useStyle = makeStyles({
	root: {
		margin: '1rem 1rem',
	},
	formContainer: {
		width: '25rem',
	},
	form: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: '2rem',
		justifyContent: 'center',
	},
	input: {
		marginBottom: '1rem',
	},
});

const SignupUser = () => {
	const classes = useStyle();
	const history = useHistory();

	const [loading, setLoading] = useState(false);

	return (
		<Box className={classes.root}>
			<Typography variant='h4' align='center' gutterBottom>
				Please Sign up!
			</Typography>
			<Box className={classes.form}>
				<Formik
					validationSchema={signupValidation}
					initialValues={FormikInitialValues}
					onSubmit={({ email, password }) => {
						setLoading(true);
						const payload = { email, password };
						axios
							.post('/signup', payload)
							.then((response) => {
								setLoading(false);
								localStorage.setItem('JWTsvestedThing', response.data);
								history.push('/');
							})
							.catch((err) => console.log(err));
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (
						<form className={classes.formContainer} onSubmit={handleSubmit}>
							<TextField
								value={values.email}
								name='email'
								id='email'
								onChange={handleChange}
								onBlur={handleBlur}
								label='Email'
								type='email'
								variant='outlined'
								error={Boolean(touched.email) && Boolean(errors.email)}
								helperText={touched.email && errors.email}
								fullWidth
								className={classes.input}
							/>
							<TextField
								value={values.password}
								label='Password'
								name='password'
								id='password'
								type='password'
								onChange={handleChange}
								onBlur={handleBlur}
								helperText={touched.password && errors.password}
								error={Boolean(touched.password) && Boolean(errors.password)}
								variant='outlined'
								fullWidth
								className={classes.input}
							/>
							<Button
								variant='contained'
								fullWidth
								color='secondary'
								type='submit'
								onClick={handleSubmit}
							>
								Sign up!
							</Button>
						</form>
					)}
				</Formik>
				{loading ? <Spinner /> : null}
			</Box>
		</Box>
	);
};

export default SignupUser;
