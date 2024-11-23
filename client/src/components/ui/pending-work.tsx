export default function PendingWork(props: { title?: string }) {
  return (
    <div className="text-center p-8 flex flex-col gap-8 justify-center items-center min-h-96">
      <img
        src="/icons/pending.png"
        className="w-32 hover:rotate-180 transition-all duration-500 animate-pulse"
        alt=""
      />
      <div className="text-lg">
        We're crafting {props.title || "something awesome"} — hang in there!
      </div>
    </div>
  );
}
