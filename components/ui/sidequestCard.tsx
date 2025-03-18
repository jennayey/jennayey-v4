import React from "react";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  url: string;
  description: string;
}
export default function Sidequest({ title, description, url }: Props) {
  return (
    <div className="text-sm border-1 border-dashed border-zinc-700">
      {/* Title card */}
      <div className="flex justify-between group bg-zinc-800 text-zinc-50 hover:bg-yellow-500 hover:text-zinc-800 hover: p-2">
        <a
          href={url}
          className="underline group-hover:decoration-zinc-800 decoration-yellow-500 underline-offset-4 "
        >
          {title}
        </a>
        <ArrowUpRight size={16} className="text-yellow-500 group-hover:text-zinc-800 "/>
      </div>
      <div className="text-zinc-50 p-2">
        <p>{description}</p>
      </div>
    </div>
  );
}

