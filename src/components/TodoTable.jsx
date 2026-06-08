import { useState, useRef } from 'react';
import { useTodo } from '../context/TodoContext';
import { Check, Plus, Trash2, Inbox } from 'lucide-react';

const CircularProgress = ({ percentage, size = 48, strokeWidth = 4, color = '#1A73E8', trackColor = '#F3F4F6' }) => {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const TaskItem = ({ task, isEditing, editText, onToggle, onStartEdit, onSaveEdit, onCancelEdit, onEditChange, onEditKeyDown, onDelete }) => (
  <div
    className={`group flex items-center gap-3 py-3 px-4 bg-white border border-neutral-100 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md hover:border-neutral-200 min-h-[52px] ${
      task.completed ? 'opacity-40' : ''
    }`}
  >
    <button
      onClick={onToggle}
      className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer ${
        task.completed
          ? 'bg-green-500 border-2 border-green-500 text-white shadow-sm shadow-green-500/30 scale-110'
          : 'border-2 border-neutral-300 hover:border-green-400 hover:bg-green-50 hover:scale-110'
      }`}
    >
      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
    </button>

    <div className="flex-1 min-w-0 overflow-hidden">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={onEditChange}
          onBlur={() => onSaveEdit(task.id)}
          onKeyDown={(e) => onEditKeyDown(e, task.id)}
          autoFocus
          className="w-full bg-transparent border-0 border-b-2 border-neutral-200 focus:border-amber-500 px-0 py-0.5 text-sm sm:text-base font-medium focus:outline-none focus:ring-0 transition-colors"
        />
      ) : (
        <span
          onClick={() => onStartEdit(task)}
          className={`block text-sm sm:text-base font-semibold tracking-wide truncate cursor-pointer todo-strikethrough ${
            task.completed
              ? 'completed text-green-600 line-through'
              : 'text-neutral-800'
          }`}
        >
          {task.text}
        </span>
      )}
    </div>

    <button
      onClick={onDelete}
      className="w-8 h-8 shrink-0 flex items-center justify-center text-neutral-300 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
      title="Hapus tugas"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  </div>
);

const WeeklyTaskItem = ({ task, isEditing, editText, daysShort, daysLong, onToggleWeek, onStartEdit, onSaveEdit, onEditChange, onEditKeyDown, onDelete }) => {
  const isAllDone = task.history?.every(Boolean);

  return (
    <div
      className={`group flex items-center gap-3 py-3 px-4 bg-white border border-neutral-100 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md hover:border-neutral-200 min-h-[52px] ${
        isAllDone ? 'opacity-40' : ''
      }`}
    >
      {/* Task Name */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={onEditChange}
            onBlur={() => onSaveEdit(task.id)}
            onKeyDown={(e) => onEditKeyDown(e, task.id)}
            autoFocus
            className="w-full bg-transparent border-0 border-b-2 border-neutral-200 focus:border-violet-500 px-0 py-0.5 text-sm sm:text-base font-medium focus:outline-none focus:ring-0 transition-colors"
          />
        ) : (
          <span
            onClick={() => onStartEdit(task)}
            className={`block text-sm sm:text-base font-semibold tracking-wide truncate cursor-pointer todo-strikethrough ${
              isAllDone
                ? 'completed text-green-600 line-through'
                : 'text-neutral-800'
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Weekly 7-day circles */}
      {task.history && (
        <div className="flex items-center gap-1.5 shrink-0">
          {task.history.map((isDayChecked, dayIndex) => (
            <button
              key={dayIndex}
              onClick={() => onToggleWeek(task, dayIndex)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 focus:outline-none cursor-pointer text-[10px] sm:text-xs font-bold ${
                isDayChecked
                  ? 'bg-green-500 text-white shadow-sm shadow-green-500/30 scale-105'
                  : 'border-2 border-neutral-200 bg-neutral-50 hover:border-green-400 hover:bg-green-50 hover:scale-105 text-neutral-400'
              }`}
              title={`${task.text} — ${daysLong[dayIndex]}`}
            >
              {isDayChecked ? (
                <Check className="w-3.5 h-3.5 stroke-[4]" />
              ) : (
                daysShort[dayIndex]
              )}
            </button>
          ))}
        </div>
      )}

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-neutral-300 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
        title="Hapus tugas"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const TodoTable = ({ onCompleteAction }) => {
  const {
    todayTasks,
    weeklyTasks,
    toggleTask,
    addTask,
    deleteTask,
    updateTaskText,
    todayCompleted,
    todayTotal,
    weeklyCompleted,
    weeklyTotal,
    todayCompletionPercentage,
    weeklyCompletionPercentage,
  } = useTodo();

  const [activeSection, setActiveSection] = useState(null);
  const [newText, setNewText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  const addInputRef = useRef(null);

  const DAYS_SHORT = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const DAYS_LONG = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  // Handlers
  const handleToggleNormal = (task) => {
    toggleTask(task.id);
    onCompleteAction(
      task.completed ? `Unchecked "${task.text}"` : `Completed "${task.text}"!`
    );
  };

  const handleToggleWeekly = (task, dayIndex) => {
    toggleTask(task.id, dayIndex);
    const isNowChecked = !task.history[dayIndex];
    onCompleteAction(
      isNowChecked
        ? `Checked "${task.text}" untuk hari ${DAYS_LONG[dayIndex]}!`
        : `Unchecked "${task.text}" untuk hari ${DAYS_LONG[dayIndex]}`
    );
  };

  const handleStartAdd = (type) => {
    setActiveSection(type);
    setNewText('');
    setTimeout(() => addInputRef.current?.focus(), 50);
  };

  const handleSaveNew = (type) => {
    if (newText.trim()) {
      addTask(newText.trim(), 'Category', type === 'week' ? 'This Week' : 'Today');
      onCompleteAction(`Created task "${newText.trim()}"`);
      setNewText('');
    }
    setActiveSection(null);
  };

  const handleKeyPressNew = (e, type) => {
    if (e.key === 'Enter') handleSaveNew(type);
    if (e.key === 'Escape') {
      setActiveSection(null);
      setNewText('');
    }
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) updateTaskText(id, editText.trim());
    else deleteTask(id);
    setEditingTaskId(null);
  };

  const handleKeyPressEdit = (e, id) => {
    if (e.key === 'Enter') handleSaveEdit(id);
    if (e.key === 'Escape') setEditingTaskId(null);
  };

  const handleDeleteTask = (task) => {
    if (window.confirm(`Delete "${task.text}"?`)) {
      deleteTask(task.id);
      onCompleteAction(`Deleted "${task.text}"`);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 select-none pb-2 font-sans">

      {/* ===================== TODAY SECTION ===================== */}
      <section className="mb-12">
        {/* Today Header — Subjudul besar + progress terpisah */}
        <div className="flex items-center gap-5 mb-6">
          <CircularProgress
            percentage={todayCompletionPercentage}
            size={56}
            strokeWidth={4}
            color="#EAB308"
            trackColor="#FEF9C3"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-neutral-900 tracking-tight leading-none mb-1">
              Today
            </h2>
            <p className="text-sm text-neutral-400 font-medium">
              <span className="font-bold text-neutral-600">{todayCompleted}</span>
              <span className="mx-1">/</span>
              <span>{todayTotal}</span> selesai
            </p>
          </div>
        </div>

        {/* Today Task List */}
        <div className="flex flex-col gap-2">
          {todayTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 px-6 text-center bg-white/50 rounded-3xl border border-dashed border-neutral-200">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                <Inbox className="w-7 h-7 text-amber-300" />
              </div>
              <h4 className="text-sm font-semibold text-neutral-400 mb-1">
                Belum ada tugas
              </h4>
              <p className="text-xs text-neutral-300 max-w-[220px] leading-relaxed">
                Ketuk tombol di bawah untuk menambahkan tugas hari ini.
              </p>
            </div>
          ) : (
            todayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isEditing={editingTaskId === task.id}
                editText={editText}
                onToggle={() => handleToggleNormal(task)}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={() => setEditingTaskId(null)}
                onEditChange={(e) => setEditText(e.target.value)}
                onEditKeyDown={handleKeyPressEdit}
                onDelete={() => handleDeleteTask(task)}
              />
            ))
          )}

          {activeSection === 'today' ? (
            <div className="flex items-center gap-3 py-3 px-4 bg-white border-2 border-amber-300 rounded-2xl shadow-sm min-h-[52px]">
              <div className="w-6 h-6 rounded-full border-2 border-amber-200 shrink-0 bg-amber-50 flex items-center justify-center">
                <Plus className="w-3 h-3 text-amber-400" />
              </div>
              <input
                ref={addInputRef}
                type="text"
                value={newText}
                placeholder="Ketik dan tekan enter..."
                onChange={(e) => setNewText(e.target.value)}
                onBlur={() => handleSaveNew('today')}
                onKeyDown={(e) => handleKeyPressNew(e, 'today')}
                className="flex-1 bg-transparent text-sm sm:text-base font-medium text-neutral-800 focus:outline-none placeholder-neutral-400"
              />
            </div>
          ) : (
            <button
              onClick={() => handleStartAdd('today')}
              className="flex items-center gap-3 py-4 px-4 border-2 border-dashed border-neutral-200 hover:border-amber-300 bg-transparent group rounded-2xl transition-all duration-200 cursor-pointer w-full text-left min-h-[52px]"
            >
              <div className="w-6 h-6 rounded-full border-2 border-neutral-300 group-hover:border-amber-400 transition-colors flex items-center justify-center shrink-0">
                <Plus className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500" />
              </div>
              <span className="text-sm font-semibold text-neutral-400 group-hover:text-neutral-500 transition-colors">
                Tambah tugas hari ini
              </span>
            </button>
          )}
        </div>
      </section>

      {/* ===================== THIS WEEK SECTION ===================== */}
      <section className="mb-6">
        {/* This Week Header — Subjudul besar + progress terpisah */}
        <div className="flex items-center gap-5 mb-6">
          <CircularProgress
            percentage={weeklyCompletionPercentage}
            size={56}
            strokeWidth={4}
            color="#8B5CF6"
            trackColor="#EDE9FE"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-neutral-900 tracking-tight leading-none mb-1">
              This Week
            </h2>
            <p className="text-sm text-neutral-400 font-medium">
              <span className="font-bold text-neutral-600">{weeklyCompleted}</span>
              <span className="mx-1">/</span>
              <span>{weeklyTotal}</span> centangan
            </p>
          </div>
        </div>

        {/* Header Row — hari */}
        <div className="flex items-center gap-3 mb-4 pl-4 pr-[52px]">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Tugas</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {DAYS_SHORT.map((day, i) => (
              <div
                key={i}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[10px] sm:text-xs font-black text-neutral-400 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Task Rows */}
        <div className="flex flex-col gap-2">
          {weeklyTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 px-6 text-center bg-white/50 rounded-3xl border border-dashed border-neutral-200">
              <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-4">
                <Inbox className="w-7 h-7 text-violet-300" />
              </div>
              <h4 className="text-sm font-semibold text-neutral-400 mb-1">
                Belum ada tugas mingguan
              </h4>
              <p className="text-xs text-neutral-300 max-w-[220px] leading-relaxed">
                Ketuk tombol di bawah untuk menambahkan tugas mingguan.
              </p>
            </div>
          ) : (
            weeklyTasks.map((task) => (
              <WeeklyTaskItem
                key={task.id}
                task={task}
                isEditing={editingTaskId === task.id}
                editText={editText}
                daysShort={DAYS_SHORT}
                daysLong={DAYS_LONG}
                onToggleWeek={handleToggleWeekly}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onEditChange={(e) => setEditText(e.target.value)}
                onEditKeyDown={handleKeyPressEdit}
                onDelete={() => handleDeleteTask(task)}
                editingTaskId={editingTaskId}
              />
            ))
          )}

          {/* Add Task for Weekly */}
          {activeSection === 'week' ? (
            <div className="flex items-center gap-3 py-3 px-4 bg-white border-2 border-violet-300 rounded-2xl shadow-sm min-h-[52px]">
              <div className="w-6 h-6 rounded-full border-2 border-violet-200 shrink-0 bg-violet-50 flex items-center justify-center">
                <Plus className="w-3 h-3 text-violet-400" />
              </div>
              <input
                ref={addInputRef}
                type="text"
                value={newText}
                placeholder="Ketik dan tekan enter..."
                onChange={(e) => setNewText(e.target.value)}
                onBlur={() => handleSaveNew('week')}
                onKeyDown={(e) => handleKeyPressNew(e, 'week')}
                className="flex-1 bg-transparent text-sm sm:text-base font-medium text-neutral-800 focus:outline-none placeholder-neutral-400"
              />
            </div>
          ) : (
            <button
              onClick={() => handleStartAdd('week')}
              className="flex items-center gap-3 py-4 px-4 border-2 border-dashed border-neutral-200 hover:border-violet-300 bg-transparent group rounded-2xl transition-all duration-200 cursor-pointer w-full text-left min-h-[52px]"
            >
              <div className="w-6 h-6 rounded-full border-2 border-neutral-300 group-hover:border-violet-400 transition-colors flex items-center justify-center shrink-0">
                <Plus className="w-3.5 h-3.5 text-neutral-400 group-hover:text-violet-500" />
              </div>
              <span className="text-sm font-semibold text-neutral-400 group-hover:text-neutral-500 transition-colors">
                + Tambah tugas mingguan
              </span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default TodoTable;