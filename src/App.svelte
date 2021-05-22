<script>
	import { push } from 'svelte-spa-router';
	import Router from 'svelte-spa-router';
	import { routes } from './routes/routes';
	import { onMount } from 'svelte';
	import auth from './services/authService';
	import {link} from 'svelte-spa-router'

	import { isAuthenticated, user, idToken } from './stores/stores';

	let auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();

		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
		const getIdToken = await auth0Client.getIdTokenClaims();
		idToken.set(getIdToken);
	})

	function login() { 
		auth.loginWithPopup(auth0Client);
	}

	function logout() { 
		auth.logout(auth0Client);
	}
</script>

<main>
	{#if $isAuthenticated}
		<div class="container mx-auto">
			<a href="/" use:link>Home</a>
			<span class="">&nbsp;&nbsp;{$user.name} ({$user.email})</span>
			<button on:click={logout}>Log Out</button>
		
			<Router {routes} />
		</div>
	{:else}
		<button on:click={login} class="bg-blue-500 px-4 py-2 text-xs font-semibold tracking-wider text-white rounded hover:bg-blue-600">Log In</button>
	{/if}
	
	
</main>


<style>
	
</style>
