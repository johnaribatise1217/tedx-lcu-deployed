import { spaceMono } from "../fonts";

/**
 * Scrolling ticker strip used as a section divider between the site's
 * blocks. Pass the words that should repeat, e.g. ["THE RIPPLE EFFECT", "2025"].
 */
export default function Marquee({
  items = ["THE RIPPLE EFFECT", "IDEAS WORTH SPREADING", "TEDxLEADCITYUNIVERSITY"],
  className = "",
}) {
  const content = items.join("  •  ") + "  •  ";

  return (
    <div className={`bg-black border-y-2 border-red-600 py-3 marquee ${className}`}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <span
            key={copy}
            aria-hidden={copy === 1}
            className={`${spaceMono.className} text-white text-xs sm:text-sm tracking-[0.3em] uppercase px-4`}
          >
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}
