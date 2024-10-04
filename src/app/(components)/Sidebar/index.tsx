'use client';

import { LockIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const Sidebar = () => {
  const [showProjects, setShowProjects] =
    useState(true);
  const [showPriority, setShowPriority] =
    useState(true);

  const sidebarClassNames =
    'fixed h-[100%] flex-col bg-white justify-between shadow-xl transition-all duration-300 dark:bg-black overflow-y-auto w-64';

  return (
    <div className={sidebarClassNames}>
      <div className='flex h-[100%] w-full flex-col justify-start'>
        <div className='z-56 flex min-h-[56] w-64 items-center justify-between px-6 pt-3 dark:bg-black '>
          {/* top logo */}
          <div className='text-xl font-bold text-gray-800 dark:text-white'>
            MIRE
          </div>
        </div>
        {/* team */}
        <div className='flex items-start gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
          <Image
            src='/logo.png'
            alt='logo'
            width={40}
            height={40}
          />
          <div>
            <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>
              MIRE TEAM
            </h3>
            <div className='mt-1 flex items-start gap-2'>
              <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400' />
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Private
              </p>
            </div>
          </div>
        </div>
        {/* navbar links  */}
      </div>
    </div>
  );
};

export default Sidebar;
