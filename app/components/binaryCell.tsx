import { MouseEventHandler } from 'react';

export default function BinaryCell({
  bit,
  power,
  onclick,
}: {
  bit: string;
  power: number;
  onclick?: MouseEventHandler;
}) {
  return (
    <div
      className='flex flex-col items-center'
      onClick={onclick}
      style={{ direction: 'ltr' }}
    >
      <div className='select-none flex items-baseline text-green-400'>
        <span className='text-xs'>2</span>
        <sup className='ml-1'>{power}</sup>
      </div>
      <hr className='border-white border-[1px] w-full mt-1 mb-1 opacity-50' />
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-md mb-2 shadow-sm border-2 border-secondary  bg-transparent ${
          bit === '1' ? 'text-bit-on' : 'text-bit-off'
        }`}
      >
        {bit}
      </div>
    </div>
  );
}
