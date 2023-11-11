<script>
	import '../app.postcss';
	import '../styles/globals.css';
	import { Navbar, NavLi, NavUl } from 'flowbite-svelte';
	import {onMount} from "svelte";
	import {saveUserData, userStore} from "../stores/userState.ts";
	onMount(async () => {
		if (window.mina) {
			const accounts = await window.mina.requestAccounts();
			saveUserData({walletKeys: accounts});
		}
	});
</script>

<div class="min-h-screen flex flex-col">
	<Navbar>
		<NavUl>
			<NavLi href="/admin">Admin view</NavLi>
			<NavLi href="/judge">Judge view</NavLi>
			<NavLi href="/application">Apply for contest</NavLi>
		</NavUl>
	</Navbar>
	<main class="flex-grow">
		<div class="container mx-auto px-4 md:px-6 py-4">
			<slot></slot>
		</div>
	</main>
</div>
