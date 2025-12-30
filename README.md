# Hexo Suprematism

A Hexo theme inspired by **Suprematism** and **Russian Constructivism**, particularly the work of **Ilia Chashnik** and **El Lissitzky**.

![Suprematism Theme Preview](screenshots/Screenshot%202025-12-29%20at%2010.22.00%20PM.png)

## Features

- **Dynamic Suprematist Background** — Randomly generated geometric compositions on every page load
- **Constructivist Typography** — Bold, minimal header design with Bebas Neue and Noto Serif SC
- **Collage Support** — Add B&W photomontage images to the background (Constructivist style)
- **Fully Configurable** — Customize colors, shapes, arcs, and collage via `_config.yml`
- **Minimal & Clean** — Single-page blog layout focused on content
- **Responsive Design** — Works on desktop and mobile
- **Sticky Header** — Hides on scroll down, reveals on scroll up

## Live Demo

[Coming soon]

## Installation

```bash
cd your-hexo-blog
git clone https://github.com/pruderior/hexo-suprematism.git themes/hexo-suprematism
```

Then update your site's `_config.yml`:

```yaml
theme: hexo-suprematism
```

## Configuration

Edit `themes/hexo-suprematism/_config.yml` to customize the theme:

### Contact

```yaml
email: your-email@example.com
```

### Shape Generation

Control the number of geometric shapes in the background:

```yaml
shapes:
  min: 12    # Minimum shapes per composition
  max: 20    # Maximum shapes per composition
```

### Color Weights

Adjust the probability of each color appearing (higher = more likely):

```yaml
colors:
  black: 45
  red: 25
  gray: 15
  tan: 8
  yellow: 4
  blue: 3
```

### Big Circle

Configure the prominent circle element:

```yaml
bigCircle:
  enabled: true
  chance: 0.7      # 70% chance to appear
  minSize: 200     # Minimum diameter (px)
  maxSize: 380     # Maximum diameter (px)
```

### Arcs

Control the arc/circle outlines:

```yaml
arcs:
  fullArcs:
    min: 1         # Minimum full arcs
    max: 2         # Maximum full arcs
  partialArcChance: 0.3   # 30% chance for partial arcs
```

### Collage Images

Add B&W photomontage images to the background:

```yaml
collage:
  enabled: true
  minImages: 2     # Minimum images to show
  maxImages: 3     # Maximum images to show
  minSize: 300     # Minimum image width (px)
  maxSize: 500     # Maximum image width (px)
  opacityMin: 0.7
  opacityMax: 0.95
```

To add collage images:
1. Place your PNG images (with transparent backgrounds) in `source/images/collage/`
2. Update the `COLLAGE_IMAGES` array in `layout/layout.ejs`

## Fonts

This theme uses:
- **Bebas Neue** — Display/header font
- **Noto Serif SC** — Chinese and title text
- **Source Serif 4** — Body text (Latin)

## Inspiration

- Ilia Chashnik — "Vertical Axes in Motion", "Red Square", Suprematist porcelain
- El Lissitzky — "Tatlin at Work", Constructivist posters
- [The Great Utopia: The Russian and Soviet Avant-Garde](https://www.goodreads.com/book/show/6177320-the-great-utopia)

## License

MIT
