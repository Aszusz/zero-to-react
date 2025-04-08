import { ec } from '@/core/events';
import { selectCount, selectIncrementing } from '@/core/selectors';
import { useAppEmit, useAppSelector } from '@/shell/storeHooks';
import { Button } from '@/view/components/shadcn/button';

function App() {
  const count = useAppSelector(selectCount);
  const isIncrementing = useAppSelector(selectIncrementing);
  const emit = useAppEmit();

  const handleIncrement = () => emit(ec.incrementClicked(null));
  const handleDecrement = () => emit(ec.decrementClicked(null));
  const handleIncrementAsync = () => emit(ec.incrementAsyncClicked(null));

  return (
    <div className="m-10 mx-auto flex max-w-xs flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <h1 className="text-2xl font-semibold">Counter: {count}</h1>
      {/* Optionally display loading state */}
      {isIncrementing && <p className="text-sm text-gray-600">Processing...</p>}

      {/* Button grid container */}
      <div className="grid w-full grid-cols-2 gap-4">
        <Button
          size={'lg'}
          variant={'default'}
          className="text-md font-semibold"
          onClick={handleIncrement}
          disabled={isIncrementing}
        >
          Increment
        </Button>
        <Button
          size={'lg'}
          variant={'default'}
          className="text-md font-semibold"
          onClick={handleDecrement}
          disabled={isIncrementing}
        >
          Decrement
        </Button>
        <Button
          size={'lg'}
          variant={'default'}
          className="text-md col-span-2 font-semibold"
          onClick={handleIncrementAsync}
          disabled={isIncrementing}
        >
          Increment Async
        </Button>
      </div>
    </div>
  );
}

export default App;
