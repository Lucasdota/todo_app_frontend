import React from 'react'
import Spinner from '../shared/Spinner';

export default function RedirectPopUp() {
	return (
    <div className="absolute w-full px-2 h-full z-10 bg-slate-200/30 backdrop-blur-lg flex flex-col items-center justify-center gap-2">
			<p className='text-green-700'>Delete successful!</p>
			<p className='text-gray-700'>Redirecting to login page</p>
			<Spinner width={1.5} height={1.5} />
		</div>
  );
}
