import type { V2_MetaFunction } from '@remix-run/cloudflare';
import React from 'react';
import BinaryCell from '~/components/binaryCell';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Binary land' }];
};

export default function Index() {
  // User input
  const [input, setInput] = React.useState<string>('');
  // Bits extracted from user input
  const [binaryString, setBinaryString] = React.useState<string>('');

  // Update input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // Handle user input
  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newInput = input.replace(/\..*/g, '').replace(/-/g, ''); // Remove decimal and negative sign
      const isBinary = /^0b[01]+$/.test(newInput);
      if (newInput === '') setBinaryString('');
      else if (isBinary) {
        setBinaryString(newInput.replace(/^0b/, '')); // Don't convert if already binary
      } else {
        try {
          // Convert from other base to binary
          const bigint = BigInt(newInput);
          setBinaryString(bigint.toString(2));
        } catch (e) {
          // BigInt constructor throws an error if the input is invalid
          setBinaryString('Error');
        }
      }
    }
  };
  const toggleBit = (power: number) => {
    const bits = binaryString.split('');
    const reverseIndex = bits.length - power - 1;
    bits[reverseIndex] = bits[reverseIndex] === '0' ? '1' : '0';
    setBinaryString(bits.join(''));
  };

  // Title above input
  const title =
    binaryString === ''
      ? 'Enter a number'
      : /[^01]/g.test(binaryString) // 'Error' if binary string contains invalid characters
      ? 'Invalid input'
      : BigInt('0b0' + binaryString).toString(10); // Display number representation of binary string
  // Binary bits
  const bits = binaryString
    .replace(/[^[01]/g, '') // Remove invalid characters
    .split('')
    .reverse(); // Lowest bits first

  return (
    <div className='flex flex-col items-center justify-center min-h-screen max-w-full bg-primary text-white'>
      <div className='opacity-20 left-0 bottom-0 fixed select-none'>
        {/* Version */}
        <div className='flex items-baseline max-w-sm overflow-hidden'>
          <p className='text-5xl'>v</p>
          <h1 className='text-7xl'>1.0.0</h1>
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
      {/* Bit cells */}
      <div className='mt-10 grid gap-2 binary-grid'>
        {bits.map((bit, index) => (
          <BinaryCell
            bit={bit}
            power={index}
            key={bit + index}
            onclick={(e) => toggleBit(index)}
          />
        ))}
      </div>
    </div>
  );
}
