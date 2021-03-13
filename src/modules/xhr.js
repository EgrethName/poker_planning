import axios from 'axios';
import host from './hostResolver';

export const baseUrl = `http://${host}:80`;

export const xhr = axios.create({ baseURL: baseUrl });
