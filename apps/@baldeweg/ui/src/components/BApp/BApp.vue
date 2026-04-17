<template>
  <main class="content u:block u:clear-both">
    <slot />
  </main>
</template>

<style>
@layer theme, utilities;
@import "tailwindcss/theme.css" layer(theme) prefix(u);
@import "tailwindcss/utilities.css" layer(utilities) prefix(u);

body {
  --masthead-top-height: 50px;
  --bottom-nav-height: 70px;

  color: var(--u-color-neutral-950);
  font-family: var(--u-font-sans);
  padding: 0;
  margin: 0;
  scrollbar-gutter: stable;
}

@theme inline {
  --*: initial;

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

@media (prefers-color-scheme: dark) {
  :root {
    --u-color-neutral-950: #ffffff;
    --u-color-neutral-800: #d6d6d6;
    --u-color-neutral-600: #a3a3a3;
    --u-color-neutral-400: #858585;
    --u-color-neutral-200: #525252;
    --u-color-neutral-100: #292929;

    --u-color-primary-900: #f3c2a5;
    --u-color-primary-500: #e9915d;
    --u-color-primary-100: #c1571a;

    --u-color-red-900: #f65a5a;
    --u-color-red-500: #ff7373;
    --u-color-red-100: #ed0c0c;
    --u-color-green-900: #60f060;
    --u-color-green-500: #8bff8b;
    --u-color-green-100: #008a00;
    --u-color-yellow-900: #cccc00;
    --u-color-yellow-500: #f8eb8c;
    --u-color-yellow-100: #774b06;
    --u-color-blue-900: #1793ff;
    --u-color-blue-500: #85b4ff;
    --u-color-blue-100: #0074d9;
  }
}

body {
  background: var(--u-color-neutral-100);
  padding: 0;
  margin: 0;
  accent-color: var(--u-color-primary-900);
}

::selection {
  color: var(--u-color-neutral-100);
  background: var(--u-color-primary-900);
}

::-moz-selection {
  color: var(--u-color-neutral-100);
  background: var(--u-color-primary-900);
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--u-color-neutral-600);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--u-color-neutral-800);
}

::-webkit-scrollbar-track-piece {
  border-left: 1px solid var(--u-color-neutral-200);
  background: var(--u-color-neutral-100);
}

.content {
  z-index: 1;
}

img,
picture,
audio,
video {
  max-width: 100%;
  height: auto;
}

a,
a:hover {
  color: var(--u-color-neutral-950);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--u-color-primary-900);
}

a:hover {
  text-decoration: none;
}

p {
  padding: 10px 0;
  margin: 0;
}

li li {
  margin-left: 20px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  margin-bottom: 10px;
  font-family: var(--u-font-serif);
  word-break: break-all;
}

h1 {
  font-size: 1.6rem;
}

h2 {
  font-size: 1.2rem;
}

h3 {
  font-size: 1rem;
}

table {
  width: 100%;
  border-spacing: 0;
  padding: 0;
  margin: 0;
  overflow: auto;
}

th {
  text-align: left;
}

tr {
  transition: background 0.3s ease;
}

th,
td {
  border-bottom: 1px solid var(--u-color-neutral-200);
  vertical-align: top;
  padding: 10px;
}

@media all and (min-width: 600px) {
  h1 {
    font-size: 2.1rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}
</style>
