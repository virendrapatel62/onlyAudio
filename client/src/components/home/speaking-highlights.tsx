import { getAvatar } from "@/utils/dummy-data";
import clsx from "clsx";

export default function SpeakingHightlights() {
  return (
    <div className="p-1">
      <div className="flex flex-nowrap overflow-x-auto gap-2 no-scrollbar">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <div
              className={clsx(
                `flex-shrink-0 flex flex-col gap-1 items-center justify-center`
              )}
              key={index}
            >
              <img
                className={clsx(
                  "aspect-square w-14  border-2 rounded-full p-1",
                  index < 6 ? "border-orange-500" : "border-transparent"
                )}
                src={getAvatar()}
              ></img>
              <small className="inline-block text-center text-[0.6rem] max-w-[8ch] overflow-hidden overflow-ellipsis">
                username
              </small>
            </div>
          ))}
      </div>
    </div>
  );
}
