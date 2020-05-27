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
@import "https://coat.guyn.nl/theme/default.css";
```

### Settings

There are a few you things you can edit, like the colors and borders. </p>

| Variable                        | Default value                  |
| ------------------------------- | ------------------------------ |
| **Base**                        |
| `--coat-padding`                | `2rem`                         |
| `--coat-transition`             | `0.3s ease-in-out`             |
| `--coat-transition-time`        | `0.3s`                         |
| `--coat-transition-bezier`      | `ease-in-out`                  |
| `--coat-max-width`              | `960px`                        |
| **Border**                      |
| `--coat-border-radius`          | `0.25em`                       |
| `--coat-border-color`           | `var(--coat-color-foreground)` |
| `--coat-border-width`           | `1px`                          |
| **Typography**                  |
| `--coat-font-family`            | System font                    |
| `--coat-heading-step`           | `0.5`                          |
| `--coat-heading-font-family`    | `var(--coat-font-family)`      |
| `--coat-font-color`             | `var(--coat-color-foreground)` |
| **Code**                        |
| `--coat-code-font`              | `Courier new`                  |
| `--coat-code-font-color`        | `var(--coat-color-foreground)` |
| `--coat-code-background`        | `var(--coat-color-primary)`    |
| **Tables**                      |
| `--coat-table-background-color` | `transparent`                  |
| `--coat-table-border-color`     | `var(--coat-border-color`      |
| `--coat-table-border-width`     | `var(--coat-border-width`      |
