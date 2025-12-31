import React from 'react';
import Link from 'next/link';
import { GoogleSignIn } from './GoogleSignIn';

export default function Panel() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50  ">
      <div className="mx-auto flex  items-center justify-end px-6 py-4">

        <Link href="">
          <GoogleSignIn/>
        </Link>
      </div>
    </nav>
  );
}