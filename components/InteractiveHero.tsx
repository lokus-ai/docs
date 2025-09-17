import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function InteractiveHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  
  const features = [
    {
      title: "Task Management",
      description: "Integrated kanban system with !task and @task triggers",
      icon: "📋",
      demo: "!task Create documentation → Moves to Kanban"
    },
    {
      title: "Command Palette",
      description: "Quick access to files, actions, and commands",
      icon: "⌘",
      demo: "⌘K → Search anything instantly"
    },
    {
      title: "Rich Text Editor",
      description: "TipTap-powered editor with live preview",
      icon: "✍️",
      demo: "**Bold** _italic_ `code` → Live preview"
    },
    {
      title: "Smart Shortcuts",
      description: "Native macOS shortcuts that just work",
      icon: "⌨️",
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
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Lokus
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A modern, intuitive note-taking application with powerful editing capabilities, 
            built with <span className="font-semibold text-blue-600 dark:text-blue-400">Tauri</span> and{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">React</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/getting-started"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Get Started
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="/features"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ⚡ Explore Features
            </Link>
          </div>
        </div>

        {/* Interactive feature showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature display */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              ✨ Key Features
            </h2>
            
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                  index === currentFeature
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-300 dark:border-blue-600 shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setCurrentFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {feature.description}
                    </p>
                    {index === currentFeature && (
                      <div className="bg-gray-900 dark:bg-gray-700 text-green-400 px-4 py-2 rounded-lg font-mono text-sm">
                        {feature.demo}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Demo area */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                  Lokus Editor
                </span>
              </div>
            </div>
            
            <div className="p-6 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">
                  {features[currentFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {features[currentFeature].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {features[currentFeature].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "102+", label: "Automated Tests" },
            { number: "⚡", label: "Lightning Fast" },
            { number: "🔒", label: "Secure by Design" },
            { number: "🎨", label: "Beautiful UI" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}