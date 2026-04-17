import type { ReactNode } from 'react';
import { FaExclamationTriangle, FaTimes, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Evet, Sil',
  cancelText = 'İptal',
  type = 'danger'
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: <FaTrashAlt className="text-red-500 text-2xl" />,
      bg: 'bg-red-50/80 backdrop-blur-md border border-red-100',
      btn: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-soft hover:shadow-softHover border border-red-500/50'
    },
    warning: {
      icon: <FaExclamationTriangle className="text-amber-500 text-2xl" />,
      bg: 'bg-amber-50/80 backdrop-blur-md border border-amber-100',
      btn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-soft hover:shadow-softHover border border-amber-500/50'
    },
    info: {
      icon: <FaInfoCircle className="text-primary-500 text-2xl" />,
      bg: 'bg-primary-50/80 backdrop-blur-md border border-primary-100',
      btn: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-soft hover:shadow-softHover border border-primary-500/50'
    }
  };

  const config = typeConfig[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-sm glass-panel rounded-3xl p-6 shadow-2xl transform transition-all scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${config.bg} shadow-inner`}>
            {config.icon}
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">
            {message}
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold transition ${config.btn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
