import { useRouter } from 'next/router'
import Link from 'next/link'
import { Fragment } from 'react'

interface BreadcrumbItem {
  title: string
  href: string
}

interface BreadcrumbsProps {
  className?: string
}

export default function Breadcrumbs({ className = "" }: BreadcrumbsProps) {
  const router = useRouter()
  
  // Get current path and create breadcrumb items
  const pathSegments = router.asPath.split('/').filter(Boolean)
  
  // Map for better breadcrumb titles
  const titleMap: Record<string, string> = {
    'getting-started': 'Getting Started',
    'essentials': 'Essentials',
    'advanced': 'Advanced',
    'developers': 'Developers',
    'reference': 'Reference',
    'tutorials': 'Tutorials',
    'support': 'Support',
    'task-management': 'Task Management',
    'keyboard-shortcuts': 'Keyboard Shortcuts',
    'api': 'API Reference',
    'changelog': 'Changelog',
    'features': 'Features',
    'productivity': 'Productivity',
    'command-palette': 'Command Palette',
    'writing': 'Writing',
    'editor-basics': 'Editor Basics',
    'organization': 'Organization',
    'file-management': 'File Management',
    'templates-basics': 'Templates Basics',
    'customization': 'Customization',
    'templates': 'Templates',
    'plugins': 'Plugins',
    'plugin-development': 'Plugin Development',
    'rich-text-editor': 'Rich Text Editor',
    'context-menus': 'Context Menus',
    'user-experience': 'User Experience',
    'extensibility': 'Extensibility'
  }

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Home', href: '/' }
  ]

  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const title = titleMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    breadcrumbItems.push({
      title,
      href: currentPath
    })
  })

  // Don't show breadcrumbs on home page or if only one item
  if (breadcrumbItems.length <= 1 || router.pathname === '/') {
    return null
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg 
                  className="w-4 h-4 mx-2 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              )}
              
              {isLast ? (
                <span 
                  className="font-medium text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  aria-current="page"
                >
                  {item.title}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                >
                  {item.title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}