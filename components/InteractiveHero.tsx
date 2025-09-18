import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckSquare, Search, Edit3, Keyboard } from 'lucide-react'

export default function InteractiveHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  
  const features = [
    {
      title: "Task Management",
      description: "Integrated kanban system with !task and @task triggers",
      icon: CheckSquare,
      demo: "!task Create documentation → Moves to Kanban"
    },
    {
      title: "Command Palette",
      description: "Quick access to files, actions, and commands",
      icon: Search,
      demo: "⌘K → Search anything instantly"
    },
    {
      title: "Rich Text Editor",
      description: "TipTap-powered editor with live preview",
      icon: Edit3,
      demo: "**Bold** _italic_ `code` → Live preview"
    },
    {
      title: "Smart Shortcuts",
      description: "Native macOS shortcuts that just work",
      icon: Keyboard,
      demo: "⌘C, ⌘V, ⌘A → Natural workflow"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Welcome to Lokus
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A modern, intuitive note-taking application with powerful editing capabilities, 
            built with Tauri and React
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Link 
              href="/getting-started"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="/features"
              className="inline-flex items-center gap-2 bg-transparent text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Interactive feature showcase */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Feature display */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Key Features
            </h2>
            
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    index === currentFeature
                      ? 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent size={20} className="text-gray-700 dark:text-gray-300 mt-0.5" strokeWidth={1.5} />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {feature.description}
                      </p>
                      {index === currentFeature && (
                        <div className="bg-gray-900 dark:bg-gray-700 text-gray-100 px-3 py-2 rounded font-mono text-xs">
                          {feature.demo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Demo area */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
                  Lokus Editor
                </span>
              </div>
            </div>
            
            <div className="p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                {(() => {
                  const IconComponent = features[currentFeature].icon
                  return <IconComponent size={48} className="text-gray-700 dark:text-gray-300 mb-4 mx-auto" strokeWidth={1.5} />
                })()}
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {features[currentFeature].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}