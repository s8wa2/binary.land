import type { modalSettings, selection } from '~/routes/_index';
import { formatString } from '~/utils/utils';

export const BitSelectionPopup = ({
  selectedCells,
  settings,
  setSettings,
  binaryString,
}: {
  selectedCells: selection;
  settings: modalSettings;
  setSettings: React.Dispatch<React.SetStateAction<modalSettings>>;
  binaryString: string;
}) => {
  if (selectedCells.endIndex === null || selectedCells.startIndex === null)
    return null;
  return (
    <div className='flex flex-col items-center relative z-10'>
      <div className='text-2xl mb-4'>
        Selected bits {selectedCells.startIndex} to {selectedCells.endIndex}
      </div>
      <div className='grid grid-cols-2 gap-6 text-sm'>
        <div className='flex flex-row'>
          <select
            className='mr-2 rounded'
            onChange={(e) =>
              setSettings((oldSettings) => {
                return {
                  ...oldSettings,
                  base: e.target.value as modalSettings['base'],
                };
              })
            }
          >
            <option value={'16'}>16 - Hex</option>
            <option value={'10'}>10 - Decimal</option>
            <option value={'2'}>2 - Binary</option>
          </select>
          <p className='text-xl'>Base</p>
        </div>
        <div className='flex flex-row'>
          <input
            type='checkbox'
            className='mr-2'
            checked={settings.useJSBigInt}
            onChange={(e) =>
              setSettings({
                ...settings,
                useJSBigInt: e.target.checked,
              })
            }
          />
          <p className='text-xl'>Use JS BigInt</p>
        </div>
      </div>
      Extract: (num {'>>'}{' '}
      {formatString(selectedCells.startIndex, '10', settings)}) &{' '}
      {formatString(
        '1'.repeat(selectedCells.endIndex - selectedCells.startIndex + 1),
        '2',
        settings
      )}
      <br />
      Validate: ((num {'>>'}{' '}
      {formatString(selectedCells.startIndex, '10', settings)}) &{' '}
      {formatString(
        '1'.repeat(selectedCells.endIndex - selectedCells.startIndex + 1),
        '2',
        settings
      )}
      ) ==={' '}
      {formatString(
        binaryString
          .split('')
          .reverse()
          .slice(selectedCells.startIndex, selectedCells.endIndex + 1)
          .reverse()
          .join(''),
        '2',
        settings
      )}
      <br />
    </div>
  );
};
