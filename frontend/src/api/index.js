import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const API = axios.create({ baseURL })

export const checkAuthorization = async (config) => await API.get('/admin', config);


export const login = async (data) => await API.post('/admin/login', data);

export const fetchEvents = async () => await API.get('/events');

export const addEvent = async (event, config) => await API.post('/admin/event', event, config);

export const addCommittee = async (data, config) => await API.post('/admin/committee', data, config);

export const fetchCommittee = async () => await API.get('/committee');

export const editEvent = async (id, event, config) => await API.patch('/admin/event/' + id, event, config);

export const deleteEvent = async (event, config) => await API.delete('/admin/event', event, config);

export const registerForEvent = async (data, id) => await API.post('/event/register/' + id, data);

export const membershipRegister = async (data) => await API.post('/membership', data);