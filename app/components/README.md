# Hero Component — Design Notes

## Layout & Spacing

The section uses `pt-20 sm:pt-16` combined with the Container's inner `pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-20` padding. This combination clears the fixed nav (`h-16` = 64 px) with generous breathing room at every breakpoint, matching the spacing visible on the production site.

The grid is `lg:grid-cols-12` — text occupies 7 columns (`lg:col-span-7`) and the phone occupies 5 columns (`lg:col-span-5`) on desktop. On mobile the columns stack vertically.

## iPhone Mockup

**Sizes:** `200px → 230px → 260px → 290px` across `base / sm / lg / xl` breakpoints.

**Image source:** `iphone-16-light-hd.png` and `iphone-16-dark-hd.png` — both are 4× Lanczos-upscaled versions of the original 377 × 785 px mockups, with unsharp-mask sharpening applied to RGB channels only (alpha channel left untouched to preserve the transparent rounded-corner edge). Final size: 1508 × 3140 px. This covers crisp renders up to 3× DPR at every breakpoint.

**Image quality:** `quality={100}` is set on both `<Image>` components. Next.js 16 only allows `quality=75` by default — `qualities: [75, 90, 100]` must be present in `next.config.ts` for this to work.

**Float animation:** `pw-float` is applied to the outer phone container `<div>`, not to the `<Image>` elements individually. This ensures the black frame overlay and the image translate together as one unit, preventing the overlay from drifting off the bezel during the animation.

## Dark Mode Frame Overlay

The `iphone-16-dark.png` source image has a cream/beige physical bezel. The overlay div (`.pw-only-dark`) paints an opaque black ring over it using `box-shadow: inset 0 0 0 7px #000`.

**Why pixel radii instead of percentage:** `border-radius` as a CSS percentage resolves the horizontal radius against the element's width and the vertical radius against its height independently. On this tall/narrow phone box the two axes differ greatly, producing a stretched elliptical corner that does not match the image's actual circular corner — leaving cream slivers exposed at the corners. Pixel radii matched to each breakpoint's rendered width fix this.

Corner radius values (13.5% of rendered width, measured from the source PNG):

| Breakpoint | Container width | `border-radius` |
|------------|----------------|-----------------|
| base       | 200 px          | 27 px           |
| sm         | 230 px          | 31 px           |
| lg         | 260 px          | 35 px           |
| xl         | 290 px          | 39 px           |

## Theme-Paired Images

Both `iphone-16-light-hd.png` and `iphone-16-dark-hd.png` are rendered in the DOM at all times. Visibility is controlled by `.pw-only-light` / `.pw-only-dark` CSS classes defined in `globals.css`, which toggle `display` based on the `.dark` class on `<html>`. Tailwind's built-in `dark:` prefix utilities are **not** used here because the site uses a custom class-based theme toggle, not the OS `prefers-color-scheme` media query.
