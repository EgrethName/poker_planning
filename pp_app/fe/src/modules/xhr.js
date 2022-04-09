import axios from 'axios';
import host from './hostResolver';

export const baseUrl = `http://${host}`;

export const xhr = axios.create({ baseURL: baseUrl });

const baseUrlArr = window.location.href.split('/');

export const baseSessionId = baseUrlArr[baseUrlArr.length - 1]
