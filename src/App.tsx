import { useState, useEffect, useCallback, useRef } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import type { TocGroup } from './components/Sidebar'
import Content from './components/Content'
import './App.css'

function parseToc(raw: string): TocGroup[] {
  const groups: TocGroup[] = []
  let current: TocGroup | null = null

  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    const groupMatch = trimmed.match(/^## (.+)/)
    if (groupMatch) {
      current = { title: groupMatch[1], items: [] }
      groups.push(current)
      continue
    }
    const itemMatch = trimmed.match(/^- \[(.+?)]\((.+?)\)/)
    if (itemMatch && current) {
      current.items.push({ label: itemMatch[1], file: itemMatch[2] })
    }
  }
  return groups
}

const isMobile = () => window.innerWidth <= 768

export default function App() {
  const [toc, setToc] = useState<TocGroup[]>([])
  const [activeFile, setActiveFile] = useState(() => localStorage.getItem('active-file') || '')
  const [markdown, setMarkdown] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (isMobile()) return false
    const saved = localStorage.getItem('sidebar-open')
    return saved === null ? true : saved === 'true'
  })

  // 只在首次加载时恢复滚动位置，之后切换都回顶部
  const isFirstLoad = useRef(true)
  const initialScroll = useRef(0)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('scroll-position')
      if (saved) initialScroll.current = Number(saved)
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    fetch('/docs/content.md')
      .then((r) => r.text())
      .then((text) => {
        const parsed = parseToc(text)
        setToc(parsed)
        if (!activeFile) {
          const first = parsed[0]?.items[0]?.file
          if (first) setActiveFile(first)
        }
      })
  }, [activeFile])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setSidebarOpen(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (activeFile) localStorage.setItem('active-file', activeFile)
  }, [activeFile])

  // 更新页面标题
  useEffect(() => {
    if (!activeFile || !toc.length) return
    const flat = toc.flatMap((g) => g.items)
    const item = flat.find((i) => i.file === activeFile)
    document.title = item ? `MoreSkill - ${item.label}` : 'MoreSkill'
  }, [activeFile, toc])

  useEffect(() => {
    localStorage.setItem('sidebar-open', String(sidebarOpen))
  }, [sidebarOpen])

  const loadDoc = useCallback((file: string) => {
    fetch(`/docs/${file}`)
      .then((r) => r.text())
      .then(setMarkdown)
  }, [])

  useEffect(() => {
    if (activeFile) loadDoc(activeFile)
  }, [activeFile, loadDoc])

  // 保存当前滚动位置（持续更新，用于刷新恢复）
  const handleScroll = useCallback((scrollTop: number) => {
    localStorage.setItem('scroll-position', String(scrollTop))
  }, [])

  // 首次加载恢复滚动位置，之后切换回顶部
  const getRestoreScroll = useCallback(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return initialScroll.current
    }
    return 0
  }, [])

  const handleSelect = (file: string) => {
    setActiveFile(file)
    if (isMobile()) setSidebarOpen(false)
  }

  return (
    <>
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} onSearchSelect={handleSelect} />
      <div className="app-body">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        <Sidebar toc={toc} activeFile={activeFile} onSelect={handleSelect} open={sidebarOpen} />
        <Content markdown={markdown} onScroll={handleScroll} getRestoreScroll={getRestoreScroll} toc={toc} activeFile={activeFile} onNavigate={handleSelect} />
      </div>
    </>
  )
}
