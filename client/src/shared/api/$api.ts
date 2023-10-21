import axios from "axios";

// TODO: Заменить на переменную из env
const baseUrl = "http://localhost:3001/";

export const $api = axios.create({
	baseURL: baseUrl,
});
