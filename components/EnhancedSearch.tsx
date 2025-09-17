import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'

interface SearchResult {
  title: string
  href: string
  content: string
  section?: string
}

interface EnhancedSearchProps {
  placeholder?: string
  className?: string
}

export default function EnhancedSearch({ placeholder = "Search documentation...", className = "" }: EnhancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Sample search data - in production, this would come from an API or search index
  const searchData: SearchResult[] = [
    { title: "Getting Started", href: "/getting-started", content: "Learn how to install and set up Lokus", section: "Guide" },
    { title: "Task Management", href: "/task-management", content: "Integrated kanban system with task triggers", section: "Features" },
    { title: "Command Palette", href: "/essentials/productivity/command-palette", content: "Quick access to files and commands", section: "Features" },
    { title: "Keyboard Shortcuts", href: "/reference/keyboard-shortcuts", content: "Native macOS shortcuts and custom hotkeys", section: "Reference" },
    { title: "Rich Text Editor", href: "/essentials/writing/editor-basics", content: "TipTap-powered editor with live preview", section: "Features" },
    { title: "API Reference", href: "/reference/api", content: "Complete API documentation and examples", section: "Reference" },
    { title: "Plugin Development", href: "/developers/plugins/plugin-development", content: "Create extensions for Lokus", section: "Developers" },
  ]

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = searchData.filter(item => {
        const searchTerm = searchQuery.toLowerCase()
        return (
          item.title.toLowerCase().includes(searchTerm) ||
          item.content.toLowerCase().includes(searchTerm) ||
          item.section?.toLowerCase().includes(searchTerm)
        )
      })
      
      setResults(filtered)
      setSelectedIndex(0)
      setLoading(false)
    }, 150)
  }, [])

  useEffect(() => {
    performSearch(query)
  }, [query, performSearch])

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => searchRef.current?.focus(), 100)
      }

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setResults([])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Navigation within search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      }
      
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        router.push(results[selectedIndex].href)
        setIsOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, router])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, results])

  const handleResultClick = (result: SearchResult) => {
    router.push(result.href)
    setIsOpen(false)
    setQuery('')
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => (
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-1 py-0.5 rounded">
          {part}
        </mark>
      ) : part
    ))
  }

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors ${className}`}
      >
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-gray-500">{placeholder}</span>
        <kbd className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative min-h-screen flex items-start justify-center pt-16 px-4">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                  autoComplete="off"
                />
                {loading && (
                  <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                )}
              </div>

              {/* Search Results */}
              <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={result.href}
                        onClick={() => handleResultClick(result)}
                        className={`w-full text-left px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {highlightText(result.title, query)}
                              </h3>
                              {result.section && (
                                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                  {result.section}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {highlightText(result.content, query)}
                            </p>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                        </svg>
                        <p>No results found for "{query}"</p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p>Start typing to search documentation...</p>
                    <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                      <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">↑↓</kbd>
                      <span>Navigate</span>
                      <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">↵</kbd>
                      <span>Select</span>
                      <kbd className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Esc</kbd>
                      <span>Close</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}