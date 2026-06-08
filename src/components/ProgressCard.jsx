import { useTodo } from '../context/TodoContext';

const ProgressCard = () => {
  const {
    user,
    remainingTasksCount,
    completionPercentage,
    todayCompletionPercentage,
    weeklyCompletionPercentage,
  } = useTodo();

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-neutral-100/80 select-none transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] duration-300">
      {/* Header */}
      <div className="bg-[#E8F0FE]/50 px-4 sm:px-5 py-2.5 border-b border-[#D2E3FC]/30 flex items-center justify-between">
        <span className="text-[10px] font-bold text-accent tracking-widest uppercase">
          Progress Dashboard
        </span>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-neutral-400 font-medium uppercase tracking-wide">Live</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        {/* Welcome Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-800 leading-tight truncate">
              Welcome{user?.name ? (
                <span className="text-neutral-900"> {user.name}</span>
              ) : ' guest'}
            </h2>
            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
              {remainingTasksCount} tasks remaining · {completionPercentage}% total progress
            </p>
          </div>
        </div>

        {/* Two Separate Progress Rings */}
        <div className="flex items-center justify-around sm:justify-center sm:gap-12 py-2">
          {/* Today Progress */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-[76px] h-[76px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 76 76">
                <circle
                  cx="38" cy="38" r="32"
                  stroke="#F3F4F6"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="38" cy="38" r="32"
                  stroke="#1A73E8"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={2 * Math.PI * 32 - (todayCompletionPercentage / 100) * 2 * Math.PI * 32}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-800">{todayCompletionPercentage}%</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-neutral-400 tracking-wide uppercase">Today</span>
          </div>

          {/* Divider */}
          <div className="w-px h-20 bg-neutral-100" />

          {/* This Week Progress */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-[76px] h-[76px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 76 76">
                <circle
                  cx="38" cy="38" r="32"
                  stroke="#F3F4F6"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="38" cy="38" r="32"
                  stroke="#8B5CF6"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={2 * Math.PI * 32 - (weeklyCompletionPercentage / 100) * 2 * Math.PI * 32}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-800">{weeklyCompletionPercentage}%</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-neutral-400 tracking-wide uppercase">This Week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;