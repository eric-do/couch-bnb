import React from 'react';
import Navbar from './navbar';

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <div className='max-h-full'>
      <Navbar />
      <div className="pt-20 bg-white">{children}</div>
    </div>
  )
}