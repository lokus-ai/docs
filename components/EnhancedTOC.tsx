import { useState, useEffect, useRef } from 'react'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface EnhancedTOCProps {
  className?: string
}

export default function EnhancedTOC({ className = "" }: EnhancedTOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Collect all headings from the page
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .filter(heading => heading.id) // Only headings with IDs
      .map(heading => ({
        id: heading.id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      }))

    setTocItems(headings)
    setIsVisible(headings.length > 0)

    // Set up intersection observer for scroll spy
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -80% 0%', // Activate when heading is in the middle portion
        threshold: 0
      }
    )

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1: return 'ml-0'
      case 2: return 'ml-0'
      case 3: return 'ml-4'
      case 4: return 'ml-8'
      case 5: return 'ml-12'
      case 6: return 'ml-16'
      default: return 'ml-0'
    }
  }

  const getFontSizeClass = (level: number) => {
    switch (level) {
      case 1: return 'text-lg font-bold'
      case 2: return 'text-base font-semibold'
      case 3: return 'text-sm font-medium'
      case 4: return 'text-sm'
      case 5: return 'text-xs'
      case 6: return 'text-xs'
      default: return 'text-sm'
    }
  }

  if (!isVisible || tocItems.length === 0) {
    return null
  }

  return (
    <div className={`sticky top-24 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          On this page
        </h3>
        
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`
                block w-full text-left py-2 px-3 rounded-lg transition-all duration-200
                ${getIndentClass(item.level)}
                ${getFontSizeClass(item.level)}
                ${activeId === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500 pl-3'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }
              `}
            >
              {item.title}
            </button>
          ))}
        </nav>

        {/* Progress indicator */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {tocItems.findIndex(item => item.id === activeId) + 1} of {tocItems.length}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
              style={{
                width: `${((tocItems.findIndex(item => item.id === activeId) + 1) / tocItems.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Back to top
        </button>
      </div>
    </div>
  )
}