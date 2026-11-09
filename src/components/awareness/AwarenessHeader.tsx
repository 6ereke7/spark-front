const sectionLinks = [
  { label: "Threats", href: "#threats" },
  { label: "Checklist", href: "#checklist" },
  { label: "Red flags", href: "#red-flags" },
  { label: "Recovery", href: "#recovery" },
  { label: "Myths", href: "#myths" },
  { label: "FAQ", href: "#faq" },
];

export function AwarenessHeader() {
  return (
    <header className="awareness-header">
      <div className="awareness-header__inner">
        <p className="awareness-eyebrow">Online safety basics</p>
        <h1>Stay safe online</h1>
        <p className="awareness-header__purpose">
          Simple habits that help you recognize scams, protect your accounts, and stay calm when something feels wrong.
        </p>
        <span className="awareness-badge">Free for everyone</span>
        <nav className="awareness-nav" aria-label="Awareness page sections">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
