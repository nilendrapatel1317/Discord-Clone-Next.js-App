import { Hash } from "lucide-react";
import { Separator } from "../ui/separator";

export const ChatWelcome = ({ name, type }) => {
  console.log(name)
  return (
    <div className="space-y-2 px-4 mb-1">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-2xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel" ? (
          <div>
            <p>This is the start of the #${name} channel.</p>

            <p className="font-semibold text-lg my-2">
              Here are some Guidelines / Rules:
            </p>
            <ul className="list-none list-inside space-y-1 text-sm ">
              <li><span className="text-red-500 text-2xl">#</span>Be respectful.</li>
              <li><span className="text-red-500 text-2xl">#</span>Use proper grammar, no spamming.</li>
              <li><span className="text-red-500 text-2xl">#</span>Stay civil in Voice Chat.</li>
              <li><span className="text-red-500 text-2xl">#</span>Post in the right channels.</li>
              <li><span className="text-red-500 text-2xl">#</span>No personal info sharing.</li>
              <li><span className="text-red-500 text-2xl">#</span>Respect Moderators & Admins.</li>
              <li><span className="text-red-500 text-2xl">#</span>Avoid inappropriate / bad content.</li>
              <li><span className="text-red-500 text-2xl">#</span>Breaking rules results in removal.</li>
              <li className="sm:hidden"><span className="text-red-500 text-2xl">#</span>No hate speech or harassment.</li>
              <li className="sm:hidden"><span className="text-red-500 text-2xl">#</span>No trolling or disruption.</li>
            </ul>
            <Separator className="h-[2px] w-full my-2 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
          </div>
        ) : (
          `This is the start of your conversation with ${name}`
        )}
      </p>
    </div>
  );
};
