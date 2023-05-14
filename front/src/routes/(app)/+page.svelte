<script>
    export let data;
    console.log(data);

    let boardList = data.get_board_list;

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/create">create</a>

{#each boardList as board}
    <div>{board.tb_subject}</div>
{/each}