import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUp, ChevronLeft, ChevronRight, Copy, Check, Pencil, FileDown } from 'lucide-react'
import type { TocGroup } from './Sidebar'
import CodeBlock from './CodeBlock'
import './Content.css'

interface ContentProps {
  markdown: string
  onScroll: (scrollTop: number) => void
  getRestoreScroll: () => number
  toc: TocGroup[]
  activeFile: string
  onNavigate: (file: string) => void
}

export default function Content({ markdown, onScroll, getRestoreScroll, toc, activeFile, onNavigate }: ContentProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(true)
  const [rendered, setRendered] = useState(markdown)
  const [showTop, setShowTop] = useState(false)
  const [copied, setCopied] = useState(false)
  const pendingScroll = useRef<number | null>(null)

  // 扁平化 toc 列表，算出前后文档
  const { prev, next } = useMemo(() => {
    const flat = toc.flatMap((g) => g.items)
    const idx = flat.findIndex((item) => item.file === activeFile)
    return {
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
    }
  }, [toc, activeFile])

  useEffect(() => {
    if (markdown === rendered) return
    setVisible(false)
    const timer = setTimeout(() => {
      const scrollTo = getRestoreScroll()
      pendingScroll.current = scrollTo
      setRendered(markdown)
    }, 150)
    return () => clearTimeout(timer)
  }, [markdown, rendered, getRestoreScroll])

  useEffect(() => {
    if (pendingScroll.current !== null) {
      const pos = pendingScroll.current
      pendingScroll.current = null
      requestAnimationFrame(() => {
        if (ref.current) ref.current.scrollTop = pos
        requestAnimationFrame(() => setVisible(true))
      })
    }
  }, [rendered])

  const handleScroll = useCallback(() => {
    if (ref.current) {
      onScroll(ref.current.scrollTop)
      setShowTop(ref.current.scrollTop > 300)
    }
  }, [onScroll])

  const scrollToTop = () => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopyMd = () => {
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEdit = () => {
    window.open(`https://github.com/alltobebetter/MoreSkill/edit/main/docs/${activeFile}`, '_blank')
  }

  const handleExportPdf = () => {
    const inner = ref.current?.querySelector('.content-inner') as HTMLElement | null
    if (!inner) return

    // 克隆内容，移除工具栏和导航
    const clone = inner.cloneNode(true) as HTMLElement
    clone.querySelector('.content-toolbar')?.remove()
    clone.querySelector('.doc-nav')?.remove()

    const title = inner.querySelector('h1')?.textContent || 'MoreSkill'

    // 收集当前页面所有 stylesheet 规则
    const styles: string[] = []
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          styles.push(rule.cssText)
        }
      } catch { /* cross-origin sheets */ }
    }

    const win = window.open('', '_blank')
    if (!win) return

    win.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${styles.join('\n')}

/* 打印专用覆盖 */
html, body {
  height: auto;
  overflow: visible;
  background: #fff;
  color: #1a1a1a;
}
.content-inner {
  opacity: 1;
  transform: none;
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 0;
}
/* 代码块强制浅色背景以便打印 */
.codeblock {
  break-inside: avoid;
}
table {
  break-inside: avoid;
}
blockquote {
  break-inside: avoid;
}
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
</head>
<body>
<div class="content">
<div class="content-inner visible">
${clone.innerHTML}
</div>
</div>
<script>
  window.onload = function() {
    setTimeout(function() { window.print(); window.close(); }, 300);
  };
<\/script>
</body>
</html>`)
    win.document.close()
  }

  if (!rendered) {
    return (
      <main className="content" ref={ref}>
        <div className="content-empty">从左侧选择一篇文档开始阅读</div>
      </main>
    )
  }

  return (
    <main className="content" ref={ref} onScroll={handleScroll}>
      <div className={`content-inner${visible ? ' visible' : ''}`}>
        <div className="content-toolbar">
          <span className="toolbar-license">CC BY-SA 4.0 · 内容可自由分享与改编</span>
          <div className="toolbar-actions">
            <button className="toolbar-btn" onClick={handleCopyMd} title="复制 Markdown">
              {copied ? <><Check size={14} /> 已复制</> : <><Copy size={14} /> 复制</>}
            </button>
            <button className="toolbar-btn" onClick={handleEdit} title="在 GitHub 上编辑">
              <Pencil size={14} /> 编辑
            </button>
            <button className="toolbar-btn" onClick={handleExportPdf} title="导出 PDF">
              <FileDown size={14} /> 导出 PDF
            </button>
          </div>
        </div>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const isBlock = className?.startsWith('language-')
              if (isBlock) {
                return <CodeBlock className={className}>{children}</CodeBlock>
              }
              return <code {...props}>{children}</code>
            },
            pre({ children }) {
              return <>{children}</>
            },
          }}
        >
          {rendered}
        </Markdown>
        <nav className="doc-nav">
          {prev ? (
            <button className="doc-nav-btn prev" onClick={() => onNavigate(prev.file)}>
              <ChevronLeft size={16} />
              <div className="doc-nav-info">
                <span className="doc-nav-hint">上一节</span>
                <span className="doc-nav-title">{prev.label}</span>
              </div>
            </button>
          ) : <div />}
          {next ? (
            <button className="doc-nav-btn next" onClick={() => onNavigate(next.file)}>
              <div className="doc-nav-info">
                <span className="doc-nav-hint">下一节</span>
                <span className="doc-nav-title">{next.label}</span>
              </div>
              <ChevronRight size={16} />
            </button>
          ) : <div />}
        </nav>
      </div>
      <button className={`back-to-top${showTop ? ' show' : ''}`} onClick={scrollToTop} title="返回顶部">
        <ArrowUp size={18} />
      </button>
    </main>
  )
}
