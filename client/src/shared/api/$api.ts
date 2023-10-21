import axios from "axios";

// TODO: Заменить на переменную из env
const baseUrl = "http://localhost:3001/api/";

export const $api = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
	},
});
