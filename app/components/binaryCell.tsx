import { MouseEventHandler } from 'react';

export default function BinaryCell({
  bit,
  power,
  isSelected,
  onClick,
  onMouseUp,
  onMouseEnter,
  onMouseDown,
}: {
  bit: string;
  power: number;
  isSelected?: boolean;
  onClick?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
}) {
  return (
    <div
      className='flex flex-col items-center select-none'
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      style={{ direction: 'ltr' }}
    >
      <div className='flex items-baseline text-green-400'>
        <span className='text-xs'>
          2<span className='ml-1 align-super text-xs'>{power}</span>
        </span>
      </div>
      <hr className='border-white border-[1px] w-full mt-1 mb-1 opacity-50' />
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-md mb-2 shadow-sm border-2 border-secondary ${
          isSelected ? 'bg-tertiary' : 'bg-transparent'
        } ${bit === '1' ? 'text-bit-on' : 'text-bit-off'}`}
      >
        {bit}
      </div>
    </div>
  );
}
