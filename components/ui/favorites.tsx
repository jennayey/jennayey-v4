import React from "react";
import { ArrowUpRight } from "lucide-react";

interface Props {
  category: string;
  item: string;
  url?: string;
  hasURL?: boolean;
}
export default function Favorites({ category, item, url, hasURL }: Props) {
  return (
    <div className="w-full  text-sm border-b-1 border-dashed border-zinc-700">
      <div className="grid grid-cols-[125px_1fr_min-content] group text-zinc-50 hover:bg-yellow-500 hover:text-zinc-800 hover: p-2">
        <p>{category}</p>
        {hasURL ? (
          <>
            {" "}
            <a
              href={url}
              target="_blank"
              className="underline group-hover:decoration-zinc-800 decoration-yellow-500 underline-offset-4 "
            >
              {item}
            </a>
            <ArrowUpRight
              size={16}
              className="text-yellow-500 group-hover:text-zinc-800 "
            />
          </>
        ) : (
          <p>{item}</p>
        )}
      </div>
    </div>
  );
}
