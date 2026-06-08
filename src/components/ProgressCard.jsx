import { useTodo } from '../context/TodoContext';
import { Sparkles } from 'lucide-react';

const ProgressCard = () => {
  const { user, remainingTasksCount } = useTodo();

  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = today.toLocaleDateString('id-ID', options);

  return (
    <div className="w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl overflow-hidden shadow-lg select-none">
      <div className="p-4 sm:p-5 flex items-center gap-4">
        {/* Avatar / Greeting */}
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
          {user?.name ? (
            <span className="text-lg font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          ) : (
            <Sparkles className="w-5 h-5 text-white/60" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight truncate">
            {user?.name ? `Hai, ${user.name.split(' ')[0]}!` : 'Hai!'}
          </h2>
          <p className="text-[11px] text-white/50 font-medium mt-0.5">
            {formattedDate}
          </p>
        </div>

        {/* Stats badge */}
        <div className="shrink-0 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-center">
          <span className="block text-lg font-extrabold text-white leading-none">{remainingTasksCount}</span>
          <span className="block text-[9px] text-white/50 font-medium mt-0.5 uppercase tracking-wider">Sisa</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
