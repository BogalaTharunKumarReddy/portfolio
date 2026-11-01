import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-blue to-brand-cyan font-semibold text-onbrand shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg hover:brightness-110',
  secondary: 'glass text-white hover:-translate-y-0.5 hover:border-brand-blue/40',
  ghost: 'text-slate-300 hover:bg-brand-blue/[0.07] hover:text-brand-blue',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
}

/** Class string shared by every button-looking element (buttons, anchors, router links). */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cn(base, variants[variant], sizes[size], className)
}
