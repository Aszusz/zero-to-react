import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="m-10 mx-auto flex max-w-xs flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <h1 className="text-2xl font-semibold">Counter: {count}</h1>
      <div className="flex space-x-4">
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onClick={() => setCount((count) => count + 1)}
        >
          Increment
        </button>
        <button
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
          onClick={() => setCount((count) => count - 1)}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
