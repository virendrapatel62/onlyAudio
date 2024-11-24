import withQueryString from "@/utils/withQueryString";
import api from ".";
import { GET_USER } from "./urls";

export interface ISearchParams {
  username?: string;
  id?: string;
  email?: string;
}

export const getUser = (params: ISearchParams) => {
  return api.get(withQueryString(GET_USER, params as any)).then((response) => {
    return response.data;
  });
};
