import { Bot, Database, GitBranch, Code2 } from 'lucide-react'

const tools = [
  { icon: Code2, name: 'VS Code', use: 'Where I write HTML, CSS, JavaScript and React.' },
  { icon: GitBranch, name: 'Git & GitHub', use: 'Version control and keeping my projects online.' },
  { icon: Database, name: 'MySQL', use: 'Practising tables, queries and relationships.' },
  { icon: Bot, name: 'AI assistants', use: 'Planning, building and debugging faster, then reading the code until I understand it.' },
]

export function ToolsPanel() {
  return (
    <ul className="grid gap-3">
      {tools.map(({ icon: Icon, name, use }) => (
        <li key={name} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-sm text-slate-400">{use}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
