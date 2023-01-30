import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addNumber = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data);

const deleteNumber = (id) => axios.delete(`${baseUrl}/${id}`);

export { getAll, addNumber, deleteNumber };
