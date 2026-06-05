import { useState, useEffect, useRef } from 'react';
import { useTodo } from '../context/TodoContext';
import { LogOut, RefreshCw, Download } from 'lucide-react';

const ProfileDropdown = () => {
  const { user, logout } = useTodo();
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Capture PWA installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Clickable Profile Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full overflow-hidden border border-neutral-200/80 cursor-pointer click-bounce focus:outline-none flex items-center justify-center bg-neutral-100"
      >
        {avatarError || !user.avatar ? (
          <span className="text-xs font-bold text-neutral-500 select-none">
            {getInitial(user.name)}
          </span>
        ) : (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
            onError={() => setAvatarError(true)}
          />
        )}
      </button>

      {/* Sleek Profile Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 top-11 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-neutral-100 border border-neutral-100/60 p-4 z-50 animate-fade-in flex flex-col gap-3.5 origin-top-right">
          {/* User Brief */}
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
            {avatarError || !user.avatar ? (
              <div className="w-11 h-11 rounded-full bg-accent/10 border border-neutral-100 flex items-center justify-center">
                <span className="text-sm font-bold text-accent">
                  {getInitial(user.name)}
                </span>
              </div>
            ) : (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover border border-neutral-100"
                onError={() => setAvatarError(true)}
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-neutral-800 truncate">
                {user.name}
              </h4>
              <p className="text-[10px] text-neutral-400 truncate">
                {user.email}
              </p>
            </div>
          </div>

          {/* Action List */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-600 hover:text-black hover:bg-neutral-50 transition-all text-xs font-medium cursor-pointer text-left"
            >
              <RefreshCw className="w-4 h-4 stroke-[2]" />
              <span>Switch Account</span>
            </button>

            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-accent hover:text-accent-dark hover:bg-accent-light/50 transition-all text-xs font-semibold cursor-pointer text-left animate-pulse"
              >
                <Download className="w-4 h-4 stroke-[2]" />
                <span>Install Application</span>
              </button>
            )}
          </div>

          {/* Sign Out Section */}
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-red-50/50 hover:bg-red-50 text-red-500 hover:text-red-600 transition-all text-xs font-semibold cursor-pointer text-left border border-red-100/20"
          >
            <LogOut className="w-4 h-4 stroke-[2]" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;