import { useTodo } from '../context/TodoContext';

const SegmentedControl = () => {
  const { timeframe, setTimeframe } = useTodo();
  
  const tabs = ['Today', 'This Week'];
  const activeIndex = tabs.indexOf(timeframe);

  return (
    <div className="relative bg-neutral-100 p-1 rounded-[14px] flex items-center justify-between w-full max-w-[200px] mx-auto select-none border border-neutral-200/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Sliding Active Pill */}
      <div
        className="absolute top-1 bottom-1 left-1 bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] pill-slider"
        style={{
          width: 'calc(50% - 5px)',
          transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 1.8}px))`
        }}
      />

      {/* Tabs buttons */}
      {tabs.map((tab) => {
        const isActive = timeframe === tab;
        return (
          <button
            key={tab}
            onClick={() => setTimeframe(tab)}
            className={`relative flex-1 py-1.5 text-xs font-semibold text-center rounded-[10px] cursor-pointer focus:outline-none transition-colors duration-200 z-10 ${
              isActive ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;