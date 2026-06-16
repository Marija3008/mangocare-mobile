---
name: Calm & Clinical
colors:
  surface: '#f8f9ff'
  surface-dim: '#d8dae0'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f9'
  surface-container: '#eceef3'
  surface-container-high: '#e7e8ee'
  surface-container-highest: '#e1e2e8'
  on-surface: '#191c20'
  on-surface-variant: '#474554'
  inverse-surface: '#2e3135'
  inverse-on-surface: '#eff0f6'
  outline: '#787586'
  outline-variant: '#c8c4d6'
  surface-tint: '#5648d1'
  primary: '#5445cf'
  on-primary: '#ffffff'
  primary-container: '#6d60e9'
  on-primary-container: '#fffbff'
  inverse-primary: '#c5c0ff'
  secondary: '#5d588e'
  on-secondary: '#ffffff'
  secondary-container: '#c9c2ff'
  on-secondary-container: '#534e83'
  tertiary: '#5c5783'
  on-tertiary: '#ffffff'
  tertiary-container: '#756f9d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4dfff'
  primary-fixed-dim: '#c5c0ff'
  on-primary-fixed: '#140067'
  on-primary-fixed-variant: '#3d2bb9'
  secondary-fixed: '#e4dfff'
  secondary-fixed-dim: '#c7c0fd'
  on-secondary-fixed: '#1a1346'
  on-secondary-fixed-variant: '#454074'
  tertiary-fixed: '#e5deff'
  tertiary-fixed-dim: '#c8c1f3'
  on-tertiary-fixed: '#1b153e'
  on-tertiary-fixed-variant: '#47416c'
  background: '#f8f9ff'
  on-background: '#191c20'
  surface-variant: '#e1e2e8'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built upon the pillars of **Modern Professionalism** and **Empathetic Accessibility**. It leverages a clean, minimalist aesthetic to reduce cognitive load for patients navigating their healthcare journey. The visual language balances the clinical authority of deep indigo tones with the approachable energy of soft violet accents.

The style adopts a **Modern Corporate** approach with a refined touch of **Minimalism**. It prioritizes high legibility and clear information architecture over decorative elements. Whitespace is used intentionally to create a sense of breathing room, signaling a stress-free environment for users managing their health.

## Colors

The color palette is anchored by a deep navy and a vibrant iris purple, creating a sophisticated and trustworthy hierarchy. 

- **Primary (#7367F0):** Used for primary actions, progress indicators, and active states. It provides a modern, high-energy focal point that remains legible.
- **Secondary (#11093E):** Reserved for high-level navigation, headings, and critical text. It provides the "weight" of authority and reliability.
- **Tertiary (#3F3A64):** A softer variant of the secondary color, used for subheadings, descriptive text, and iconography.
- **Neutral (#F8F9FF):** The foundation for backgrounds and container fills. This slightly cool, off-white prevents the harshness of pure white while maintaining a sterile, professional cleanliness.

## Typography

This design system utilizes **Manrope** as the primary typeface for its exceptional balance of geometric precision and humanistic warmth. Its high x-height ensures readability across varying screen sizes, which is critical for patient accessibility.

- **Headlines:** Use Bold and ExtraBold weights to establish a clear information hierarchy.
- **Body:** Use Regular weights with generous line heights (1.6) to facilitate easy reading of medical information.
- **Labels:** Use SemiBold for uppercase or small-cap labels to differentiate metadata from body content.

## Layout & Spacing

The design system employs a **Fluid Grid** architecture built on an 8px base unit. This ensures consistency across all screen dimensions.

- **Grid:** A 12-column grid for desktop and a 4-column grid for mobile.
- **Gutters:** Standardized at 24px to provide clear separation between content blocks.
- **Margins:** Exterior page margins are set to 32px on mobile to ensure content doesn't feel cramped against the edge of the device.
- **Vertical Rhythm:** Components are spaced using multiples of 8px, typically 24px (md) between related elements and 48px (lg) between distinct sections.

## Elevation & Depth

To maintain a clean and trustworthy interface, this design system avoids heavy drop shadows. Depth is primarily conveyed through **Tonal Layers** and **Ambient Shadows**.

1.  **Base Layer:** The background uses the Neutral shade (#F8F9FF).
2.  **Surface Layer:** Cards and containers use pure White (#FFFFFF).
3.  **Elevation Shadows:** Use highly diffused, low-opacity shadows (e.g., `0 4px 20px rgba(17, 9, 62, 0.05)`). This creates a "lift" effect that feels soft rather than heavy.
4.  **Interactive States:** Hovering over a card or button should slightly increase the shadow's spread or subtly lighten the stroke to indicate interactivity without cluttering the UI.

## Shapes

The shape language is defined by a **Rounded** profile. This avoids the clinical coldness of sharp corners while maintaining a more professional appearance than fully pill-shaped "playful" designs.

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Containers:** Large cards and modal dialogs use a 1rem (16px) radius to create a soft, inviting frame for content.
- **Icons:** Should follow a similar rounding logic, using rounded end-caps and corners to harmonize with the UI components.

## Components

### Buttons
- **Primary:** Solid #7367F0 with white text. Rounded corners (8px). 
- **Secondary:** Outlined with a 1px #7367F0 stroke or a light purple tint background.
- **Tertiary:** Text-only in #11093E for less critical actions.

### Cards
- White background, 16px corner radius, and a subtle ambient shadow.
- Used for patient summaries, upcoming appointments, and health insights.

### Input Fields
- Background #FFFFFF with a light 1px stroke in #3F3A64 (at 20% opacity).
- On focus, the stroke should transition to the Primary color (#7367F0) with a 2px width or a subtle outer glow.

### Chips & Badges
- Used for appointment status (e.g., "Confirmed," "Pending") or health tags. 
- Utilize a soft background tint of the status color (e.g., light green for confirmed) with dark text.

### Lists
- Clean rows with 1px horizontal separators in a very light neutral gray. 
- Each row should have a minimum height of 56px to ensure touch-friendly targets.

### Healthcare Specific Components
- **Health Vitals Widget:** A compact card displaying metrics (Heart Rate, Sleep) using simple, thin-line sparklines in the primary color.
- **Prescription Tracker:** A checklist-style component with large, accessible checkboxes and bold labels for medication names.