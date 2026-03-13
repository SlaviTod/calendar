import { AuthContext } from "@/contexts/AuthContext";
import { HTTPrequest, RequesterArgs } from "@/types";
import { useContext } from "react";


export const useRequesterArgs = ({request, params = [] }: { request: HTTPrequest, params?: string[]}) => {

  const { token } = useContext(AuthContext);

  let url: string = request.url;
  if (request.params?.length && params?.length) url += `/${params[0]}`;
  if (request.additionalUrl) url += `/${request.additionalUrl}`;
  if (request.params?.length && request.params?.length > 1
    && params?.length && params.length > 1) url += `/${params[1]}`;

  const options: RequesterArgs = {
    method: request.method,
    url,
  };

  if (request.needCredentials) options.token = token;
  if (request.queryKeys) options.queryKeys = request.queryKeys;

  return options;
}