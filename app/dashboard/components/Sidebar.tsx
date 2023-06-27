import React, {useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';


const Sidebar: React.FC<{ isOpen: boolean; closeSidebar: () => void }> = ({ isOpen, closeSidebar }) => {
  const [active, setActive] = useState(false)
  const pathName = usePathname()

  const handleClick = () => {
    setActive(!active)
  }
  return (
    <>
    <aside className={`lg:flex flex-col w-full md:w-[50%] lg:w-[15rem] h-full fixed z-10 overflow-x-hidden bg-white border-r-2 ${isOpen? 'flex': 'hidden'}`}>
      <div className='flex relative'>
        <button className='p-3 bg-[#005AE2] w-4/5 rounded-lg text-white font-bold' onClick={handleClick}>Create New
        </button>
        {active? (
          <div className='ml-20 mt-10 flex flex-col absolute text-sm bg-white shadow-lg rounded-2xl w-52 justify-center p-2 text-[#005AE2]'>
            <Link href="/dashboard/shortlinks" className='p-2 font-bold' onClick={closeSidebar}> Short Link</Link>
            <Link href="/dashboard/customshortlinks" className='p-2 font-bold' onClick={closeSidebar}>Custom link</Link>
            <Link href="/dashboard/qrcodes" className='p-2 font-bold' onClick={closeSidebar}>QR Code</Link>
          </div>
        ): null}
      </div>
    <div className='flex flex-col mt-6  border-y-2 py-5'>
      <ul className='space-y-10 font-bold text-sm text-[#2E4457]'>
        <li className={pathName === '/dashboard'? 'text-[#005AE2]': ''}>
          <Link href="/dashboard" className= 'flex gap-3 items-center' onClick={closeSidebar} > 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#005AE2" d="M13 9V3h8v6h-8ZM3 13V3h8v10H3Zm10 8V11h8v10h-8ZM3 21v-6h8v6H3Z"/></svg>
            Dashboard
          </Link>
        </li>
        <li className={pathName === '/dashboard/shortlinks'? 'text-[#005AE2]': ''}>
          <Link href="/dashboard/shortlinks" className='flex gap-3 items-center' onClick={closeSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#005AE2" d="M17.74 2.76a4.321 4.321 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.321 4.321 0 0 1 6.1 0zM8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0zm-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.321 4.321 0 0 1-6.1 0a4.321 4.321 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0z"/></svg>
            Short Links
          </Link>
        </li>
        <li className={pathName === '/dashboard/customshortlinks'? 'text-[#005AE2]': ''}>
          <Link href="/dashboard/customshortlinks" className=' flex gap-3 items-center' onClick={closeSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#005AE2" d="m13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 1 1-9.9-9.9l1.415 1.415a5 5 0 0 0 7.07 7.07l.354-.353a5 5 0 0 0 0-7.07l-1.414-1.415L13.06 8.11Zm6.718 6.011l-1.414-1.414a5 5 0 0 0-7.071-7.071l-.354.353a5 5 0 0 0 0 7.071l1.414 1.415l-1.414 1.414l-1.414-1.414a7 7 0 0 1 0-9.9l.353-.353a7 7 0 0 1 9.9 9.9Z"/></svg>
            Custom Links
          </Link>
        </li>
        <li className={pathName === '/dashboard/qrcodes'? 'text-[#005AE2]': ''}>
          <Link href="/dashboard/qrcodes" className='flex gap-3 items-center' onClick={closeSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#005AE2" d="M3 11h2v2H3v-2m8-6h2v4h-2V5m-2 6h4v4h-2v-2H9v-2m6 0h2v2h2v-2h2v2h-2v2h2v4h-2v2h-2v-2h-4v2h-2v-4h4v-2h2v-2h-2v-2m4 8v-4h-2v4h2M15 3h6v6h-6V3m2 2v2h2V5h-2M3 3h6v6H3V3m2 2v2h2V5H5M3 15h6v6H3v-6m2 2v2h2v-2H5Z"/></svg>
            QR Codes
          </Link>
        </li>
        <li className={pathName === '/dashboard/customdomain'? 'text-[#005AE2]': ''}>
          <Link href="/dashboard/customdomain" className=' flex gap-3 items-center ' onClick={closeSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#005AE2" d="m10.95 13.65l-1.375-1.375q-.3-.3-.725-.3t-.725.3q-.3.3-.3.725t.3.725l2.125 2.125q.3.3.7.3t.7-.3l4.225-4.225q.3-.3.3-.725t-.3-.725q-.3-.3-.725-.3t-.725.3L10.95 13.65ZM4 8h16V6H4v2Zm0 12q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Z"/></svg>
            Custom Domain
          </Link>
        </li>
        <li className={pathName === '/dashboard/settings'? 'text-[#005AE2]': ''}>
          <Link href="/dashboard/settings" className='gap-3 flex items-center' onClick={closeSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#005AE2" d="m19.44 12.99l-.01.02c.04-.33.08-.67.08-1.01c0-.34-.03-.66-.07-.99l.01.02l2.44-1.92l-2.43-4.22l-2.87 1.16l.01.01c-.52-.4-1.09-.74-1.71-1h.01L14.44 2H9.57l-.44 3.07h.01c-.62.26-1.19.6-1.71 1l.01-.01l-2.88-1.17l-2.44 4.22l2.44 1.92l.01-.02c-.04.33-.07.65-.07.99c0 .34.03.68.08 1.01l-.01-.02l-2.1 1.65l-.33.26l2.43 4.2l2.88-1.15l-.02-.04c.53.41 1.1.75 1.73 1.01h-.03L9.58 22h4.85s.03-.18.06-.42l.38-2.65h-.01c.62-.26 1.2-.6 1.73-1.01l-.02.04l2.88 1.15l2.43-4.2s-.14-.12-.33-.26l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5z"/></svg>
            Settings
          </Link>
        </li>
      </ul>
    </div>
    </aside>
    </>
  );
};

export default Sidebar;