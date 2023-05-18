import cookie from 'cookie';
import { writable } from 'svelte/store'
import { browser } from "$app/environment";

export let admin_sidebar = writable(false);
export let pc_sidebar = writable(false);
export let mobile_sidebar = writable(false);

export let user_info = writable('');