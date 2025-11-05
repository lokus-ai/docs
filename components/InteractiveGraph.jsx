'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

export default function InteractiveGraph({ data }) {
  const graphRef = useRef()
  const [graphData, setGraphData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Update dimensions on mount and resize
    const updateDimensions = () => {
      const container = document.getElementById('graph-container')
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: Math.max(600, window.innerHeight * 0.7)
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (data) {
      setGraphData(data)
    } else {
      // Generate sample documentation graph
      const nodes = [
        // Core sections
        { id: 'lokus', name: 'Lokus', group: 'root', size: 20 },
        { id: 'getting-started', name: 'Getting Started', group: 'section', size: 15 },
        { id: 'features', name: 'Features', group: 'section', size: 15 },
        { id: 'developers', name: 'Developers', group: 'section', size: 15 },
        { id: 'advanced', name: 'Advanced', group: 'section', size: 15 },
        { id: 'releases', name: 'Releases', group: 'section', size: 15 },

        // Getting Started
        { id: 'installation', name: 'Installation', group: 'getting-started', size: 10 },
        { id: 'quick-start', name: 'Quick Start', group: 'getting-started', size: 10 },
        { id: 'workspace-setup', name: 'Workspace Setup', group: 'getting-started', size: 10 },

        // Features
        { id: 'editor', name: 'Editor', group: 'features', size: 12 },
        { id: 'wiki-links', name: 'Wiki Links', group: 'features', size: 10 },
        { id: 'graph', name: 'Graph', group: 'features', size: 12 },
        { id: 'bases', name: 'Bases', group: 'features', size: 12 },
        { id: 'canvas', name: 'Canvas', group: 'features', size: 10 },
        { id: 'search', name: 'Search', group: 'features', size: 10 },
        { id: 'tasks', name: 'Tasks', group: 'features', size: 10 },
        { id: 'templates', name: 'Templates', group: 'features', size: 10 },
        { id: 'themes', name: 'Themes', group: 'features', size: 10 },
        { id: 'gmail', name: 'Gmail', group: 'features', size: 10 },

        // Developers
        { id: 'dev-setup', name: 'Dev Setup', group: 'developers', size: 10 },
        { id: 'plugins', name: 'Plugins', group: 'developers', size: 12 },
        { id: 'mcp', name: 'MCP Server', group: 'developers', size: 12 },
        { id: 'api', name: 'API', group: 'developers', size: 10 },

        // Advanced
        { id: 'performance', name: 'Performance', group: 'advanced', size: 10 },
        { id: 'security', name: 'Security', group: 'advanced', size: 10 },
        { id: 'customization', name: 'Customization', group: 'advanced', size: 10 },
      ]

      const links = [
        // Root connections
        { source: 'lokus', target: 'getting-started' },
        { source: 'lokus', target: 'features' },
        { source: 'lokus', target: 'developers' },
        { source: 'lokus', target: 'advanced' },
        { source: 'lokus', target: 'releases' },

        // Getting Started
        { source: 'getting-started', target: 'installation' },
        { source: 'getting-started', target: 'quick-start' },
        { source: 'getting-started', target: 'workspace-setup' },
        { source: 'installation', target: 'quick-start' },
        { source: 'quick-start', target: 'workspace-setup' },

        // Features
        { source: 'features', target: 'editor' },
        { source: 'features', target: 'wiki-links' },
        { source: 'features', target: 'graph' },
        { source: 'features', target: 'bases' },
        { source: 'features', target: 'canvas' },
        { source: 'features', target: 'search' },
        { source: 'features', target: 'tasks' },
        { source: 'features', target: 'templates' },
        { source: 'features', target: 'themes' },
        { source: 'features', target: 'gmail' },

        // Feature relationships
        { source: 'editor', target: 'wiki-links' },
        { source: 'editor', target: 'templates' },
        { source: 'wiki-links', target: 'graph' },
        { source: 'bases', target: 'search' },
        { source: 'tasks', target: 'canvas' },
        { source: 'gmail', target: 'security' },

        // Developers
        { source: 'developers', target: 'dev-setup' },
        { source: 'developers', target: 'plugins' },
        { source: 'developers', target: 'mcp' },
        { source: 'developers', target: 'api' },
        { source: 'plugins', target: 'mcp' },
        { source: 'plugins', target: 'api' },

        // Advanced
        { source: 'advanced', target: 'performance' },
        { source: 'advanced', target: 'security' },
        { source: 'advanced', target: 'customization' },
        { source: 'performance', target: 'search' },
        { source: 'customization', target: 'themes' },
      ]

      setGraphData({ nodes, links })
    }
  }, [data])

  // Lokus-style color scheme (One Dark Pro inspired)
  const getNodeColor = useCallback((node) => {
    // Highlight selected/hovered nodes
    if (selectedNode?.id === node.id) {
      return '#61afef' // One Dark Pro accent (blue)
    }

    const colors = {
      root: '#61afef',        // Accent blue (One Dark Pro)
      section: '#c678dd',     // Purple
      'getting-started': '#98c379', // Green
      features: '#61afef',    // Blue
      developers: '#e5c07b',  // Yellow
      advanced: '#e06c75',    // Red
      releases: '#c678dd'     // Purple
    }
    return colors[node.group] || '#61afef'
  }, [selectedNode])

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node)

    // Navigate to the page for this node
    const pageMap = {
      'lokus': '/',
      'getting-started': '/getting-started',
      'features': '/features',
      'developers': '/developers',
      'advanced': '/advanced',
      'releases': '/releases',
      'installation': '/getting-started/installation',
      'quick-start': '/getting-started/quick-start',
      'workspace-setup': '/getting-started/workspace',
      'editor': '/features/editor',
      'wiki-links': '/features/wiki-links',
      'graph': '/features/graph',
      'bases': '/features/bases/overview',
      'canvas': '/features/canvas',
      'search': '/features/search',
      'tasks': '/features/tasks',
      'templates': '/features/templates',
      'themes': '/features/themes',
      'gmail': '/features/gmail',
      'dev-setup': '/developers/setup',
      'plugins': '/developers/plugins',
      'mcp': '/developers/mcp',
      'api': '/reference/api-overview',
      'performance': '/advanced/performance',
      'security': '/advanced/security',
      'customization': '/advanced/customization'
    }

    const targetPage = pageMap[node.id]
    if (targetPage) {
      window.location.href = targetPage
    }
  }, [])

  const handleNodeHover = useCallback((node) => {
    setHoveredNode(node)
  }, [])

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // Custom node rendering with Lokus-style glow effects
  const renderNode = useCallback((node, ctx, globalScale) => {
    const size = (node.size || 5) * 0.8
    const color = getNodeColor(node)
    const isSelected = selectedNode?.id === node.id
    const isHovered = hoveredNode?.id === node.id

    // Draw glow effect for selected/hovered nodes
    if (isSelected || isHovered) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, size * 2.5, 0, 2 * Math.PI, false)
      ctx.fillStyle = color + '30' // 30 = ~19% opacity
      ctx.fill()
    }

    // Draw main node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()

    // Draw border for selected nodes
    if (isSelected) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw label for selected/hovered nodes or larger nodes
    if (isSelected || isHovered || size > 8) {
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const opacity = isSelected || isHovered ? 1.0 : 0.8
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.font = `${Math.max(10, size / 2)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`
      ctx.fillText(node.name || node.id, node.x, node.y + size + 15)
    }
  }, [selectedNode, hoveredNode, getNodeColor])

  // Link color with selection highlighting
  const getLinkColor = useCallback((link) => {
    const isSourceSelected = selectedNode?.id === link.source?.id || selectedNode?.id === link.source
    const isTargetSelected = selectedNode?.id === link.target?.id || selectedNode?.id === link.target

    if (isSourceSelected || isTargetSelected) {
      return '#61afef80' // One Dark Pro accent with transparency
    }
    return '#ffffff40' // White with low opacity (Lokus style)
  }, [selectedNode])

  // Link width with selection highlighting
  const getLinkWidth = useCallback((link) => {
    const isSourceSelected = selectedNode?.id === link.source?.id || selectedNode?.id === link.source
    const isTargetSelected = selectedNode?.id === link.target?.id || selectedNode?.id === link.target

    return (isSourceSelected || isTargetSelected) ? 3 : 1.5
  }, [selectedNode])

  if (!isMounted || !graphData) {
    return <div className="text-center p-8">Loading graph...</div>
  }

  return (
    <div className="w-full">
      <div
        id="graph-container"
        className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        style={{
          height: dimensions.height,
          background: 'radial-gradient(circle at 50% 50%, rgba(97, 175, 239, 0.1) 0%, transparent 50%)', // Lokus-style radial gradient
          backgroundColor: '#1e1e2e' // One Dark Pro background
        }}
      >
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name"
          nodeColor={getNodeColor}
          nodeRelSize={4}
          nodeVal={(node) => node.size || 5}
          linkColor={getLinkColor}
          linkWidth={getLinkWidth}
          linkDirectionalArrowLength={6}
          linkDirectionalArrowRelPos={1}
          linkDirectionalArrowColor={getLinkColor}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.01}
          linkDirectionalParticleWidth={2}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          onBackgroundClick={handleBackgroundClick}
          cooldownTicks={300}
          warmupTicks={100}
          d3AlphaDecay={0.015}
          d3VelocityDecay={0.3}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          backgroundColor="transparent"
          nodeCanvasObject={renderNode}
        />

        {selectedNode && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{selectedNode.name}</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Category: <span className="font-medium">{selectedNode.group}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ID: <span className="font-mono text-xs">{selectedNode.id}</span>
            </p>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg">
          <div className="text-xs space-y-1.5 text-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#61afef' }}></div>
              <span>Root</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#98c379' }}></div>
              <span>Getting Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#61afef' }}></div>
              <span>Features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e5c07b' }}></div>
              <span>Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e06c75' }}></div>
              <span>Advanced</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-2 shadow-lg text-xs text-gray-300">
          Click nodes to jump to page • Drag to move • Scroll to zoom
        </div>
      </div>
    </div>
  )
}
