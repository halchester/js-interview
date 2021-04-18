import {
  Box,
  Button,
  Grid,
  makeStyles,
  TablePagination,
  Typography
} from '@material-ui/core'
import axios from '../api/index'
import React, { useState } from 'react'
import Spinner from '../utils/Spinner/Spinner'
import CardThing from '../components/CardThing'
import { Link } from 'react-router-dom'

const useStyle = makeStyles({
  root: {
    margin: '1rem 1rem'
  },
  button: {
    marginBottom: '1rem'
  },
  container: {
    maxWidth: '20rem',
    margin: '2rem auto'
  }
})

const Home = () => {
  const classes = useStyle()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [processed, setProcessed] = useState(false)

  // For pagination
  const [cardsPerPage, setCardsPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const handlePageChange = (e, newPage) => {
    setPage(newPage)
  }

  const handleCardsPerPage = (e) => {
    setCardsPerPage(e.target.value, 10)
    setPage(1)
  }

  const getAllData = () => {
    setLoading(true)
    axios
      .get('/fetch', {
        headers: headers
      })
      .then((response) => {
        setLoading(false)
        setData(response.data.data)
      })
  }

  const headers = {
    Authoriszation: `Authoriszation Bearer ${localStorage.getItem(
			'JWTsvestedThing'
		)}`
  }

  const postHeaderAndProcess = () => {
    setLoading(true)
    axios
      .post('/process', {}, {})
      .then((response) => {
        console.log(response)
        setLoading(false)
        setProcessed(true)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
		<Box className={classes.root}>
			<Typography variant='h4' color='primary' gutterBottom align='center'>
				Welcome!
			</Typography>
			{localStorage.getItem('JWTsvestedThing')
			  ? (
				<Typography align='center' variant='h6'>
					Signed In!
				</Typography>
			    )
			  : (
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
					disabled={!localStorage.getItem('JWTsvestedThing')}
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
			{processed
			  ? (
				<Typography
					variant='h6'
					align='center'
					style={{ color: 'green' }}
					gutterBottom
				>
					Successfully processed!
				</Typography>
			    )
			  : null}
			<Grid container spacing={3}>
				{data.length !== 0 && (
					<>
						{data
						  .slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage)
						  .map((item) => (
								<Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
									<CardThing item={item} key={item.createdAt} />
								</Grid>
						  ))}
					</>
				)}
			</Grid>
			{data.length !== 0 && (
				<TablePagination
					component='div'
					rowsPerPageOptions={[10, 25, 50, 100]}
					count={data.length}
					labelRowsPerPage='Cards Per Page'
					page={page}
					onChangePage={handlePageChange}
					rowsPerPage={cardsPerPage}
					onChangeRowsPerPage={handleCardsPerPage}
				/>
			)}
		</Box>
  )
}

export default Home
