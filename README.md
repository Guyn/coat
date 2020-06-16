---
menu: footer
---

# Coat

Coat is a tiny css file, which you can include to make pages look nice.

Styling your markdown documentation has never been that easy. Just throw in the file and there you go.

### Installation

You can either add it in your `html > head` as

```html
<link
	rel="stylesheet"
	type="text/css"
	href="https://coat.guyn.nl/theme/coat.css"
/>
```

or import it directly in your stylesheet;

```css
@import "https://coat.guyn.nl/theme/coat.css";
```

### Extended version

The default version of every theme includes the basic styling for a markdown page directly in the body. If you want to use headers, footers, sidebar and footnote (like [https://dokkie.dev](dokkie) uses), you can add `-ext` to every theme like `https://coat.guyn.nl/theme/coat-ext.css`.
