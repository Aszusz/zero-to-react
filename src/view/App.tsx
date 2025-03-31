import { useCounter } from '@/shell/useCounter';

function App() {
  const { useCount, onIncrement, onDecrement, onIncrementAsync } = useCounter();
  const count = useCount();

  return (
    <div className="m-10 mx-auto flex max-w-xs flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <h1 className="text-2xl font-semibold">Counter: {count}</h1>

      {/* Button grid container */}
      <div className="grid w-full grid-cols-2 gap-4">
        {/* Increment button */}
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onClick={onIncrement}
        >
          Increment
        </button>

        {/* Decrement button */}
        <button
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
          onClick={onDecrement}
        >
          Decrement
        </button>

        {/* Increment Async button, spanning two columns */}
        <button
          className="col-span-2 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
          onClick={onIncrementAsync}
        >
          Increment Async
        </button>
      </div>
    </div>
  );
}

export default App;
