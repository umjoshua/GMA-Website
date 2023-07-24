import axios from 'axios';

export const baseURL = process.env.REACT_APP_BASE_URL;

const API = axios.create({ baseURL })

export const checkAuthorization = async (config) => await API.get('/admin', config);

export const login = async (data) => await API.post('/admin/login', data);

export const fetchEvents = async () => await API.get('/user/events');

export const fetchGallery = async () => await API.get('/user/gallery');

export const fetchSwiperData = async () => await API.get('/user/swiper');

export const addEvent = async (event, config) => await API.post('/admin/event', event, config);

export const deleteEvent = async (id, config) => await API.delete('/admin/event/' + id, config);

export const addCommittee = async (data, config) => await API.post('/admin/committee', data, config);

export const deleteCommittee = async (id, config) => await API.delete('/admin/committee/' + id, config);

export const fetchCommittee = async () => await API.get('/user/committee');

export const editEvent = async (id, event, config) => await API.patch('/admin/event/' + id, event, config);

export const registerForEvent = async (data) => await API.post('/user/events', data);

export const membershipRegister = async (data) => await API.post('/user/membership', data);

export const ContactUs = async (data) => await API.post('/user/contactus', data);

export const PayPalOrder = async (data) => await API.post('/orders', data)

export const PayPalCapture = async (data, orderID) => await API.post('/orders/' + orderID + '/capture', data)

export const addGalleryImage = async (data, config) => await API.post('/admin/gallery', data, config);

export const deleteGalleryImage = async (id, config) => await API.delete('/admin/gallery/' + id, config);