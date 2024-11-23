import withQueryString from "@/utils/withQueryString";
import api from ".";
import { EXPLORE_SEARCH_API } from "./urls";
import debounce from "lodash.debounce";

export interface ISearchParams {
  query: string;
}
export const search = debounce(
  (params: ISearchParams) => {
    return api
      .get(
        withQueryString(EXPLORE_SEARCH_API, {
          query: params.query,
        })
      )
      .then((response) => {
        return response.data;
      });
  },
  500,
  {
    leading: true,
    trailing: true,
  }
);
