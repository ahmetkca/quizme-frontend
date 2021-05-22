<script>
    let onMountQuestion = '';
    export let question = '';
    export let id;
    export let correctAnswer = {};
    export let answers = [];
    import Answer from './Answer.svelte';
    import { onMount, onDestroy } from 'svelte';
    import questionService from '../../../services/question.service';

    let group = undefined;
    let toggleQuestionChange = false;
    onMount(async () => {
        console.log(`${question} ${id} component has been created.`);
        await questionService.getById(id)
            .then(result => {
                question = result.data.question;
                correctAnswer = result.data.correctAnswer;
                answers = result.data.answers;
                onMountQuestion = question;
                if (correctAnswer !== undefined ) {
                    group = correctAnswer._id;
                }
            })
        toggleQuestionChange = false;
    })

    onDestroy(() => {
        console.log(`${question} ${id} component has been destroyed.`);
    })

    let answer = "";

    const createAnswer = (event) => {
        if (answer.length === 0) {
            return;
        }
        if (event.code === "Enter") {
            event.preventDefault()
            questionService.addAnswer(id, {
                answer: answer
            }).then(result => {
                answers = result.data.answers;
            })
            answer = ""
        }
    }
    $: if (group) {
        console.log(group);
        questionService.update(id, {
            correctAnswer: group
        }).then((result) => {
            answers.forEach((answer, index) => {
                if (answer._id === group) {
                    correctAnswer = answers[index];
                }
            })
        })
    }

    const acceptQuestionChange = async () => {
        toggleQuestionChange = false;
        await questionService.update(id, {
            question: question
        });
        onMountQuestion = question;
    }

    const cancelQuestionChange = async () => {
        toggleQuestionChange = false;
        question = onMountQuestion;
    }

</script>

<div>
    <div {id}>
        <label for="toggleQuestionChange">Question: </label>
        <input id="toggleQuestionChange" type="text" bind:value={question} on:focusin={() => { toggleQuestionChange = true; }} />
        {#if toggleQuestionChange}
            <button on:click={acceptQuestionChange} class="accept">
                accept
            </button>
            <button on:click={cancelQuestionChange} class="cancel">
                cancel
            </button>
        {/if}
    </div>
    <div id="answers" >
        <label for="answers-container">Answers: </label>
        <div id="answers-container">
            {#each answers as answer (answer._id)}
                <div class:correct={correctAnswer !== undefined && answer._id === correctAnswer._id}>
                    <Answer answer={answer.answer} id={answer._id} bind:group />
                </div>
            {/each}
        </div>
        <p>Correct answer: {JSON.stringify(correctAnswer)}</p>

    </div>
    <input bind:value={answer} on:keyup|preventDefault={createAnswer} placeholder="enter the next answer here..." />
</div>

<style>
    .correct {
        border: solid 1px;
        color: lime;
    }

    .accept {
        color: lime;
    }

    .cancel {
        color: crimson;
    }
</style>