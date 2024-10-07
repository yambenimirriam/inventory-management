'use client';

import {
  useAppDispatch,
  useAppSelector,
} from '@/app/reduct';
import { setIsSidebarCollapsed } from '@/state';
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const [showProjects, setShowProjects] =
    useState(true);
  const [showPriority, setShowPriority] =
    useState(true);

  const dispatch = useAppDispatch();
  // const isDarkMode = useAppSelector(
  //   (state) => state.global.isDarkMode
  // );
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassNames = `fixed h-[100%] flex-col bg-white justify-between shadow-xl transition-all duration-300 dark:bg-black overflow-y-auto ${isSidebarCollapsed ? 'w-0 hidden ' : 'w-64'}`;

  return (
    <div className={sidebarClassNames}>
      <div className='flex h-[100%] w-full flex-col justify-start'>
        <div className='z-56 flex min-h-[56] w-64 items-center justify-between px-6 pt-3 dark:bg-black '>
          {/* top logo */}
          <div className='text-xl font-bold text-gray-800 dark:text-white'>
            MIRE
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className='py-3'
              onClick={() =>
                dispatch(
                  setIsSidebarCollapsed(
                    !isSidebarCollapsed
                  )
                )
              }
            >
              <X className='h-6 w-6 hover:text-gray-500 text-gray-800 dark:text-white' />
            </button>
          )}
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
        <nav className='z-10 w-full'>
          <SidebarLink
            href='/'
            icon={Home}
            label='Home'
          />
          <SidebarLink
            href='/timeline'
            icon={Briefcase}
            label='Timeline'
          />
          <SidebarLink
            href='/search'
            icon={Search}
            label='Search'
          />
          <SidebarLink
            href='/settings'
            icon={Settings}
            label='Settings'
          />
          <SidebarLink
            href='/users'
            icon={User}
            label='Users'
          />
          <SidebarLink
            href='/teams'
            icon={Users}
            label='Teams'
          />
        </nav>
        {/* Project Links */}
        <button
          onClick={() =>
            setShowProjects((prev) => !prev)
          }
          className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
        >
          <span className=''>Projects</span>
          {showProjects ? (
            <ChevronUp className='h-5 w-5' />
          ) : (
            <ChevronDown className='h-5 w-5' />
          )}
        </button>
        {/* Projects List */}

        {/* Priority Links */}
        <button
          onClick={() =>
            setShowPriority((prev) => !prev)
          }
          className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
        >
          <span className=''>Priority</span>
          {showPriority ? (
            <ChevronUp className='h-5 w-5' />
          ) : (
            <ChevronDown className='h-5 w-5' />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              href='/priority/urgent'
              icon={AlertCircle}
              label='Urgent'
            />
            <SidebarLink
              href='/priority/high'
              icon={ShieldAlert}
              label='High'
            />
            <SidebarLink
              href='/priority/medium'
              icon={AlertTriangle}
              label='Medium'
            />
            <SidebarLink
              href='/priority/low'
              icon={AlertOctagon}
              label='Low'
            />
            <SidebarLink
              href='/priority/backlog'
              icon={Layers3}
              label='Backlog'
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  // isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href} className='w-full'>
      {/* You can handle the dynamic class name logic here */}
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-700 ${
          isActive
            ? 'bg-gray-100 dark:bg-gray-700'
            : ''
        } justify-start px-8 py-3 dark:hover:bg-gray-100`}
      >
        {isActive && (
          <div className='absolute h-[100%] left-0 top-0 w-1 rounded-full bg-blue-200' />
        )}
        <Icon className='h-6 w-6 text-gray-800 dark:text-gray-200' />

        <span className='font-medium text-gray-1000 dark:text-gray-100'>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
