import apisauce from 'apisauce';
import BASE_URL from '../config';

const SITE_URL = BASE_URL || 'http://localhost:4000/';

const api = apisauce.create({
  baseURL: SITE_URL,
  timeout: 10000,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// TO-DO: Will be used with login
// if (jwt.loggedIn()) {
//   api.setHeader('authorization', `Bearer ${jwt.getToken()}`);
// }

const getIntegrations = () => api.get('/api/v1/integrations');
const deleteIntegrationByUUID = (uuid) => api.delete(`/api/v1/integrations/${uuid}`);

export {
  getIntegrations,
  deleteIntegrationByUUID,
};
