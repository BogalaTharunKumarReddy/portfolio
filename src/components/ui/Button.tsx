import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles'

interface ButtonVisualProps {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVisualProps {}

export function Button({
  variant,
  size,
  leadingIcon,
  trailingIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...rest}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  )
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ButtonVisualProps {
  href: string
  /** Open in a new tab with safe `rel` attributes. */
  external?: boolean
}

export function ButtonLink({
  variant,
  size,
  leadingIcon,
  trailingIcon,
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={buttonStyles({ variant, size, className })}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
