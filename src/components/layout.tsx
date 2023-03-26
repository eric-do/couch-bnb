import React from 'react';
import Navbar from './navbar';

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <div className='max-h-full'>
      <Navbar />
      <main className="px-5">{children}</main>
    </div>
  )
}