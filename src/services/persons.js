import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addNumber = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data);

const deleteNumber = (id) => axios.delete(`${baseUrl}/${id}`);

const replaceNumber = (id, changedNumber) =>
  axios
    .put(`${baseUrl}/${id}`, changedNumber)
    .then((response) => response.data);

export { getAll, addNumber, deleteNumber, replaceNumber };
