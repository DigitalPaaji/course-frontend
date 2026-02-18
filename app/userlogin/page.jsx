"use client"
import axios from 'axios';
import React, { useState } from 'react';
import { base_url } from '../utls';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
axios.defaults.withCredentials=true;


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const route = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const response = await axios.post(`${base_url}/user/login`,{
        email,password
    })
    const data = await response.data;
    toast.success(data.message);
    route.push("/")
   } catch (error) {
    toast.error(error.response.data.message)
   }
  };

  return (
    // changed: bg-black for the entire page background
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      
      {/* changed: bg-gray-900 for the card and added a subtle border */}
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-900 rounded-xl shadow-2xl z-10 border border-gray-800">
        
        <div className="text-center">
          {/* Logo */}
          <img
            className="mx-auto h-16 w-auto"
            src="logo.webp" 
            alt="Digital Paaji Academy Logo"
          />
        
        
          {/* Header - changed: text-white */}
          <h3 className="mt-6 text-xl font-semibold text-white">
            Student Login
          </h3>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                // changed: bg-gray-800, border-gray-700, text-white, placeholder-gray-500
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                // changed: bg-gray-800, border-gray-700, text-white, placeholder-gray-500
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                // changed: border-gray-600 bg-gray-700 (if supported by plugin) or standard styling
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
              />
              {/* changed: text-gray-300 */}
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              {/* changed: text-blue-400 for better contrast on dark */}
              <a
                href="#"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* changed: text-blue-300 */}
                <svg
                  className="h-5 w-5 text-blue-300 group-hover:text-blue-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;