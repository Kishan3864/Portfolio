"use client";

// Big editorial marquee strip used as a section divider — alternating solid
// and outlined words with orange diamonds between them.
export default function SectionMarquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="relative py-8 md:py-10 border-y-[1.5px] border-[#1c1917]/20 overflow-hidden marquee-mask select-none">
      <div
        className={`marquee-track marquee-slow ${reverse ? "marquee-reverse" : ""}`}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center shrink-0 gap-6 md:gap-10 pr-6 md:pr-10"
          >
            <span
              className={`whitespace-nowrap font-[family-name:var(--font-fraunces)] text-3xl md:text-5xl font-semibold tracking-tight ${
                i % 2 === 0 ? "text-[#1c1917] italic" : "outline-text"
              }`}
            >
              {item}
            </span>
            <span
              aria-hidden
              className="w-3 h-3 rotate-45 bg-[#e4580b] border-[1.5px] border-[#1c1917] shrink-0"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
