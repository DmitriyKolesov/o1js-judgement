<script>
    import {Button} from "flowbite-svelte";
    import {addContest, contestsStore} from "../../stores/contestStore.ts";
    import {goto} from "$app/navigation";

    let contestName = '';
    let categoryName = '';
    let judgeAddress = '';
    let judgementCategories = [];
    let judgeAddresses = [];
    let categoryEditorVisible = false;
    let addressEditorVisible = false;

    const handleSubmit = async () => {
        const contest = {
            contestId: Math.ceil(Math.random() * 1000000000),
            contestName,
            contestCategories: judgementCategories,
            judgesList: judgeAddresses,
        }
        await addContest(contest);
        await goto('/admin');
    }

    ///ToDo: move this logic to separated component
    const addCategoryClick = () => {
        categoryEditorVisible = true;
    }
    const addAddressClick = () => {
        addressEditorVisible = true;
    }
    const addCategory = () => {
        judgementCategories = [...judgementCategories, categoryName];
        categoryEditorVisible = false;
        categoryName = '';
    }
    const addAddress = () => {
        judgeAddresses = [...judgeAddresses, judgeAddress];
        addressEditorVisible = false;
        judgeAddress = '';
    }

    const cancelCategoryAdd = () => {
        categoryEditorVisible = false;
    }

    const cancelAddressAdd = () => {
        categoryEditorVisible = false;
    }

    const deleteCategory = (index) => {
        judgementCategories = [ ...judgementCategories.filter((_, i) => i !== index) ];
    }

    const deleteAddress = (index) => {
        judgeAddresses = [ ...judgeAddresses.filter((_, i) => i !== index) ];
    }


</script>
<div>
  <h1>Add new contest</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="contest_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Contest name
      </label>
      <input bind:value={contestName}
             type="text" id="contest_name"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Best contest" required>
      <p>Judgement categories</p>
      <ul>
        {#each judgementCategories as category, index}
          <li>{category}<Button on:click={() => deleteCategory(index)}>Delete</Button></li>
        {/each}
      </ul>
      {#if categoryEditorVisible}
        <label for="category_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Category name
        </label>
        <input bind:value={categoryName}
               type="text" id="category_name"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Important category" required>
        <div class="mt-2">
          <Button on:click={addCategory}>Add</Button>
          <Button on:click={cancelCategoryAdd}>Cancel</Button>
        </div>
      {:else}
        <div class="mt-2"><Button on:click={addCategoryClick}>Add category</Button></div>
      {/if}
      <p>Judges addresses</p>
      <ul>
        {#each judgeAddresses as address, index}
          <li>{address}<Button on:click={() => deleteAddress(index)}>Delete</Button></li>
        {/each}
      </ul>
      {#if addressEditorVisible}
        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Address
        </label>
        <input bind:value={judgeAddress}
               type="text" id="address"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Important category" required>
        <div class="mt-2">
          <Button on:click={addAddress}>Add</Button>
          <Button on:click={cancelAddressAdd}>Cancel</Button>
        </div>
      {:else}
        <div class="mt-2"><Button on:click={addAddressClick}>Add judge</Button></div>
      {/if}
      <div class="mt-2">
        <Button type="submit" disabled="{$contestsStore.updating}">
          Ok
        </Button>
      </div>
    </div>
  </form>

</div>
