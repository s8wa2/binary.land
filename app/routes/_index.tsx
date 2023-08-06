import type { V2_MetaFunction } from "@remix-run/cloudflare";
import React, { useEffect } from "react";
import BinaryCell from "~/components/binaryCell";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [input, setInput] = React.useState<string>('');
  const [binaryString, setBinaryString] = React.useState<string>('0');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const isBinary = /^0b[01]+$|^[01]+$/.test(input);

      if (isBinary) {
        setBinaryString(input.replace(/^0b/, ''));
      } else if (!isNaN(Number(input))) {
        setBinaryString(Math.round(Number(input)).toString(2));
      } else {
        setBinaryString('0');
      }

      setInput('');
    }
  };

  const displayNumber = binaryString === '0' ? 'Invalid Input' : parseInt(binaryString, 2);
  // Split binary string into groups of 64
  const bitGroups = binaryString.split('').reverse().join('').match(/.{1,32}/g) || [];
  useEffect(() => {
    console.log('BitGroups:', bitGroups);
    console.log({ binaryString })
  }, [bitGroups]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      {/* <h1 className="text-5xl mb-10">{displayNumber}</h1> */}
      <div className="flex items-baseline">
        <h1 className="text-5xl mb-10">{displayNumber}</h1>
        <sub className="ml-1">10</sub>
      </div>
      <input
        className="outline-none p-2 rounded-md shadow-sm bg-secondary"
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputSubmit}
        placeholder="Enter your number"
      />
      {bitGroups.map((group, groupIndex) => (
        <div className="mt-10 grid grid-cols-32 gap-2 justify-end" key={groupIndex}>
          {group.split('').reverse().map((bit, index) => (
            <BinaryCell bit={bit} power={groupIndex * 32 + (group.length - index - 1)} key={index} />
          ))}
        </div>
      ))}
    </div>
  );
}
