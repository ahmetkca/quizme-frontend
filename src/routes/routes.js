import Home from './Home/Index.svelte';
import Quiz from './Quiz/Index.svelte';
import QuizEdit from './Quiz/Edit.svelte';
import QuizCreate from './Quiz/Create.svelte';
import QuizWrite from './Quiz/Write.svelte';

export const routes = {
	'/': Home,
	'/quiz/view/:urlId': Quiz,
	'/quiz/edit/:urlId/:quizId?': QuizEdit,
	'/quiz/create': QuizCreate,
	'/quiz/write/:urlId': QuizWrite
}