import { Button } from './components/shadcn/button';
import { useCounter } from '@/shell/useCounter';

function App() {
  const { useCount, onIncrement, onDecrement, onIncrementAsync } = useCounter();
  const count = useCount();

  return (
    <div className="m-10 mx-auto flex max-w-xs flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <h1 className="text-2xl font-semibold">Counter: {count}</h1>

      {/* Button grid container */}
      <div className="grid w-full grid-cols-2 gap-4">
        <Button
          size={'lg'}
          variant={'default'}
          className="text-md font-semibold"
          onClick={onIncrement}
        >
          Increment
        </Button>

        <Button
          size={'lg'}
          variant={'default'}
          className="text-md font-semibold"
          onClick={onDecrement}
        >
          Decrement
        </Button>

        <Button
          size={'lg'}
          variant={'default'}
          className="text-md col-span-2 font-semibold"
          onClick={onIncrementAsync}
        >
          Increment Async
        </Button>
      </div>
    </div>
  );
}

export default App;
