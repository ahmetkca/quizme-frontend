<script>
	import { push } from 'svelte-spa-router';
	import { user, idToken } from '../../stores/stores';
	import { onMount } from 'svelte';
	import quizService from '../../services/quiz.service';

	let quizzes = [];

	onMount(async () => {
		console.log($user);
		console.log($idToken);
		await quizService.getAllQuizzes()
			.then(result => {
				quizzes = result.data;
			})
	})
</script>

<div>
	{#if quizzes.length !== 0}
		{#each quizzes as quiz (quiz._id)}
			<div class="border-2 border-blue-700 my-2 p-1">
				<div class="font-bold text-xl">{quiz.name}</div>
				<div class="text-base">{quiz.duration} m</div>
				<div class="text-base">{$user.nickname || $user.name}</div>
				<div class="text-base"> There are {quiz.questions.length} question(s)</div>
				<button on:click={() => push(`/quiz/edit/${quiz.urlId}/${quiz._id}`)}>edit</button>
			</div>
		{/each}
	{:else}
		<div class="text-lg">You haven't created any quiz.</div>
	{/if}
	<button on:click={() => push('/quiz/create')}>Create a quiz</button>
	<button on:click={() => push('/quiz/write')}>Write a quiz</button>
</div>
