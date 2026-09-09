type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className = "", compact = false }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`}>
      <svg aria-hidden="true" className="brand-mark-symbol" viewBox="0 0 320 334">
        <path className="brand-mark-primary" d="M0 0h114l81 81v85c-15 0-28-6-39-17l-55-55c-8-8-16-13-25-13v171H0V0Z" />
        <path className="brand-mark-accent" d="M122 169c9 0 17 5 25 13l55 55c11 11 24 15 39 15V81h79v253H204l-82-82v-83Z" />
      </svg>
      {!compact && <span className="brand-mark-name">Nimrod Digitals</span>}
    </span>
  );
}
