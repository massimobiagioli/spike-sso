import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Loading from '../components/Loading';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

export const ProfileComponent = () => {
	const { user, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		(async () => {
			try {
				const token = await getAccessTokenSilently(
				{ 
					ignoreCache: true,
					authorizationParams: {
						scope: "read:current_user"
					}
				});
				console.log('token', token);
			} catch (e) {
				// Handle errors such as `login_required` and `consent_required` by re-prompting for a login
				console.error(e);
			}
		})();
	}, [getAccessTokenSilently]);

	return (
		<Container className='mb-5'>
			<Row className='align-items-center profile-header mb-5 text-center text-md-left'>
				<Col md={2}>
					<img
						src={user.picture}
						alt='Profile'
						className='rounded-circle img-fluid profile-picture mb-3 mb-md-0'
					/>
				</Col>
				<Col md>
					<h2>{user.name}</h2>
					<p className='lead text-muted'>{user.email}</p>
				</Col>
			</Row>
			<Row>
				{JSON.stringify(user, null, 2)}
			</Row>
		</Container>
	);
};

export default withAuthenticationRequired(ProfileComponent, {
	onRedirecting: () => <Loading />,
});
