export default function BinaryCell({ bit, power }: { bit: string, power: number }) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-baseline text-tertiary">
                <span className="text-xs">2</span>
                <sup className="ml-1">{power}</sup>
            </div>
            <hr className="border-secondary border-[1px] w-full mt-1 mb-1" />
            <div className={`w-10 h-10 flex items-center justify-center rounded-md mb-2 shadow-sm text-white ${bit === '1' ? 'bg-bit-on' : 'bg-bit-off'}`}>
                {bit}
            </div>
            {/* <span className="text-xs text-white">2^{power}</span> */}
        </div>
    );
    /* 
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-baseline text-coolColor">
                <span className="text-xs">2</span>
                <sup className="ml-1">{power}</sup>
            </div>
            <hr className="border-secondary border-[1px] w-full mt-1 mb-1" />
            <div className={`p-2 w-full rounded-md text-center ${bit === '1' ? 'bg-bit-on' : 'bg-bit-off'}`}>
                <span>{bit}</span>
            </div>
        </div>
    );
} */
}