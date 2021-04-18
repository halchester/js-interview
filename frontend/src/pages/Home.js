import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from '../api/index';
import React, { useState } from 'react';
import Spinner from '../utils/Spinner/Spinner';
import CardThing from '../components/CardThing';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
	root: {
		margin: '1rem 1rem',
	},
	button: {
		marginBottom: '1rem',
	},
	container: {
		maxWidth: '20rem',
		margin: '2rem auto',
	},
});

const Home = () => {
	const classes = useStyle();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [processed, setProcessed] = useState(false);

	const getAllData = () => {
		setLoading(true);
		axios.get('/fetch').then((response) => {
			setLoading(false);
			setData(response.data.data);
		});
	};

	const headers = {
		JWTsvestedThing: localStorage.getItem('JWTsvestedThing'),
	};

	const postHeaderAndProcess = () => {
		setLoading(true);
		axios
			.post(
				'/process',
				{},
				{
					headers: headers,
				}
			)
			.then((response) => {
				setLoading(false);
				setProcessed(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Box className={classes.root}>
			<Typography variant='h4' color='primary' gutterBottom align='center'>
				Welcome!
			</Typography>
			{localStorage.getItem('JWTsvestedThing') ? (
				<Typography align='center' variant='h6'>
					Signed In!
				</Typography>
			) : (
				<Typography align='center' variant='h6'>
					Please Sign up{' '}
					<Link
						to='/signup'
						style={{ textDecoration: 'underline', color: 'black' }}
					>
						here!
					</Link>
				</Typography>
			)}
			<Box className={classes.container}>
				<Button
					color='secondary'
					variant='contained'
					className={classes.button}
					onClick={postHeaderAndProcess}
					disabled={localStorage.getItem('JWTsvestedThing') ? false : true}
					fullWidth
				>
					/process
				</Button>
				<Button
					color='secondary'
					variant='contained'
					className={classes.button}
					fullWidth
					onClick={getAllData}
				>
					/fetch
				</Button>
				{loading ? <Spinner /> : null}
			</Box>
			{processed ? (
				<Typography variant='h6' align='center' style={{ color: 'green' }}>
					Successfully processed!
				</Typography>
			) : null}
			<Grid container spacing={3}>
				{data.length !== 0 &&
					data.map((item) => (
						<Grid item xs={6} sm={4} md={3} lg={2}>
							<CardThing item={item} key={item.createdAt} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default Home;
