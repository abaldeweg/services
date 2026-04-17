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
  --spacing-xl: 20px;
  --spacing-2xl: 40px;

  --text-xs: 0.8rem;
  --text-s: 0.9rem;
  --text-m: 1rem;
  --text-l: 1.3rem;
  --text-xl: 1.6rem;

  --font-weight-normal: 500;
  --font-weight-bold: 900;

  --radius-xs: 2px;
  --radius-s: 4px;
  --radius-m: 6px;
  --radius-l: 8px;
  --radius-xl: 10px;
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

All Tailwind utility classes are prefixed with `u:`.

### Sizes

- Colors: `neutral` with the shades `950`, `800`, `600`, `400`, `200`, `100` and `primary`, `red`, `green`, `yellow`, `blue`, with the shades `900`, `500` and `100`
- Fonts: `sans`, `serif`, `mono`
- Font Weight: `normal`, `bold`
- Spacing: `none`, `s`, `m`, `l`, `xl`, `2xl`
- Radius: `xs`, `s`, `m`, `l`, `xl`, `full`
- Text: `xs`, `s`, `m`, `l`, `xl`
- Shadow: `s`, `m`, `l`
- Inset Shadow: `xs`, `s`, `m`
- Drop Shadow: `xs`, `s`, `m`, `l`, `xl`
- Text Shadow: `s`, `m`, `l`
