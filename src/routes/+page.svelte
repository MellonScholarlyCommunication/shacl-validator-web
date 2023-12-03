<script>
    import { validateString } from '$lib/index.js';

    let result = '';
    let value = '';

    async function validate() {
        result = await validateString(value);
    }
</script>

<h1>Event Notification Validator</h1>

<p>
Paste your notification here:<br/>
<textarea id="validation-body" bind:value={value}></textarea>
<br/>
<button on:click={validate}>Validate</button>

{#if result}
<h2 id="result-header">Validation Result</h2>
<pre id="result-body">
{result}
</pre>
{/if}
</p>

<style>
    textarea {
        width: 800px;
        height: 400px;
    }
</style>