<div {id}>
    <input type="radio" bind:group value={id}>
    <input type="text" bind:value={answer} on:focusin={() => {toggleAnswerChange = true;}}/>
    {#if toggleAnswerChange}
        <button on:click={acceptAnswerChange} class="accept">
            accept
        </button>
        <button on:click={cancelAnswerChange} class="cancel">
            cancel
        </button>
    {/if}
</div>

<script>
    import answerService from '../../../services/answer.service';
    import {onMount} from 'svelte';

    export let answer;
    export let id;
    export let group = undefined;
    let onMountAnswer;
    let toggleAnswerChange = false;

    onMount(() => {
        onMountAnswer = answer;
    })

    const acceptAnswerChange = async () => {
        toggleAnswerChange = false;
        await answerService.update(id, {
            answer: answer
        }).then(result => {
            onMountAnswer = answer;
        })
    }

    const cancelAnswerChange = () => {
        toggleAnswerChange = false;
        answer = onMountAnswer;
    }
</script>

<style>
    .accept {
        color: lime;
    }

    .cancel {
        color: crimson;
    }
</style>