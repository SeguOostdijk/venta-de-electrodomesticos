import { cn } from '../../../shared/lib/cn'

interface PaginationProps {
  currentPage: number      // 0-based
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={cn(
          'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
          currentPage === 0
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100'
        )}
      >
        ← Anterior
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={cn(
              'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
              i === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={cn(
          'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
          currentPage === totalPages - 1
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100'
        )}
      >
        Siguiente →
      </button>
    </div>
  )
}
