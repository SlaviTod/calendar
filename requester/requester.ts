import { HTTPmethod, RequesterArgs } from "@/types";

const apiHost = process.env.EXPO_PUBLIC_API_URL;

export const requester = async ({
  method,
  url,
  token,
  formData,
  queryKeys,
  queries,
  file,
}: RequesterArgs) => {
  const options: Partial<RequestInit> = {};
  let queryString: string = '';

  if (method !== HTTPmethod.get) options.method = method;
  if (formData) {
    options.headers = {
      'content-type': 'application/json',
    };

    options.body = JSON.stringify(formData);
  }
  if (token) options.headers = { ...options.headers, 'authorization': `Bearer ${token}` };

  if (queries) {
    if (queryKeys?.length) {
      queryKeys.forEach((key, index) => {
        queryString += `${index === 0 ? '?' : '&'}${key}=${encodeURIComponent(queries[key])}`;
      });
    }
  }

  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    options.body = formData;
  }

  console.log(`${method} url ${apiHost}${url}${queryString}`)

  const response = await fetch(`${apiHost}${url}${queryString}`, options);

  const result = await response.json();

  if (result.message) throw result;

  return result;
} 