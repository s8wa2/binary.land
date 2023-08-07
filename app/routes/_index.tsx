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
  const [binaryString, setBinaryString] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newInput = input.replace(/\..*/g, '')
      const isBinary = /^0b[01]+$/.test(newInput);

      if (isBinary) {
        setBinaryString(newInput.replace(/^0b/, ''));
      } else {
        try {
          const bigint = BigInt(newInput);
          setBinaryString(bigint.toString(2));
        } catch (e) {
          setBinaryString('Error');
        }
      }
    }
  };

  const title = binaryString === '' ? 'Enter a number' : /[^01]/g.test(binaryString) ? 'Invalid input' : BigInt("0b0" + binaryString).toString(10);
  const bits = binaryString.replace(/[^[01]/g, '').split('').reverse();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-full bg-primary text-white">
      <div className="flex items-baseline max-w-full overflow-auto">
        <h1 className="text-5xl mb-10">{title}</h1>
        <sub data-error={!/^\d+$/.test(title)} className="ml-1 data-[error=true]:hidden">10</sub>
      </div>
      <input
        className="outline-none p-2 rounded-md shadow-sm bg-secondary"
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputSubmit}
        placeholder="e.g. 0xff or 0b11 or 255"
      />
      <div className="mt-10 grid gap-2 binary-grid">
        {bits.map((bit, index) => (
          <BinaryCell bit={bit} power={index} key={index} />
        ))}
      </div>
    </div >
  );
}
