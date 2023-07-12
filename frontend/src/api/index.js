import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const API = axios.create({ baseURL })

export const checkAuthorization = async (config) => await API.get('/admin', config);


export const login = async (data) => await API.post('/admin/login', data);

export const fetchEvents = async () => await API.get('/events');

export const addEvent = async (event, config) => await API.post('/admin/event', event, config);

export const deleteEvent = async (id, config) => await API.delete('/admin/event/' + id, config);

export const addCommittee = async (data, config) => await API.post('/admin/committee', data, config);

export const deleteCommittee = async (id, config) => await API.delete('/admin/committee/' + id, config);

export const fetchCommittee = async () => await API.get('/committee');

export const editEvent = async (id, event, config) => await API.patch('/admin/event/' + id, event, config);

export const registerForEvent = async (data) => await API.post('/events/register/', data);

export const membershipRegister = async (data) => await API.post('/membership', data);