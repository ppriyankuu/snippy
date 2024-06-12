'use client';

import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  backgroundColorState,
  darkToggleState,
  dynamicPaddingState,
  elementRefAtom,
} from '@/store/atoms';
import { Dashboard } from './dashboard';

export const Snippent = () => {
  const elemRef = useRef(null);
  const preRef = useRef(null);
  const darkToggle = useRecoilValue(darkToggleState);
  const [inputText, setInputText] = useState('');
  const dynamicPadding = useRecoilValue(dynamicPaddingState);
  const backgroundColor = useRecoilValue(backgroundColorState);

  const setElementRef = useSetRecoilState(elementRefAtom);

  useEffect(() => {
    autoResize();
  }, [inputText]);

  useEffect(() => {
    setElementRef(elemRef);
  }, [elemRef, setElementRef]);

  const formatTextarea = () => {
    hljs.registerLanguage('javascript', javascript);
    const highlightedCode = hljs.highlight(inputText, {
      language: 'javascript',
    }).value;
    return (
      <pre
        className="Editor_formatted__x4nkp hljs hljs-rest crimsonTheme"
        ref={preRef}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      ></pre>
    );
  };

  function autoResize() {
    const textarea2 = document.getElementById('myTextarea2');
    if (!textarea2) return;
    textarea2.style.height = 'auto';
    textarea2.style.height = textarea2.scrollHeight + 'px';
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      autoResize();
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto min-h-screen bg-black">
      <div
        ref={elemRef}
        className={`${
          dynamicPadding === '64'
            ? 'p-20'
            : dynamicPadding === '128'
            ? 'p-28'
            : dynamicPadding === '32'
            ? 'p-14'
            : 'p-8'
        } bg-slate-200 rounded-xl`}
        style={{
          backgroundImage: `${backgroundColor}`,
        }}
      >
        <div
          className=" min-w-max h-content min-h-28 rounded-xl px-2"
          style={
            darkToggle
              ? { backgroundColor: 'rgba(0,0,0,.75)' }
              : { backgroundColor: 'white' }
          }
        >
          <div className="w-38 h-full	pt-4 font-medium text-white flex">
            <div className="w-1/3 flex pl-2 pr-2">
              <div className="w-3 h-3 bg-red-500 rounded-lg mr-1.5"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-lg mr-1.5"></div>
              <div className="w-3 h-3 bg-green-500 rounded-lg mr-1.5"></div>
            </div>
            <div
              className="text-sm w-72 flex justify-center text-slate-400 mr-4"
              contentEditable
              style={{ outline: 'none' }}
            >
              untitled-1
            </div>
          </div>
          <div id="myTextarea2" className="Editor_editor__Jz9sW">
            <textarea
              className="pb-2"
              id="myTextarea"
              onInput={autoResize}
              onKeyDown={handleKeyDown}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
            />
            {formatTextarea()}
          </div>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};
