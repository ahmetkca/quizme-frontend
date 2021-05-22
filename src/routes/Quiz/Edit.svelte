<script>
	import {onMount} from 'svelte';
	import quizService from '../../services/quiz.service';
	import {replace} from 'svelte-spa-router';
	import Question from "./components/Question.svelte";

	export let params = {};

	let quizId = params.quizId;
	let questionUrlId = params.urlId;
	let questionName = '';
	let questionDuration = 0;
	let questions = [];

	let selectedQuestionId;
	// $: selectedQuestionId;

	onMount(async () => {
		await quizService.getById(quizId)
				.then(result => {
					questionName = result.data.name;
					questionDuration = result.data.duration;
					questions = result.data.questions;
				})
				.catch(err => {
					console.error(err);
					replace('/')
				})
	})

	const createQuestion = async () => {
		await quizService.addQuestion(quizId, {
			question: "Enter the question name here."
		}).then(result => {
			questions = result.data.questions;
		})
	}

	const handleQuestionSelect = () => {

	}

</script>

<div>
	<h1>Editing quiz {questionName}</h1>
	<div>
		<select bind:value={selectedQuestionId} on:change={handleQuestionSelect}>
			{#each questions as question (question._id) }
				<option value={question._id}>
					{question.question}
				</option>
			{/each}
		</select>
		<button on:click={createQuestion}>
			add question
		</button>
	</div>
	{#if selectedQuestionId}
		{#key selectedQuestionId}
			<Question id={selectedQuestionId}/>
		{/key}
	{/if}

</div>