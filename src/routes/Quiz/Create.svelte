<script>
    import quizService from '../../services/quiz.service';
    import {replace} from 'svelte-spa-router';
    let questionName = '';
    let questionDuration = 0;

    const handleSubmit = async () => {
        if (questionName.length <= 0 && questionDuration === 0) throw "Invalid question name or duration";
        await quizService.create({
            name: questionName,
            duration: questionDuration
        }).then(result => {
            console.log(result)
            replace(`/quiz/edit/${result.data.urlId}/${result.data._id}`);
        })
    }
</script>

<div>
    <h1>Question</h1>
    <form on:submit|preventDefault={handleSubmit} class="">
        <label for="questionName">Name:</label>
        <input id="questionName" type="text" bind:value={questionName}/>
        <label for="questionDuration">Duration:</label>
        <input id="questionDuration" type="text" bind:value={questionDuration}/>
        <input type="submit" value="create"/>
    </form>
</div>

<style>
    .content {
        display: grid;
        grid-template-columns: 20% 80%;
        grid-column-gap: 10px;
    }
</style>

