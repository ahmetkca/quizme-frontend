import { writable } from 'svelte/store';

// const stores = {
// 	isAuthenticated: writable(false),
// 	user: writable({}),
// 	popupOpen: writable(false),
// 	error: writable(),
// 	idToken: writable()
// }
export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();
export const idToken = writable();


// export default stores;