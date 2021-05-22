import {derived, writable} from "svelte/store";
import answerService from '../services/answer.service';
import questionService from '../services/question.service';

function createAnswers() {
    const { subscribe, set, update } = writable([]);

    const methods = {
        async create(answerParams) {
            await answerService.create(answerParams)
                .then(result => {
                    update(answers => {
                        return [ ...answers, result.data ];
                    });
                });
        }
    }
    return {
        subscribe,
        ...methods
    }
}

function createQuestions(answers) {
    const { subscribe, set, update } = writable([]);

    const methods = {
        async create(questionParams) {
            await questionService.create(questionParams)
                .then(result => {
                    update(questions => {
                        return [ ...questions, result.data ];
                    });
                });
        }
    }

    return {
        subscribe,
        ...methods
    }
}

export const answers = createAnswers();
export const questions = createQuestions();

// export const quiz = derived()