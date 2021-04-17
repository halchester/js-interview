import { Card, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

const useStyle = makeStyles({
	root: {
		padding: '0.5rem',
	},
});

const CardThing = ({ item }) => {
	const classes = useStyle();
	return (
		<Card className={classes.root} elevation={3}>
			<Typography>{item.randAlphabet}</Typography>
			<Typography>{moment(item.createdAt).format('YYYY-MM-DD')}</Typography>
		</Card>
	);
};

export default CardThing;
