import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <button className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
