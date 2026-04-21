const CONTENT = 'SPORT · RESILIENCE · INCLUSION · STORYTELLING · ADVENTURE · WILDERNESS · COMMUNITY · \u00A0';

export const MarqueeStrip = () => (
  <div className="marquee-strip" aria-hidden="true">
    <div className="marquee-track">
      <span>{CONTENT}</span>
      <span>{CONTENT}</span>
    </div>
  </div>
);
