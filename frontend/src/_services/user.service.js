import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
import queryString from 'query-string';

export const userService = {
  getAll,
  getInstanceUsers,
  archiveAll,
  createUser,
  deleteUser,
  updateCurrentUser,
  changePassword,
  getAvatar,
  updateAvatar,
  getLicenseTerms,
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function archiveAll(userId) {
  const requestOptions = { method: 'POST', headers: authHeader() };
  return fetch(`${config.apiUrl}/users/${userId}/archive-all`, requestOptions).then(handleResponse);
}

function getInstanceUsers(page, options) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const { firstName, lastName, email } = options;
  const query = queryString.stringify({ page, firstName, lastName, email });

  return fetch(`${config.apiUrl}/users/all?${query}`, requestOptions).then(handleResponse);
}

function getAvatar(id) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/files/${id}`, requestOptions)
    .then((response) => response.blob())
    .then((blob) => blob);
}

function updateAvatar(formData, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  return fetch(`${config.apiUrl}/users/avatar`, requestOptions).then(handleResponse);
}

function createUser(first_name, last_name, email, role) {
  const body = {
    first_name,
    last_name,
    email,
    role,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
  const requestOptions = { method: 'DELETE', headers: authHeader(), body: JSON.stringify({}) };
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function updateCurrentUser(firstName, lastName) {
  const body = { first_name: firstName, last_name: lastName };
  const requestOptions = { method: 'PATCH', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/users/update`, requestOptions).then(handleResponse);
}

function changePassword(currentPassword, newPassword) {
  const body = { currentPassword, newPassword };
  const requestOptions = { method: 'PATCH', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/users/change_password`, requestOptions).then(handleResponse);
}

function getLicenseTerms() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/users/license-terms`, requestOptions).then(handleResponse);
}
