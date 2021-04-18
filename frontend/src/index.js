import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './api/query'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
