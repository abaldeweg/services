# @baldeweg/ui

UI Components

## Get Started

Install the package with the following command.

```shell
pnpm add @baldeweg/ui
```

Download the Material Icons Font: <https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300&display=swap>

Find all icons on <https://fonts.google.com/icons>.

Then you can add this to your `main.js`.

```js
import { createUi } from "@baldeweg/ui"
import "@baldeweg/ui/styles"
import "@baldeweg/ui/globals"

const ui = createUi()

app.use(ui)
```

Example Layout

```js
<BApp id="app">
    <BContainer size="m">
        <p>Content</p>
    </BContainer>
</BApp>
```

The defaults for CSS properties can be overridden.

```css
:root {
    --color-neutral-950: #292929;
    --color-neutral-800: #525252;
    --color-neutral-600: #858585;
    --color-neutral-400: #a3a3a3;
    --color-neutral-200: #d6d6d6;
    --color-neutral-100: #ffffff;

    --color-primary-900: #c1571a;
    --color-primary-500: #e9915d;
    --color-primary-100: #f3c2a5;

    --color-red-900: #ed0c0c;
    --color-red-500: #ff7373;
    --color-red-100: #f65a5a;
    --color-green-900: #008a00;
    --color-green-500: #8bff8b;
    --color-green-100: #60f060;
    --color-yellow-900: #774b06;
    --color-yellow-500: #f8eb8c;
    --color-yellow-100: #cccc00;
    --color-blue-900: #0074d9;
    --color-blue-500: #85b4ff;
    --color-blue-100: #1793ff;

    --font-sans: "Open Sans", "Liberation Sans", "Helvetica Neue", Arial;
    --font-serif: Georgia, Constantia, "DejaVu Serif", "Times New Roman";
    --font-mono: Consolas, "Liberation Mono", "Lucida Console";

    --spacing-none: 0px;
    --spacing-s: 3px;
    --spacing-m: 5px;
    --spacing-l: 10px;
    --spacing-2xl: 40px;

    --text-s: 0.8rem;
    --text-m: 1rem;
    --text-l: 1.2rem;
    --text-xl: 1.5rem;
    --text-2xl: 1.6rem;
    --text-3xl: 1.8rem;

    --font-weight-normal: 500;
    --font-weight-bold: 900;

    --radius-s: 10px;
    --radius-m: 20px;
    --radius-l: 40px;
    --radius-full: 9999px;

    --shadow-s: 0 2px 2px 1px rgb(0 0 0 / 0.3);
    --shadow-m: 0 5px 5px 2px rgb(0 0 0 / 0.3);
    --shadow-l: 0 10px 10px 4px rgb(0 0 0 / 0.3);

    --inset-shadow-xs: inset 0 1px 2px rgb(0 0 0 / 0.3);
    --inset-shadow-s: inset 0 2px 4px rgb(0 0 0 / 0.3);
    --inset-shadow-m: inset 0 4px 8px rgb(0 0 0 / 0.3);

    --drop-shadow-xs: 0 2px 2px rgb(0 0 0 / 0.5);
    --drop-shadow-s: 0 4px 4px rgb(0 0 0 / 0.5);
    --drop-shadow-m: 0 6px 6px rgb(0 0 0 / 0.5);
    --drop-shadow-l: 0 8px 8px rgb(0 0 0 / 0.5);
    --drop-shadow-xl: 0 10px 10px rgb(0 0 0 / 0.5);

    --text-shadow-s: 0px 1px 1px rgb(0 0 0 / 0.5);
    --text-shadow-m: 0px 2px 2px rgb(0 0 0 / 0.5);
    --text-shadow-l: 0px 3px 3px rgb(0 0 0 / 0.5);

    --blur-s: 5px;
    --blur-m: 10px;
    --blur-l: 20px;
}
```

It's recommended to use `<style scoped>` for component-specific styles.

## Utility Classes

Add the plugin to your Vite config:

```js
import tailwindcss from "@tailwindcss/vite"

plugins: [tailwindcss()]
```

