import { useState } from "react";

interface Props {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-slate-800 text-white whitespace-nowrap shadow-md z-50">
          {content}
        </div>
      )}
    </div>
  );
}
