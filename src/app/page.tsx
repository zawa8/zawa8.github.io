'use client';
import { SetStateAction, useState } from 'react';

import Image from "next/image";
// import { FormEvent } from "react";
import { duztr } from "./ztr/duztr";
// import { ue2il } from "./ztr/ue2il";
import { Button } from "@/components/ui/button"
import FontPicker from '@/components/lifonts/lifp';

export default function Home() {
  const [iteksta, set_iteksta] = useState('6यरलमनफ5टडपबस');
  const [oteksta, set_oteksta] = useState('');
  const itekst: string = "";
  const otekst: string = "";
  const ztrdir: string = "";
  // const [text, set_text] = useState(itekst);

  const ioz: { i: string; o: string; z: string } = { i: itekst, o: otekst, z: ztrdir };

  const handle_ita_change = (event: { target: { value: SetStateAction<string>; }; }) => {
    set_iteksta(event.target.value);
  };
  const handle_ota_change = (event: { target: { value: SetStateAction<string>; }; }) => {
    set_oteksta(event.target.value);
  };
  function itekst_on_input(): void { duztr(ioz); }
  //function ztrdir_changed(): void { duztr(ioz); }
  function on_eu2l() { 
    ioz.i = iteksta ;
    //ue2il(ioz); 
    /////
    ioz.z = "e2i"; duztr(ioz);
    ioz.z = "u2i"; duztr(ioz);
    ioz.i = ioz.o; // set_iteksta(ioz.i); //risky
    ioz.z = "i2l"; duztr(ioz);
    set_oteksta(ioz.o);
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
		<Image className="dark:invert" src="/logo3klr.jpg" alt="zawa8 logo" 
		  width={100} height={100} priority
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="dark:invert" src="/logo3klr.jpg" alt="zawa8 logo"
              width={20} height={20} />
            deploy now
          </a>
          <FontPicker/>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
          <textarea id="ita" onInput={itekst_on_input}></textarea>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <textarea id="ita" value={iteksta} onChange={handle_ita_change} cols={80}></textarea>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button onClick={on_eu2l}>eu2l</Button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <textarea id="ota" value={oteksta} onChange={handle_ota_change} cols={80} rows={12}></textarea>
        </div>        
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}


