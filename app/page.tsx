export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="shadow-xs text-white font-bold m-4">
          CPRG 306: Web Development 2 - Assignments
        </h1>
        <ol className="max-w-sm">
          <li className="hover:bg-white text-gray-600 hover:text-gray-800 p-3 m-4 bg-gray-300 rounded-2xl shadow-xs text-black font-semibold">
            <a href="./week-2">
              Week 2
            </a>
          </li>
          <li className="hover:bg-white text-gray-600 hover:text-gray-800 p-3 m-4 bg-gray-300 rounded-2xl shadow-xs text-black font-semibold">
            <a href="./week-3">
              Week 3
            </a>
          </li>
          <li className="hover:bg-white text-gray-600 hover:text-gray-800 p-3 m-4 bg-gray-300 rounded-2xl shadow-xs text-black font-semibold">
            <a href="./week-4">
              Week 4
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
}
