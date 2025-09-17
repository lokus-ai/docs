import { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'
import EnhancedTOC from './EnhancedTOC'

interface DocsLayoutProps {
  children: ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="max-w-none">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-8" />
      
      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
        
        {/* Table of Contents */}
        <div className="hidden xl:block w-64 flex-shrink-0">
          <EnhancedTOC />
        </div>
      </div>
    </div>
  )
}