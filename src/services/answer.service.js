import config from '../helpers/config';
import axios from 'axios';

export default {
	async create(answerParams) {
		return await axios.post(`${config.BACKEND_URI}/answer/create`, answerParams, {
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => {
			console.log(response)
			return response;
		});
	},

	async getById(id) {
		return await axios.get(`${config.BACKEND_URI}/answer/${id}`)
			.then((response) => {
				console.log(response)
				return response;
			});
	},

	async deleteById(id) {
		return await axios.delete(`${config.BACKEND_URI}/answer/${id}`)
			.then((response) => {
				console.log(response)
				return response;
			});
	},

	async update(id, answerParams) {
		return await axios.put(`${config.BACKEND_URI}/answer/update/${id}`, answerParams, {
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => {
			console.log(response)
			return response;
		});
	}
}