Install [recommended extensions](https://tailwindcss.com/docs/editor-setup).

Most of the [Tailwind utility classes](https://tailwindcss.com/docs/) are available, except for break points, container queries, tracking, leading, transition, animation.

### Colors and Sizes

- Colors: `neutral` with the shades `950`, `800`, `600`, `400`, `200`, `100` and `primary`, `red`, `green`, `yellow`, `blue`, with the shades `900`, `500` and `100`
- Fonts: `sans`, `serif`, `mono`
- Font Weight: `normal`, `bold`
- Spacing: `none`, `s`, `m`, `l`, `xl`, `2xl`
- Radius: `s`, `m`, `l`, `full`
- Text: `s`, `m`, `l`, `xl`, `2xl`, `3xl`
- Shadow: `s`, `m`, `l`
- Inset Shadow: `xs`, `s`, `m`
- Drop Shadow: `xs`, `s`, `m`, `l`, `xl`
- Text Shadow: `s`, `m`, `l`

### Layout

- Display: `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`, `inline-grid`, `hidden`, `table`, `table-row`, `table-cell`, `contents`, `flow-root`, `list-item`
- Box Sizing: `box-border`, `box-content`
- Position: `static`, `relative`, `absolute`, `fixed`, `sticky`
- Inset / Position Offsets: `inset-{size}`, `inset-x-{size}`, `inset-y-{size}`, `top-{size}`, `right-{size}`, `bottom-{size}`, `left-{size}`
- Z-Index: `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`, `z-auto`
- Float: `float-left`, `float-right`, `float-none`
- Clear: `clear-left`, `clear-right`, `clear-both`, `clear-none`
- Visibility: `visible`, `invisible`, `collapse`
- Overflow: `overflow-auto`, `overflow-hidden`, `overflow-visible`, `overflow-scroll`, `overflow-x-auto`, `overflow-x-hidden`, `overflow-x-scroll`, `overflow-y-auto`, `overflow-y-hidden`, `overflow-y-scroll`
- Aspect Ratio: `aspect-auto`, `aspect-square`
- Object Fit: `object-contain`, `object-cover`, `object-fill`, `object-none`, `object-scale-down`
- Object Position: `object-center`, `object-top`, `object-right`, `object-bottom`, `object-left`, `object-right-top`, `object-right-bottom`, `object-left-top`, `object-left-bottom`

### Flexbox

- Direction: `flex-row`, `flex-row-reverse`, `flex-col`, `flex-col-reverse`
- Wrap: `flex-wrap`, `flex-wrap-reverse`, `flex-nowrap`
- Flex: `flex-1`, `flex-auto`, `flex-initial`, `flex-none`
- Grow: `grow`, `grow-0`
- Shrink: `shrink`, `shrink-0`
- Align Items: `items-start`, `items-center`, `items-end`, `items-stretch`, `items-baseline`
- Align Self: `self-auto`, `self-start`, `self-center`, `self-end`, `self-stretch`, `self-baseline`
- Align Content: `content-start`, `content-center`, `content-end`, `content-between`, `content-around`, `content-evenly`, `content-stretch`
- Justify Content: `justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`, `justify-evenly`, `justify-stretch`
- Justify Items: `justify-items-start`, `justify-items-center`, `justify-items-end`, `justify-items-stretch`
- Justify Self: `justify-self-auto`, `justify-self-start`, `justify-self-center`, `justify-self-end`, `justify-self-stretch`
- Place Content: `place-content-center`, `place-content-start`, `place-content-end`, `place-content-between`, `place-content-around`, `place-content-evenly`, `place-content-stretch`
- Place Items: `place-items-start`, `place-items-center`, `place-items-end`, `place-items-stretch`
- Place Self: `place-self-auto`, `place-self-start`, `place-self-center`, `place-self-end`, `place-self-stretch`
- Gap: `gap-{size}`, `gap-x-{size}`, `gap-y-{size}`

### Grid

- Template Columns: `grid-cols-1` `grid-cols-2` `grid-cols-3` `grid-cols-4` `grid-cols-5` `grid-cols-6` `grid-cols-7` `grid-cols-8` `grid-cols-9` `grid-cols-10` `grid-cols-11` `grid-cols-12` `grid-cols-none`
- Template Rows: `grid-rows-1` `grid-rows-2` `grid-rows-3` `grid-rows-4` `grid-rows-5` `grid-rows-6` `grid-rows-none`
- Column Span: `col-span-{1-12}`, `col-span-full`, `col-auto`, `col-start-{1-13}`, `col-end-{1-13}`
- Row Span: `row-span-{1-6}`, `row-span-full`, `row-auto`, `row-start-{1-7}`, `row-end-{1-7}`
- Auto Flow: `grid-flow-row`, `grid-flow-col`, `grid-flow-dense`, `grid-flow-row-dense`, `grid-flow-col-dense`
- Auto Cols: `auto-cols-auto`, `auto-cols-min`, `auto-cols-max`, `auto-cols-fr`
- Auto Rows: `auto-rows-auto`, `auto-rows-min`, `auto-rows-max`, `auto-rows-fr`

### Typography

- Font Family: `font-sans`, `font-serif`, `font-mono`
- Font Size: `text-{size}`
- Font Weight: `font-normal`, `font-bold`
- Font Style: `italic`, `not-italic`
- Text Align: `text-left`, `text-center`, `text-right`, `text-justify`, `text-start`, `text-end`
- Text Transform: `uppercase`, `lowercase`, `capitalize`, `normal-case`
- Text Decoration: `underline`, `overline`, `line-through`, `no-underline`
- Text Decoration Color: `decoration-{color}`
- Text Overflow: `truncate`, `text-ellipsis`, `text-clip`
- Text Wrap: `text-wrap`, `text-nowrap`, `text-balance`, `text-pretty`
- Vertical Align: `align-baseline`, `align-top`, `align-middle`, `align-bottom`, `align-text-top`, `align-text-bottom`, `align-sub`, `align-super`
- Whitespace: `whitespace-normal`, `whitespace-nowrap`, `whitespace-pre`, `whitespace-pre-line`, `whitespace-pre-wrap`, `whitespace-break-spaces`
- Word Break: `break-normal`, `break-words`, `break-all`, `break-keep`
- Line Clamp: `line-clamp-{1-6}`, `line-clamp-none`
- Smoothing: `antialiased`, `subpixel-antialiased`

### Sizing

- Width: `w-{size}`, `w-full`, `w-screen`, `w-auto`, `w-min`, `w-max`, `w-fit`
- Min / Max Width: `min-w-full`, `max-w-full`, `max-w-none`
- Height: `h-{size}`, `h-full`, `h-screen`, `h-auto`, `h-min`, `h-max`, `h-fit`
- Min / Max Height: `min-h-full`, `min-h-screen`, `max-h-full`, `max-h-screen`, `max-h-none`

### Spacing

- Padding: `p-{size}`, `px-{size}`, `py-{size}`, `pt-{size}`, `pr-{size}`, `pb-{size}`, `pl-{size}`
- Margin: `m-{size}`, `mx-{size}`, `my-{size}`, `mt-{size}`, `mr-{size}`, `mb-{size}`, `ml-{size}`, `mx-auto`, `my-auto`

### Colors

- Text Color: `text-{color}`
- Background Color: `bg-{color}`, `bg-transparent`, `bg-inherit`, `bg-current`
- Border Color: `border-{color}`
- Ring Color: `ring-{color}`
- Outline Color: `outline-{color}`
- Fill: `fill-{color}`
- Stroke: `stroke-{color}`
- Gradient From / Via / To: `from-{color}`, `via-{color}`, `to-{color}`
- Caret Color: `caret-{color}`

### Backgrounds

- Background Gradient: `bg-gradient-to-t`, `bg-gradient-to-tr`, `bg-gradient-to-r`, `bg-gradient-to-br`, `bg-gradient-to-b`, `bg-gradient-to-bl`, `bg-gradient-to-l`, `bg-gradient-to-tl`
- Background Size: `bg-auto`, `bg-cover`, `bg-contain`
- Background Position: `bg-center`, `bg-top`, `bg-right`, `bg-bottom`, `bg-left`, `bg-right-top`, `bg-right-bottom`, `bg-left-top`, `bg-left-bottom`
- Background Repeat: `bg-repeat`, `bg-no-repeat`, `bg-repeat-x`, `bg-repeat-y`

### Borders

- Border Width: `border`, `border-{number}`, `border-x`, `border-y`, `border-t`, `border-r`, `border-b`, `border-l`
- Border Style: `border-solid`, `border-dashed`, `border-dotted`, `border-double`, `border-hidden`, `border-none`
- Border Radius: `rounded-{radius}`, `rounded-t-{radius}`, `rounded-r-{radius}`, `rounded-b-{radius}`, `rounded-l-{radius}`, `rounded-tl-{radius}`, `rounded-tr-{radius}`, `rounded-br-{radius}`, `rounded-bl-{radius}`
- Outline: `outline`, `outline-none`, `outline-{number}`, `outline-dashed`, `outline-dotted`, `outline-double`
- Outline Offset: `outline-offset-{number}`
- Ring: `ring`, `ring-{number}`, `ring-inset`
- Divide: `divide-x`, `divide-y`, `divide-x-0`, `divide-y-0`, `divide-solid`, `divide-dashed`, `divide-dotted`

### Tables

- Border Collapse: `border-collapse`, `border-separate`
- Table Layout: `table-auto`, `table-fixed`
- Caption Side: `caption-top`, `caption-bottom`

### Lists

- List Style Type: `list-none`, `list-disc`, `list-decimal`
- List Style Position: `list-inside`, `list-outside`

### Effects

- Shadow: `shadow-s`, `shadow-m`, `shadow-l`, `shadow-none`
- Inset Shadow: `inset-shadow-xs`, `inset-shadow-s`, `inset-shadow-m`, `inset-shadow-none`
- Drop Shadow: `drop-shadow-xs`, `drop-shadow-s`, `drop-shadow-m`, `drop-shadow-l`, `drop-shadow-xl`, `drop-shadow-none`
- Text Shadow: `text-shadow-s`, `text-shadow-m`, `text-shadow-l`, `text-shadow-none`
- Blur: `blur-s`, `blur-m`, `blur-l`, `blur-none`
- Opacity: `opacity-0`, `opacity-5`, `opacity-10`, `opacity-15`, `opacity-20`, `opacity-25`, `opacity-30`, `opacity-35`, `opacity-40`, `opacity-45`, `opacity-50`, `opacity-55`, `opacity-60`, `opacity-65`, `opacity-70`, `opacity-75`, `opacity-80`, `opacity-85`, `opacity-90`, `opacity-95`, `opacity-100`
- Mix Blend Mode: `mix-blend-normal`, `mix-blend-multiply`, `mix-blend-screen`, `mix-blend-overlay`, `mix-blend-darken`, `mix-blend-lighten`, `mix-blend-color-dodge`, `mix-blend-color-burn`, `mix-blend-hard-light`, `mix-blend-soft-light`, `mix-blend-difference`, `mix-blend-exclusion`, `mix-blend-hue`, `mix-blend-saturation`, `mix-blend-color`, `mix-blend-luminosity`

### Interactivity

- Cursor: `cursor-auto`, `cursor-default`, `cursor-pointer`, `cursor-wait`, `cursor-text`, `cursor-move`, `cursor-help`, `cursor-not-allowed`, `cursor-none`, `cursor-grab`, `cursor-grabbing`, `cursor-zoom-in`, `cursor-zoom-out`
- Pointer Events: `pointer-events-none`, `pointer-events-auto`
- Resize: `resize`, `resize-x`, `resize-y`, `resize-none`
- Select: `select-none`, `select-text`, `select-all`, `select-auto`
- Appearance: `appearance-none`, `appearance-auto`
- Scroll Behavior: `scroll-auto`, `scroll-smooth`
- Scroll Snap Align: `snap-start`, `snap-end`, `snap-center`, `snap-align-none`
- Scroll Snap Type: `snap-none`, `snap-x`, `snap-y`, `snap-both`, `snap-mandatory`, `snap-proximity`
- Touch Action: `touch-auto`, `touch-none`, `touch-pan-x`, `touch-pan-y`
- User Select: `select-none`, `select-text`, `select-all`, `select-auto`

### Accessibility

- Screen Reader: `sr-only`, `not-sr-only`
- Forced Color Adjust: `forced-color-adjust-auto`, `forced-color-adjust-none`
