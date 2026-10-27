export default function Arrow({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={`arrow ${className}`} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
