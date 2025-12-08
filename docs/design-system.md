# Design System: BillPing

## 1. Aesthetic Direction: "Neo-Brutalist Soft"

A distinctive, high-impact design that avoids generic SaaS aesthetics. It combines the raw, structural elements of brutalism with modern, accessible touches.

- **Keywords**: Bold, High Contrast, Structural, Playful, Raw.
- **Inspiration**: Gumroad, Figma's early designs, Linear (but more aggressive).

## 2. Color Palette

### Primary

- **Void Black**: `#0f0f0f` (Backgrounds, Text)
- **Paper White**: `#ffffff` (Cards, Containers)

### Accents (High Saturation)

- **Hyper Blue**: `#2563eb` (Primary Actions)
- **Acid Green**: `#a3e635` (Success, Positive Trends)
- **Hot Pink**: `#ec4899` (Alerts, Due Dates)
- **Warning Yellow**: `#facc15` (Caution)

### Neutrals

- **Concrete Grey**: `#f3f4f6` (Backgrounds)
- **Steel**: `#9ca3af` (Borders, Secondary Text)

## 3. Typography

### Headings

- **Font**: `Space Grotesk` or `Syne`
- **Style**: Bold (700), Tight tracking (-0.02em), Uppercase for labels.

### Body

- **Font**: `DM Sans` or `Outfit`
- **Style**: Clean, legible, generous line height (1.6).

### Monospace (Data)

- **Font**: `JetBrains Mono` or `Space Mono`
- **Usage**: Prices, Dates, IDs.

## 4. UI Components

### Containers & Cards

- **Borders**: Thick, defined borders (2px solid black).
- **Shadows**: Hard shadows (no blur), offset by 4px (e.g., `box-shadow: 4px 4px 0px #000`).
- **Corners**: Slightly rounded (4px-8px) or sharp (0px) depending on element.

### Buttons

- **Primary**: Solid black background, white text, hard shadow on hover.
- **Secondary**: White background, black border, black text.
- **Interaction**: Transform translate on click (press effect).

### Visuals

- **Icons**: Thick stroke icons (Lucide or Phosphor Bold).
- **Patterns**: Dot grids, diagonal stripes for empty states.

## 5. Responsive Design

- **Mobile First**: Stacked layouts, large touch targets.
- **Desktop**: Asymmetrical grid layouts, sticky sidebars.
