"use client";

import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { cn } from "@/utils/tailwind";

const clapsCount: number = 124319;

const showClaps: boolean = true;

type IconProps = {
  className: string;
  variant: "outline" | "solid";
};
function HandsClappingIcon({ variant = "outline", className }: IconProps) {
  return (
    <svg
      width='1em'
      height='1em'
      stroke='black'
      strokeWidth='10'
      viewBox='0 0 512 512'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      fill={variant === "solid" ? "black" : "none"}
    >
      <path
        className='scale-95'
        d='M336 16V80c0 8.8-7.2 16-16 16s-16-7.2-16-16V16c0-8.8 7.2-16 16-16s16 7.2 16 16zm-98.7 7.1l32 48c4.9 7.4 2.9 17.3-4.4 22.2s-17.3 2.9-22.2-4.4l-32-48c-4.9-7.4-2.9-17.3 4.4-22.2s17.3-2.9 22.2 4.4zM135 119c9.4-9.4 24.6-9.4 33.9 0L292.7 242.7c10.1 10.1 27.3 2.9 27.3-11.3V192c0-17.7 14.3-32 32-32s32 14.3 32 32V345.6c0 57.1-30 110-78.9 139.4c-64 38.4-145.8 28.3-198.5-24.4L7 361c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l53 53c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L23 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l93 93c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L55 185c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l117 117c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1l-93-93c-9.4-9.4-9.4-24.6 0-33.9zM433.1 484.9c-24.2 14.5-50.9 22.1-77.7 23.1c48.1-39.6 76.6-99 76.6-162.4l0-98.1c8.2-.1 16-6.4 16-16V192c0-17.7 14.3-32 32-32s32 14.3 32 32V345.6c0 57.1-30 110-78.9 139.4zM424.9 18.7c7.4 4.9 9.3 14.8 4.4 22.2l-32 48c-4.9 7.4-14.8 9.3-22.2 4.4s-9.3-14.8-4.4-22.2l32-48c4.9-7.4 14.8-9.3 22.2-4.4z'
      ></path>
    </svg>
  );
}

function ClapPage() {
  const [clapped, setClapped] = useState<boolean>(false);

  return (
    <div className='min-h-screen flex flex-col justify-start items-center gap-8 p-4'>
      {/* Claps container -- copy this */}
      <div className='inline-flex gap-2 items-center'>
        <div
          className='text-3xl group cursor-pointer'
          onClick={() => setClapped(true)}
        >
          <HandsClappingIcon
            variant={clapped ? "solid" : "outline"}
            className={cn("opacity-50 group-hover:opacity-100")}
          />
        </div>
        {/* split every 3 decimals */}
        {showClaps && (
          <span className='opacity-60 hover:opacity-100'>
            {clapsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        )}
      </div>

      <button onClick={() => setClapped(false)}>Reset Clap</button>
    </div>
  );
}

export default ClapPage;