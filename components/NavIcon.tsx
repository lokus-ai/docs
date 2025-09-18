import React from 'react'
import {
  Home,
  Rocket,
  BookOpen,
  Target,
  Globe,
  Wrench,
  Library,
  ClipboardList,
  HelpCircle,
  Settings,
  Building,
  Layers,
  RefreshCw,
  CheckSquare,
  Keyboard,
  TrendingUp,
  Edit,
  Palette,
  FileText,
  Folder,
  Search,
  Terminal,
  FileCode,
  Zap,
  Monitor,
  Users,
  Code,
  TestTube,
  Lightbulb
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<any>> = {
  // Main navigation
  'index': Home,
  'getting-started': Rocket,
  'essentials': BookOpen,
  'advanced': Target,
  'cross-platform': Globe,
  'developers': Wrench,
  'reference': Library,
  'tutorials': ClipboardList,
  'support': HelpCircle,
  'developer-setup': Settings,
  'build-system': Building,
  'platform-architecture': Layers,
  'cross-platform-migration': RefreshCw,
  'task-management': CheckSquare,
  'shortcuts': Keyboard,
  'changelog': TrendingUp,

  // Essentials
  'writing': Edit,
  'organization': Folder,
  'productivity': Zap,

  // Writing
  'editor-basics': Edit,
  'formatting': Palette,
  'markdown-support': FileText,

  // Organization
  'file-management': Folder,
  'workspace-basics': Home,
  'search-basics': Search,

  // Productivity
  'command-palette': Terminal,
  'templates-basics': FileCode,
  'shortcuts-essentials': Keyboard,

  // Advanced
  'knowledge-management': Library,
  'visual-tools': Palette,
  'customization': Settings,

  // Customization
  'templates': FileCode,
  'themes': Palette,
  'workflow-optimization': Zap,

  // Developers
  'setup': Settings,
  'architecture': Layers,
  'plugins': Code,

  // Plugin Development
  'plugin-development': Rocket,
  'api-reference': Library,
  'examples': Lightbulb,
  'testing': TestTube,

  // Reference
  'features': Zap,
  'api': Code,
  'keyboard-shortcuts': Keyboard
}

interface NavIconProps {
  name: string
  size?: number
  className?: string
}

export function NavIcon({ name, size = 16, className = "" }: NavIconProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    return null
  }

  return (
    <IconComponent 
      size={size} 
      className={`${className} text-gray-600 dark:text-gray-400`}
      strokeWidth={1.5}
    />
  )
}

export default NavIcon