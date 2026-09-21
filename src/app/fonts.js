// Shared font instances for the site's redesigned "poster / editorial" look.
// Anton -> big condensed display headlines
// Space Mono -> mono kicker labels / numbering (e.g. "01 — ABOUT")
// Outfit -> body copy (kept from previous design for continuity)
import { Anton, Space_Mono, Outfit } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
