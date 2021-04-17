import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from '../api/index';
import React, { useState } from 'react';
import Spinner from '../utils/Spinner/Spinner';
import CardThing from '../components/CardThing';

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

	const getAllData = () => {
		setLoading(true);
		axios.get('/fetch').then((response) => {
			setLoading(false);
			setData(response.data.data);
		});
	};

	const postHeaderAndProcess = () => {
		console.log('wosh');
		// The thing to do/ something with process
	};

	return (
		<Box className={classes.root}>
			<Typography variant='h4' color='primary' gutterBottom align='center'>
				Welcome!
			</Typography>
			<Box className={classes.container}>
				<Button
					color='secondary'
					variant='contained'
					className={classes.button}
					onClick={postHeaderAndProcess}
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
			<Grid container spacing={3}>
				{data.length !== 0 &&
					data.map((item) => (
						<Grid item xs={6} sm={4} md={3} lg={2}>
							<CardThing item={item} key={item.id} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default Home;
