const isProd = import.meta.env.PROD;
const baseUrl = isProd ? '/api' : 'http://localhost:3333';

export const getApiUrl = (path: string) => {
  return `${baseUrl}${path}`.replace(/\/\/+/g, '/').replace(':/', '://');
};
