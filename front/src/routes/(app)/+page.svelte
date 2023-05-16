<script>
    export let data;
    console.log(data);

    let boardList = data.get_board_list;

</script>
<h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
<a href="/create">create</a>

{#each boardList as board}
    <div>{board.tb_subject}</div>
{/each}