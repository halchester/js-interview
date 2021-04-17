import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles({
	root: {
		maxWidth: 960,
		margin: '2rem auto',
	},
});

const Wrapper = ({ children }) => {
	const classes = useStyle();
	return (
		<Box className={classes.root}>
			<Box>{children}</Box>
		</Box>
	);
};

export default Wrapper;
