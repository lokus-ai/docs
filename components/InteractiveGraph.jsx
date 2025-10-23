'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

export default function InteractiveGraph({ data }) {
  const graphRef = useRef()
  const [graphData, setGraphData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
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

  const getNodeColor = useCallback((node) => {
    const colors = {
      root: '#6366f1',
      section: '#8b5cf6',
      'getting-started': '#22c55e',
      features: '#3b82f6',
      developers: '#f59e0b',
      advanced: '#ef4444',
      releases: '#ec4899'
    }
    return colors[node.group] || '#6366f1'
  }, [])

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node)
    // Center on node
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000)
      graphRef.current.zoom(2, 1000)
    }
  }, [])

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null)
    if (graphRef.current) {
      graphRef.current.zoomToFit(1000, 50)
    }
  }, [])

  if (!graphData) {
    return <div className="text-center p-8">Loading graph...</div>
  }

  return (
    <div className="w-full">
      <div
        id="graph-container"
        className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
        style={{ height: dimensions.height }}
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
          linkColor={() => '#6b7280'}
          linkWidth={1.5}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          enablePanInteraction={true}
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

        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <div className="text-xs space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6366f1' }}></div>
              <span>Root</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
              <span>Getting Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
              <span>Features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
              <span>Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
              <span>Advanced</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg text-xs text-gray-600 dark:text-gray-400">
          💡 Click nodes to explore • Drag to move • Scroll to zoom
        </div>
      </div>
    </div>
  )
}
