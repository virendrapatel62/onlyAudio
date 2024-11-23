import NoResults from "@/components/no-result-found";
import SomethingWentWrong from "@/components/something-went-wrong";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/stores/search-store";
import { PROFILE_PAGE } from "@/utils/constants";
import { getAvatar } from "@/utils/dummy-data";
import { useFormik } from "formik";
import { SearchIcon } from "lucide-react";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const {
    searchResults,
    error,
    isLoading,
    search: fetchResults,
  } = useSearchStore();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit() {},
  });
  const search = formik.values.search;
  const isTouched = formik.touched.search;

  useEffect(() => {
    search?.trim() && fetchResults(search?.trim());
  }, [search]);

  return (
    <div>
      <div className="flex items-center relative">
        <SearchIcon className="absolute left-4 text-gray-500" size={16} />
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Search"
          name="search"
          className="pl-12 text-sm"
        ></Input>
      </div>

      {!!searchResults.length && (
        <Fragment>
          <div className="results mt-2" key="result">
            {searchResults.map((user) => (
              <Link to={PROFILE_PAGE`${user.username}`} key={user._id}>
                <div className="flex gap-4 items-center p-2 cursor-pointer">
                  <img
                    className="w-12 aspect-square h-auto"
                    src={getAvatar(user.username)}
                    alt=""
                  />
                  <div>
                    <div className="text-sm">{user.username}</div>
                    <div className="text-xs">Lorem, ipsum.</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Fragment>
      )}

      {!searchResults.length && isTouched && search && !isLoading && (
        <Fragment>
          <NoResults />
        </Fragment>
      )}

      {error && <SomethingWentWrong />}
    </div>
  );
}
