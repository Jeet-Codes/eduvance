import React from 'react';
import Layout from '../Layout';
import { Link, Outlet, useLocation } from 'react-router-dom';


const QuestionLayout = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className='p-6 w-full'>
        <h1 className='text-3xl leading-5 mb-4'>Add Questions and Contest</h1>
        <hr />
        <div className='w-full flex flex-col md:flex-row justify-between items-center mt-4'>
          <div className='mb-4 md:mb-0'>
            <Link to="/teacher/add-question">
              <button
                type="button"
                className={`text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-2.5 text-center me-2 mb-2 ${
                  location.pathname === '/teacher/add-question' ? 'bg-gray-900 text-white' : ''
                }`}
              >
                Add Question
              </button>
            </Link>
            <Link to="/teacher/add-contest">
              <button
                type="button"
                className={`text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-2.5 text-center me-2 mb-2 ${
                  location.pathname === '/teacher/add-contest' ? 'bg-gray-900 text-white' : ''
                }`}
              >
                Add Contest
              </button>
            </Link>
          </div>
          <form className="flex w-full md:w-auto">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-950 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search branch name..." required />
            </div>
          </form>
        </div>
        <hr className='my-3' />
       <Outlet/>
      </div>
    </Layout>
  );
};

export default QuestionLayout;