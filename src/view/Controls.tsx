import { Actions } from '@/core/actions';
import { StoreContext } from '@/shell/store';
import { Button } from '@/view/components/shadcn/button';
import { useContext } from 'react';

function Controls() {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const increment = () => dispatch(Actions.create['ui/increment'](null));
  const decrement = () => dispatch(Actions.create['ui/decrement'](null));
  const incrementAsync = () =>
    dispatch(Actions.create['ui/increment-async'](null));
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <Button
        size={'lg'}
        variant={'default'}
        className="text-md font-semibold"
        onClick={increment}
      >
        Increment
      </Button>
      <Button
        size={'lg'}
        variant={'default'}
        className="text-md font-semibold"
        onClick={decrement}
      >
        Decrement
      </Button>
      <Button
        size={'lg'}
        variant={'default'}
        className="text-md col-span-2 font-semibold"
        onClick={incrementAsync}
      >
        Increment Async
      </Button>
    </div>
  );
}

export default Controls;
