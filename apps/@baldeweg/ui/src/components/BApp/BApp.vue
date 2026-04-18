<template>
  <main class="z-1 clear-both block">
    <slot />
  </main>
</template>

<style>
body {
  --masthead-top-height: 50px;

  background: var(--color-neutral-100);
  accent-color: var(--color-primary-900);
  color: var(--color-neutral-950);
  font-family: var(--font-sans);
  padding: 0;
  margin: 0;
  scrollbar-gutter: stable;
}

::selection {
  color: var(--color-neutral-100);
  background: var(--color-primary-900);
}

::-moz-selection {
  color: var(--color-neutral-100);
  background: var(--color-primary-900);
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-neutral-600);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-800);
}

::-webkit-scrollbar-track-piece {
  border-left: 1px solid var(--color-neutral-200);
  background: var(--color-neutral-100);
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
  color: var(--color-neutral-950);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--color-primary-900);
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
  font-family: var(--font-serif);
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

@media all and (min-width: 600px) {
  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}
</style>
