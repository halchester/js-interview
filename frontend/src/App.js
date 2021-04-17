import React from 'react';
import { Route, Switch } from 'react-router';
import Wrapper from './utils/Wrapper';
import Home from './pages/Home';
import SignupUser from './pages/auth/SignupUser';

function App() {
	return (
		<Wrapper>
			<Switch>
				<Route path='/signup' component={SignupUser} />
				<Route exact path='/' component={Home} />
			</Switch>
		</Wrapper>
	);
}

export default App;
