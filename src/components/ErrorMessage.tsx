"use client";

import Link from "next/link";

type ErrorPageProps = {
  statusCode?: number;
  message?: string;
};

export const ErrorPage = ({ statusCode = 500, message = "An unexpected error occurred.", }: ErrorPageProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white text-center px-4">
      <h1 className="text-8xl font-extrabold text-red-500 mb-4">{statusCode}</h1>
      <p className="text-xl mb-6 max-w-md">{message}</p>
      <Link href="/" className="text-blue-400 text-lg hover:text-blue-300 hover:underline transition duration-300">⬅ Go Back to Home</Link>
    </div>
  );
};
