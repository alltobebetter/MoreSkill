import { useState, type ReactNode } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import './CodeBlock.css'

interface CodeBlockProps {
  children?: ReactNode
  className?: string
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lang = className?.replace('language-', '') || ''
  const code = String(children).replace(/\n$/, '')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="codeblock">
      <div className="codeblock-header">
        {lang && <span className="codeblock-lang">{lang}</span>}
        <button className="codeblock-copy" onClick={handleCopy}>
          {copied ? (
            <><Check size={14} /> 已复制</>
          ) : (
            <><Copy size={14} /> 复制</>
          )}
        </button>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={lang || 'text'}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            <code>
              {tokens.map((line, i) => (
                <span {...getLineProps({ line })} key={i} className="codeblock-line">
                  <span className="codeblock-line-no">{i + 1}</span>
                  <span className="codeblock-line-content">
                    {line.map((token, j) => (
                      <span {...getTokenProps({ token })} key={j} />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
