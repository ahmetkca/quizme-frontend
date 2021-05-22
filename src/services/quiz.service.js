import  config from '../helpers/config';
import axios from 'axios';
import {idToken} from '../stores/stores';
import { get } from 'svelte/store';


export default {
	async getAllQuizzes() {
		return await axios.get(`${config.BACKEND_URI}/quiz/`, { 
			headers: {
				'Authorization': `Bearer ${get(idToken).__raw}`
			}
		}).then(response => {
			return response;
		})
	},

	async create(quizParams) {
		console.log(get(idToken));
		return await axios.post(`${config.BACKEND_URI}/quiz/create`, quizParams, {
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${get(idToken).__raw}`
			}
		}).then((response) => {
			return response;
		});
	},

	async getById(id) {
		return await axios.get(`${config.BACKEND_URI}/quiz/${id}`)
			.then((response) => {
				console.log(response)
				return response;
			});
	},

	async deleteById(id) {
		return await axios.delete(`${config.BACKEND_URI}/quiz/${id}`)
			.then((response) => {
				console.log(response)
				return response;
			});
	},

	async update(id, quizParams) {
		return await axios.put(`${config.BACKEND_URI}/quiz/update/${id}`, quizParams, {
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => {
			console.log(response)
			return response;
		});
	},

	async addQuestion(id, questionParams) {
		return await axios.put(`${config.BACKEND_URI}/quiz/add/question/${id}`, questionParams, {
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${get(idToken).__raw}`
			}
		}).then(response => {
			return response;
		})
	}
}