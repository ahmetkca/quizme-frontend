import createAuth0Client from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen, idToken } from '../stores/stores';
import config from '../helpers/config';

async function createClient() {
	let auth0Client = await createAuth0Client( {
		domain: config.AUTH0_DOMAIN,
		client_id: config.AUTH0_CLIENTID
	});
	return auth0Client;
}

async function loginWithPopup(client, options) {
	popupOpen.set(true);
	try { 
		await client.loginWithPopup(options);


		user.set(await client.getUser());
		isAuthenticated.set(true);
		const getIdToken = await client.getIdTokenClaims();
		idToken.set(getIdToken);
	}catch (e) {
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(client) {
	return client.logout();
}

const auth = {
	createClient,
	loginWithPopup,
	logout
}

export default auth;