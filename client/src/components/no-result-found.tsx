import { Fragment } from "react/jsx-runtime";

export default function NoResults() {
  return (
    <Fragment>
      <div className="no-result gap-2 min-h-96 flex flex-col items-center justify-center text-gray-400">
        <img src="/icons/no-results.png" className="w-32" alt="" />
        <div className="text-xl">No result found</div>
        <div className="text-xs">Try searching again</div>
      </div>
    </Fragment>
  );
}
