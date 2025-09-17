import { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
  className?: string
}

const calloutStyles = {
  info: {
    container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100',
    content: 'text-blue-800 dark:text-blue-200'
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-100',
    content: 'text-yellow-800 dark:text-yellow-200'
  },
  error: {
    container: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-100',
    content: 'text-red-800 dark:text-red-200'
  },
  success: {
    container: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-100',
    content: 'text-green-800 dark:text-green-200'
  },
  tip: {
    container: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
    title: 'text-purple-900 dark:text-purple-100',
    content: 'text-purple-800 dark:text-purple-200'
  }
}

const defaultTitles = {
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
  success: 'Success',
  tip: 'Tip'
}

const icons = {
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  tip: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
}

export default function Callout({ type = 'info', title, children, className = "" }: CalloutProps) {
  const styles = calloutStyles[type]
  const displayTitle = title || defaultTitles[type]

  return (
    <div className={`
      relative rounded-xl border-l-4 p-6 my-6
      backdrop-blur-sm shadow-lg
      ${styles.container}
      ${className}
    `}>
      {/* Gradient background overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
      
      <div className="relative">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 ${styles.icon}`}>
            {icons[type]}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold mb-2 ${styles.title}`}>
              {displayTitle}
            </h4>
            <div className={`${styles.content} prose prose-sm dark:prose-invert max-w-none`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Convenience components for each type
export const InfoCallout = ({ children, title, className }: Omit<CalloutProps, 'type'>) => (
  <Callout type="info" title={title} className={className}>{children}</Callout>
)

export const WarningCallout = ({ children, title, className }: Omit<CalloutProps, 'type'>) => (
  <Callout type="warning" title={title} className={className}>{children}</Callout>
)

export const ErrorCallout = ({ children, title, className }: Omit<CalloutProps, 'type'>) => (
  <Callout type="error" title={title} className={className}>{children}</Callout>
)

export const SuccessCallout = ({ children, title, className }: Omit<CalloutProps, 'type'>) => (
  <Callout type="success" title={title} className={className}>{children}</Callout>
)

export const TipCallout = ({ children, title, className }: Omit<CalloutProps, 'type'>) => (
  <Callout type="tip" title={title} className={className}>{children}</Callout>
)