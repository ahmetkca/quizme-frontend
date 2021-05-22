import  config from '../helpers/config';
import axios from 'axios';

export default {
	async create(questionParams) {
		return await axios.post(`${config.BACKEND_URI}/question/create`, questionParams, {
			headers: {
				'content-type': 'application/json',
			}
		}).then((response) => {
			console.log(response)
			return response;
		});
	},

	async getById(id) {
		return await axios.get(`${config.BACKEND_URI}/question/${id}`)
			.then((response) => {
				console.log(response)
				return response;
			});
	},

	async deleteById(id) {
		return await axios.delete(`${config.BACKEND_URI}/question/${id}`)
			.then((response) => {
				console.log(response)
				return response;
			});
	},

	async update(id, questionParams) {
		return await axios.put(`${config.BACKEND_URI}/question/update/${id}`, questionParams, {
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => {
			console.log(response)
			return response;
		});
	},

	async addAnswer(id, answerParams) {
		return await axios.put(`${config.BACKEND_URI}/question/add/answer/${id}`, answerParams, {
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) =>{
			return response;
		})
	}
}