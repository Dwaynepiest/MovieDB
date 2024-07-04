// apiService.js

let apiUrls = [];

export function saveApiUrls(urls) {
  apiUrls = urls;
}

export function getApiUrl(apiName) {
  const api = apiUrls.find(api => api.name === apiName);
  if (!api || !api.url) {
    throw new Error(`API URL for ${apiName} not set`);
  }
  return api.url;
}
