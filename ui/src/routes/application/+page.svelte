<script>
    import { Button } from 'flowbite-svelte';

    let contestId = '';
    let teamName = '';
    let contentLink = '';
    const handleSubmit = async () => {

    }
</script>

<div>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label for="contest_key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Contest key
        </label>
        <input bind:value={contestId}
               type="text" id="contest_key"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Super team" required>
      </div>
      <div>
        <label for="team_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team name</label>
        <input bind:value={teamName}
               type="text" id="team_name"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
               focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Super team" required>
      </div>
      <div>
        <label for="content_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Link to content
        </label>
        <input bind:value={contentLink}
               type="text" id="content_link"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="https://best-content.com" required>
      </div>
    </div>
    <Button type="submit">
      Ok
    </Button>
  </form>
</div>
