import type { V2_MetaFunction } from '@remix-run/cloudflare';
import React from 'react';
import BinaryCell from '~/components/binaryCell';
import { BitSelectionPopup } from '~/components/bitSelectionPopup';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Binary land' }];
};

export type modalSettings = {
  base: '2' | '10' | '16';
  useJSBigInt: boolean;
};

export type selection = {
  startIndex: number | null;
  endIndex: number | null;
};

export default function Index() {
  // User input
  const [input, setInput] = React.useState<string>('');
  // Bits extracted from user input
  const [binaryString, setBinaryString] = React.useState<string>('');
  const [selectedCells, setSelectedCells] = React.useState<selection>({
    startIndex: null,
    endIndex: null,
  });
  const [title, setTitle] = React.useState<string>('Enter a number');

  const isSelecting = React.useRef<boolean>(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const [settings, setSettings] = React.useState<modalSettings>({
    base: '16',
    useJSBigInt: false,
  });

  // Update input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // Handle user input
  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newInput = input.replace(/\..*/g, '').replace(/-/g, ''); // Remove decimal and negative sign
      const isBinary = /^0b[01]+$/.test(newInput);
      if (newInput === '') {
        setBinaryString('');
        setTitle('Enter a number');
      } else if (isBinary) {
        setBinaryString(newInput.replace(/^0b/, '')); // Don't convert if already binary
      } else {
        try {
          // Convert from other base to binary
          const bigint = BigInt(newInput);
          setBinaryString(bigint.toString(2));
          setTitle(bigint.toString(10));
        } catch (e) {
          setBinaryString('');
          setTitle('Invalid input');
        }
      }
    }
  };
  const toggleBit = (power: number, reverse = false) => {
    const bits = binaryString.split('');
    const reverseIndex = bits.length - power - 1;
    bits[reverse ? reverseIndex : power] =
      bits[reverse ? reverseIndex : power] === '0' ? '1' : '0';
    setBinaryString(bits.join(''));
  };

  const handleMouseUp = (index: number) => {
    isSelecting.current = false;
    if (selectedCells.startIndex === null) {
      selectedCells.startIndex = null;
      selectedCells.endIndex = null;
      return;
    }
    if (selectedCells.startIndex === index) {
      selectedCells.startIndex = null;
      selectedCells.endIndex = null;
      toggleBit(index, true);
      return;
    }
    const lower = Math.min(index, selectedCells.startIndex);
    const upper = Math.max(index, selectedCells.startIndex);
    setSelectedCells((selectedCells) => ({
      endIndex: upper,
      startIndex: lower,
    }));
    if (popupRef.current) popupRef.current.style.display = 'flex';
  };
  const handleMouseDown = (index: number) => {
    setSelectedCells((_) => ({
      startIndex: index,
      endIndex: null,
    }));
    isSelecting.current = true;
    if (popupRef.current) popupRef.current.style.display = 'none';
  };
  const handleMouseEnter = (index: number) => {
    if (!isSelecting.current || selectedCells.startIndex === null) return;
    setSelectedCells((selectedCells) => ({
      ...selectedCells,
      endIndex: index,
    }));
  };

  React.useEffect(() => {
    // Only update title if binaryString is valid
    if (/^[01]+$/g.test(binaryString)) {
      const bigint = BigInt('0b0' + binaryString);
      setTitle(bigint.toString(10));
    }
  }, [binaryString]);

  const bits = binaryString
    .replace(/[^[01]/g, '')
    .split('')
    .reverse() as ('0' | '1')[];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen max-w-full bg-primary text-white'>
      <div className='opacity-20 left-0 bottom-0 fixed select-none'>
        {/* Version */}
        <div className='flex items-baseline max-w-sm overflow-hidden'>
          <p className='text-5xl'>v</p>
          <h1 className='text-7xl'>1.1.0</h1>
        </div>
      </div>
      {/*  Title */}
      <div className='flex items-baseline max-w-full overflow-auto'>
        <h1 className='text-5xl mb-10'>{title}</h1>
        <sub
          data-error={!/^\d+$/.test(title)}
          className='ml-1 data-[error=true]:hidden'
        >
          10
        </sub>
      </div>
      {/* Input */}
      <input
        className='outline-none p-2 rounded-md shadow-sm bg-secondary'
        type='text'
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputSubmit}
        placeholder='e.g. 0xff or 0b11 or 255'
      />
      {/* Popup */}
      <div
        className='fixed inset-0 items-center justify-center text-black hidden'
        id='BitSelectionDialog'
        ref={popupRef}
      >
        <div className='absolute inset-0 bg-black opacity-50' />
        <div className='relative bg-white p-4 rounded-md shadow-lg'>
          <button
            className='absolute right-0 top-0 text-red-500 mx-1'
            onClick={(e) => {
              if (popupRef.current) popupRef.current.style.display = 'none';
              selectedCells.startIndex = null;
              selectedCells.endIndex = null;
            }}
          >
            X
          </button>
          {selectedCells.endIndex !== null &&
          selectedCells.startIndex !== null &&
          !isSelecting.current ? (
            <BitSelectionPopup
              binaryString={binaryString}
              selectedCells={selectedCells}
              setSettings={setSettings}
              settings={settings}
            />
          ) : (
            <p className='text-2xl mb-4'>Select bits to extract</p>
          )}
        </div>
      </div>
      <div className='mt-10 grid gap-2 binary-grid'>
        {bits.map((bit, index) => (
          <BinaryCell
            bit={bit}
            power={index}
            key={bit + index + isSelecting.current}
            isSelected={
              isSelecting.current
                ? selectedCells.startIndex !== null
                  ? selectedCells.endIndex !== null
                    ? selectedCells.startIndex < selectedCells.endIndex
                      ? index <= selectedCells.endIndex &&
                        index >= selectedCells.startIndex
                      : index >= selectedCells.endIndex &&
                        index <= selectedCells.startIndex
                    : index === selectedCells.startIndex
                  : false
                : false
            }
            onClick={(e) => toggleBit(bits.length - index - 1)}
            onMouseUp={(e) => handleMouseUp(index)}
            onMouseEnter={(e) => handleMouseEnter(index)}
            onMouseDown={(e) => handleMouseDown(index)}
          />
        ))}
      </div>
    </div>
  );
}
