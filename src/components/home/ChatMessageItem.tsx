import { FaRobot, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/types";

export type Message = {
  role: "bot" | "user";
  text?: string;
  recommendations?: Destination[];
};

type Props = {
  msg: Message;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatMessageItem({ msg, setOpen }: Props) {
  return (
    <div>
      {msg.text && (
        <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          {msg.role === "bot" && (
            <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center mr-2 mt-1 shrink-0">
              <FaRobot size={11} className="text-sky-500" />
            </div>
          )}
          <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
            msg.role === "user"
              ? "bg-sky-500 text-white rounded-br-sm"
              : "bg-base-200 text-base-content rounded-bl-sm"
          }`}>
            {msg.text}
          </div>
        </div>
      )}
      {msg.recommendations && (
        <div className="space-y-2 mt-1">
          {msg.recommendations.map((dest) => (
            <Link key={dest._id} href={`/destinations/${dest._id}`} onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-base-200 hover:bg-base-300 transition-colors border border-base-300 group">
              <Image src={dest.image} alt={dest.title} width={56} height={48} className="w-14 h-12 rounded-lg object-cover shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-base-content text-sm truncate group-hover:text-sky-500 transition-colors">{dest.title}</p>
                <p className="text-base-content/50 text-xs flex items-center gap-1">
                  <FaMapMarkerAlt size={9} className="text-sky-500" />{dest.location}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sky-500 text-xs font-bold">${dest.price}/person</span>
                  <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                    <FaStar size={9} />{dest.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
