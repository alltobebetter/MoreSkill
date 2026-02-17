import { Sun, Moon, Monitor, PanelLeftClose, PanelLeftOpen, Menu, Github } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import SearchBar from './Search'
import './Header.css'

const themeIcons = { light: Sun, dark: Moon, system: Monitor }

interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  onSearchSelect: (file: string) => void
}

export default function Header({ sidebarOpen, onToggleSidebar, onSearchSelect }: HeaderProps) {
  const { mode, cycle } = useTheme()
  const ThemeIcon = themeIcons[mode]

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} title={sidebarOpen ? '收起侧栏' : '展开侧栏'}>
          <span className="sidebar-toggle-desktop">
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </span>
          <span className="sidebar-toggle-mobile">
            <Menu size={18} />
          </span>
        </button>
        <div className="header-logo">
          More<span>Skill</span>
        </div>
      </div>
      <div className="header-center">
        <SearchBar onSelect={onSearchSelect} />
      </div>
      <nav className="header-right">
        <a className="github-link" href="https://github.com/alltobebetter/MoreSkill" target="_blank" rel="noopener noreferrer" title="GitHub">
          <Github size={17} />
          <span className="github-text">GitHub</span>
        </a>
        <button className="theme-toggle" onClick={cycle} title={`当前：${mode === 'light' ? '亮色' : mode === 'dark' ? '暗色' : '跟随系统'}`}>
          <ThemeIcon size={16} />
        </button>
      </nav>
    </header>
  )
}
