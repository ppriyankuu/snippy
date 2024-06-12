import {
  backgroundColorState,
  darkToggleState,
  dynamicPaddingState,
  elementRefAtom,
} from '@/store/atoms';
import { toPng } from 'html-to-image';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const Dashboard = () => {
  const [dynamicPadding, setDynamicPadding] =
    useRecoilState(dynamicPaddingState);
  const [darkToggle, setDarkToggle] = useRecoilState(darkToggleState);
  const [_theme, setTheme] = useState<string>('');
  const setBackgroundColor = useSetRecoilState(backgroundColorState);

  const elemRef = useRecoilValue(elementRefAtom);

  const handlePadding = (event: any) => {
    const { value } = event.target;
    debugger;
    setDynamicPadding(value);
  };

  const handleColor = (event: any) => {
    const { value } = event.target;
    setTheme(value);
    themeChange(value);
  };

  const themeChange = (value: any) => {
    const preElement = document.querySelector(
      'pre.Editor_formatted__x4nkp.hljs'
    );

    if (!preElement) return;

    if (value === 'Crimson') {
      preElement.classList.remove('blueTheme');
      preElement.classList.remove('purpleTheme');
      preElement.classList.add('crimsonTheme');
      setBackgroundColor(
        'linear-gradient(140deg, rgb(255, 99, 99), rgb(115, 52, 52))'
      );
    } else if (value === 'Purple') {
      preElement.classList.remove('blueTheme');
      preElement.classList.remove('crimsonTheme');
      preElement.classList.add('purpleTheme');
      setBackgroundColor(
        'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))'
      );
    } else {
      preElement.classList.remove('purpleTheme');
      preElement.classList.remove('crimsonTheme');
      preElement.classList.add('blueTheme');
      setBackgroundColor(
        'linear-gradient(140deg, rgb(142, 199, 251), rgb(28, 85, 170))'
      );
    }
  };

  const htmlToImageConvert = () => {
    if (!elemRef.current) return;
    toPng(elemRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'snippet.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard_items">
        <strong className="dashboard_heading">Theme</strong>
        <select
          style={{
            backgroundColor: '#191919',
            color: '#959595',
            border: ' 1px solid #959595',
          }}
          onChange={handleColor}
          className="block bg-black w-26 p-1  outline-none text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option
            value="Purple"
            style={{ backgroundColor: '#191919', color: '#959595' }}
          >
            Purple
          </option>
          <option
            selected
            value="Crimson"
            style={{ backgroundColor: '#191919', color: '#959595' }}
          >
            Crimson
          </option>
          <option
            value="Blue"
            style={{ backgroundColor: '#191919', color: '#959595' }}
          >
            Blue
          </option>
        </select>
      </div>
      <div className="dashboard_items">
        <strong className="dashboard_heading">Dark mode</strong>
        <label className="inline-flex items-center cursor-pointer outline-none mt-2">
          <input
            type="checkbox"
            checked={darkToggle}
            // value={darkToggle}
            onChange={() => {
              setDarkToggle(!darkToggle);
            }}
            className="sr-only peer outline-none"
          />
          <div className="relative w-9 h-5 outline-none bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className="dashboard_items">
        <strong className="dashboard_heading">Padding</strong>
        <div className=" mt-2">
          <div className="flex text-sm " style={{ color: '#959595' }}>
            <button
              className={`mr-2 ${
                dynamicPadding === '16' ? 'text-red-400' : ''
              }`}
              value={'16'}
              onClick={handlePadding}
            >
              16
            </button>
            <button
              className={`mr-2 ${
                dynamicPadding === '32' ? 'text-red-400' : ''
              }`}
              value={'32'}
              onClick={handlePadding}
            >
              32
            </button>
            <button
              className={`mr-2 ${
                dynamicPadding === '64' ? 'text-red-400' : ''
              }`}
              value={'64'}
              onClick={handlePadding}
            >
              64
            </button>
            <button
              className={`mr-2 ${
                dynamicPadding === '128' ? 'text-red-400' : ''
              }`}
              value={'128'}
              onClick={handlePadding}
            >
              128
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard_items">
        <strong className="dashboard_heading">Language</strong>
        <div className="mt-1">
          <span className="font-medium" style={{ color: '#fb8d8d' }}>
            Javascript
          </span>
        </div>
      </div>
      <div className="dashboard_items">
        <button
          onClick={htmlToImageConvert}
          className="bg-red-400 w-28 text-sm p-2 rounded-lg"
        >
          Save PNG
        </button>
      </div>
    </div>
  );
};
