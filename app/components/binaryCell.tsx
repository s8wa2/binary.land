export default function BinaryCell({
  bit,
  power,
}: {
  bit: string;
  power: number;
}) {
  return (
    <div className='flex flex-col items-center' style={{ direction: 'ltr' }}>
      {/* Bit index */}
      <div className='select-none flex items-baseline text-green-400'>
        <span className='text-xs'>2</span>
        <sup className='ml-1'>{power}</sup>
      </div>
      {/* Divider */}
      <hr className='border-white border-[1px] w-full mt-1 mb-1 opacity-50' />
      {/* Bit cell */}
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
