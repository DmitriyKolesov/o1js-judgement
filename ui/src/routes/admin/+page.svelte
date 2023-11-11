<script>
    import {Button} from "flowbite-svelte";
    import {onMount} from 'svelte';
    import {contestsStore, loadContests} from "../../stores/contestStore.ts";
    import {goto} from "$app/navigation";

    onMount(async () => {
        await loadContests();
    })
    const addContest = async () => {
        await goto('/edit-contest');
    }

</script>
<div>
  <h1>Active contests</h1>
  {#if $contestsStore.loading}
    <p>Loading...</p>
  {:else if $contestsStore.error}
    <p>{$contestsStore.error}</p>
  {:else}
    {#if !$contestsStore.contests || !$contestsStore.contests.length}
      <p>No active contests, try to create one</p>
    {:else}
      {#each $contestsStore.contests as contest}
        <p>{contest.contestName}</p>
      {/each}
    {/if}
  {/if}
  <Button on:click={addContest}>Add Contest</Button>
</div>
