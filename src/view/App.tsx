import Controls from '@/view/Controls';
import Count from '@/view/Count';

function App() {
  return (
    <div className="m-10 mx-auto flex max-w-xs flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <Count />
      <Controls />
    </div>
  );
}

export default App;
