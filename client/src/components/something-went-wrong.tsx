import { Fragment } from "react/jsx-runtime";

export default function SomethingWentWrong() {
  return (
    <Fragment>
      <div className="no-result gap-2 min-h-96 flex flex-col items-center justify-center text-gray-400">
        <img src="/icons/wrong.png" className="w-32" alt="" />
        <div className="text-xl">Somthing went wrong</div>
        <div className="text-xs">Try again</div>
      </div>
    </Fragment>
  );
}
