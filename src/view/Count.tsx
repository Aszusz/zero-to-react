import { selectCount } from '@/core/selectors';
import { useSelector } from '@/lib/strict-redux/hooks';
import { StoreContext } from '@/shell/store';
import { useContext } from 'react';

function Count() {
  const store = useContext(StoreContext);
  const count = useSelector(store, selectCount);

  return <h1 className="text-2xl font-semibold">Counter: {count}</h1>;
}

export default Count;
