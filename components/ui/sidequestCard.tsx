import React from "react";

interface Props {
  title: string;
  url: string;
  description: string;
}
export default function Sidequest({ title, description, url }: Props) {
  return (
    <div className="text-sm border-1 border-dashed border-zinc-700">
      {/* Title card */}
      <div className="bg-zinc-800 text-zinc-50 p-2">
        <a
          href={url}
          className="underline decoration-yellow-500 underline-offset-4 hover:text-yellow-500"
        >
          {title}
        </a>
      </div>
      <div className="text-zinc-50 p-2">
        <p>{description}</p>
      </div>
    </div>
  );
}
