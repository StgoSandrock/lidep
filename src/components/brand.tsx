import Link from "next/link";

export function Brand({ href = "/", compact = false }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="brand" aria-label="LIDEP inicio">
      <span className="brand-mark">L</span>
      {!compact && <span className="brand-word">LIDEP</span>}
    </Link>
  );
}
