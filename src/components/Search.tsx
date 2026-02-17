import { useState, useEffect, useRef, useCallback } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import './Search.css'

interface SearchResult {
  file: string
  title: string
  snippet: string
}

interface SearchProps {
  onSelect: (file: string) => void
}

export default function SearchBar({ onSelect }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const [docs, setDocs] = useState<{ file: string; title: string; content: string }[]>([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // 加载所有文档内容用于搜索
  useEffect(() => {
    fetch('/docs/content.md')
      .then((r) => r.text())
      .then(async (text) => {
        const files: { file: string; label: string }[] = []
        for (const line of text.split('\n')) {
          const m = line.trim().match(/^- \[(.+?)]\((.+?)\)/)
          if (m) files.push({ label: m[1], file: m[2] })
        }
        const loaded = await Promise.all(
          files.map(async (f) => {
            try {
              const r = await fetch(`/docs/${f.file}`)
              const content = await r.text()
              const titleMatch = content.match(/^# (.+)/m)
              return { file: f.file, title: titleMatch?.[1] || f.label, content }
            } catch {
              return { file: f.file, title: f.label, content: '' }
            }
          })
        )
        setDocs(loaded)
      })
  }, [])

  // 搜索逻辑
  const doSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([])
        return
      }
      const lower = q.toLowerCase()
      const matched: SearchResult[] = []
      for (const doc of docs) {
        const inTitle = doc.title.toLowerCase().includes(lower)
        const contentLower = doc.content.toLowerCase()
        const idx = contentLower.indexOf(lower)
        if (!inTitle && idx === -1) continue

        let snippet = ''
        if (idx !== -1) {
          const start = Math.max(0, idx - 30)
          const end = Math.min(doc.content.length, idx + q.length + 60)
          snippet = (start > 0 ? '...' : '') + doc.content.slice(start, end).replace(/\n/g, ' ') + (end < doc.content.length ? '...' : '')
        } else {
          snippet = doc.content.slice(0, 80).replace(/\n/g, ' ') + '...'
        }
        matched.push({ file: doc.file, title: doc.title, snippet })
        if (matched.length >= 12) break
      }
      setResults(matched)
    },
    [docs]
  )

  useEffect(() => {
    doSearch(query)
    setActiveIdx(-1)
  }, [query, doSearch])

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // 快捷键 Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIdx >= 0 && results[activeIdx]) {
      onSelect(results[activeIdx].file)
      setOpen(false)
      setQuery('')
    }
  }

  const handleSelect = (file: string) => {
    onSelect(file)
    setOpen(false)
    setQuery('')
  }

  // 高亮匹配文字
  const highlight = (text: string) => {
    if (!query.trim()) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark>{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className={`search-bar${open && query ? ' active' : ''}`}>
        <SearchIcon size={15} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="搜索文档... ⌘K"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => { if (query) setOpen(true) }}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }}>
            <X size={14} />
          </button>
        )}
      </div>
      {open && query.trim() && (
        <div className="search-dropdown">
          {results.length === 0 ? (
            <div className="search-empty">没有找到相关内容</div>
          ) : (
            results.map((r, i) => (
              <div
                key={r.file}
                className={`search-result${i === activeIdx ? ' active' : ''}`}
                onClick={() => handleSelect(r.file)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <div className="search-result-title">{highlight(r.title)}</div>
                <div className="search-result-snippet">{highlight(r.snippet)}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
