"use client";

import { useState } from "react";
import Claps from "./claps";

const clapsCount: number = 124319;
const showClapsCount: boolean = true;

type IconProps = {
  className?: string;
};

function ClapPage() {
  const [clapped, setClapped] = useState<boolean>(false);
  const [clapCount, setClapCount] = useState<number>(0);

  return (
    <div className='min-h-screen flex flex-col justify-start items-center gap-8 p-4'>
      <div className='inline-flex items-center'>
        <Claps />

        {/* split every 3 decimals */}
        {showClapsCount && (
          <span className='opacity-60 hover:opacity-100 select-none'>
            {(clapsCount + clapCount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        )}
      </div>

      <button
        className='border border-black rounded-lg px-4'
        onClick={() => {
          setClapCount(0);
          setClapped(false);
        }}
      >
        Reset Clap
      </button>
    </div>
  );
}

export default ClapPage;
