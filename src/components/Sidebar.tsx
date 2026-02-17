import { useEffect, useRef } from 'react'
import './Sidebar.css'

export interface TocGroup {
  title: string
  items: { label: string; file: string }[]
}

interface SidebarProps {
  toc: TocGroup[]
  activeFile: string
  onSelect: (file: string) => void
  open: boolean
}

export default function Sidebar({ toc, activeFile, onSelect, open }: SidebarProps) {
  const asideRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  // 只在首次加载时将选中项滚动到居中位置
  useEffect(() => {
    if (!activeFile || !asideRef.current || !toc.length) return
    if (!isFirstRender.current) return
    isFirstRender.current = false
    const el = asideRef.current.querySelector('.sidebar-item.active')
    if (el) {
      el.scrollIntoView({ block: 'center' })
    }
  }, [activeFile, toc])

  return (
    <aside className={`sidebar${open ? ' open' : ''}`} ref={asideRef}>
      {toc.map((group) => (
        <div className="sidebar-group" key={group.title}>
          <div className="sidebar-group-title">{group.title}</div>
          <ul className="sidebar-list">
            {group.items.map((item) => (
              <li key={item.file}>
                <span
                  className={`sidebar-item${activeFile === item.file ? ' active' : ''}`}
                  onClick={() => onSelect(item.file)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelect(item.file)
                  }}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}
