<script>
	export let data;
	import { user_info } from '$lib/stores/auth_store';
	import { onMount } from 'svelte';
	console.log(data);

	onMount(() => {
		console.log($user_info);
	});

	let boardList = data.get_board_list;
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<a href="/create">create</a>
<a href="/auth/login">login</a>
<button on:click={() => console.log($user_info)}> 테스트! </button>

{#each boardList as board}
	<div>{board.tb_subject}</div>
{/each}
