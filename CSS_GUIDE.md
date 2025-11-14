# 🎨 CSS Classes & Design System Guide

## Available CSS Classes

### Premium Cards
```tsx
// Glossy card with backdrop blur
<div className="card">Content</div>

// Same as card
<div className="card-premium">Content</div>

// Subtle card variant
<div className="card-subtle">Content</div>
```

### Button Styles
```tsx
// Primary button (blue gradient)
<button className="btn-primary">Click Me</button>

// Secondary button (gray)
<button className="btn-secondary">Click Me</button>

// Success button (green)
<button className="btn-success">Approve</button>

// Danger button (red)
<button className="btn-danger">Delete</button>
```

### Text Effects
```tsx
// Gradient text effect
<h1 className="gradient-text">Amazing Text</h1>

// Premium shadow
<div className="shadow-premium">Elevated</div>

// Hover lift effect
<div className="hover-lift">Lifts on hover</div>
```

### Animations
```tsx
// Fade in from bottom (0.6s)
<div className="animate-fadeInUp">Fades up</div>

// Slide in from left (0.5s)
<div className="animate-slideInLeft">Slides left</div>

// Slide in from right (0.5s)
<div className="animate-slideInRight">Slides right</div>

// Shimmer effect (2s loop)
<div className="animate-shimmer">Loading</div>
```

### Staggered Animations
```tsx
{items.map((item, idx) => (
  <div 
    key={idx}
    className="animate-fadeInUp opacity-0"
    style={{ 
      animationDelay: `${idx * 0.05}s`,
      animationFillMode: "forwards"
    }}
  >
    {item}
  </div>
))}
```

---

## Color System

### Primary Colors
- **Blue**: `#3b82f6` - Main actions, links, highlights
- **Purple**: `#8b5cf6` - Secondary actions, accents
- **Pink**: `#ec4899` - Highlights, gradients

### Action Colors
- **Green**: `#10b981` - Success, positive actions
- **Red**: `#ef4444` - Danger, destructive actions
- **Yellow**: `#f59e0b` - Warnings (when needed)
- **Gray**: `#6b7280` - Neutral, secondary text

### Backgrounds
- **Light Mode**: 
  - Base: `#ffffff`
  - Gradient: `from-slate-50 via-blue-50 to-purple-50`
- **Dark Mode**: 
  - Base: `#111827`
  - Gradient: `from-gray-950 via-purple-900 to-gray-900`

---

## Shadow System

### Sizes
```css
/* Subtle */
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

/* Medium */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

/* Large */
box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);

/* Premium (with color tint) */
box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);

/* Hover/Elevated */
box-shadow: 0 30px 60px rgba(59, 130, 246, 0.3);
```

---

## Gradient Backgrounds

### Linear Gradients
```css
/* Blue to Purple */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Blue to Green */
background: linear-gradient(135deg, #667eea 0%, #10b981 100%);

/* Purple to Pink */
background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);

/* Vertical for backgrounds */
background: linear-gradient(135deg, #f0f4ff 0%, #e6f2ff 50%, #f3e8ff 100%);

/* Dark mode background */
background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #2d1b69 100%);
```

---

## Spacing Guide

### Recommended Padding
```tsx
// Containers
<div className="p-6 md:p-8 lg:p-10">Container</div>

// Cards
<div className="p-6">Card Content</div>

// Buttons
<button className="px-4 py-3 md:px-6 md:py-3">Button</button>
```

### Recommended Gaps
```tsx
// Between items
<div className="gap-4 md:gap-6 lg:gap-8">Items</div>

// Card content
<div className="space-y-4">Multiple items vertically</div>
```

---

## Responsive Breakpoints

```tsx
// Mobile first
<div className="text-lg md:text-xl lg:text-2xl">
  Responsive Text
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  Grid Items
</div>

// Flexbox
<div className="flex flex-col md:flex-row gap-4">
  Flex Items
</div>
```

---

## Form Styling

### Input Fields
```tsx
<input 
  type="text"
  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
```

### Form Container
```tsx
<form className="card space-y-4">
  {/* Form fields */}
</form>
```

---

## Image Effects

### Image with Zoom Hover
```tsx
<div className="overflow-hidden rounded-xl">
  <img 
    src="..." 
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
  />
</div>
```

### Image with Gradient Overlay
```tsx
<div className="relative overflow-hidden rounded-xl">
  <img src="..." className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
</div>
```

---

## Interactive Examples

### Hover Lift Card
```tsx
<div className="card hover-lift cursor-pointer" onClick={handleClick}>
  <h3 className="text-xl font-bold">Hover Me</h3>
  <p>This card lifts on hover</p>
</div>
```

### Button with Icon
```tsx
<button className="btn-primary flex items-center gap-2">
  <Icon className="w-5 h-5" />
  Click Me
</button>
```

### Animated List
```tsx
{items.map((item, idx) => (
  <div
    key={idx}
    className="card animate-fadeInUp opacity-0"
    style={{
      animationDelay: `${idx * 0.1}s`,
      animationFillMode: "forwards"
    }}
  >
    {item}
  </div>
))}
```

### Search Interface
```tsx
<div className="card">
  <div className="space-y-4">
    <label className="block text-sm font-semibold">Search</label>
    <div className="flex gap-3">
      <input 
        type="text"
        placeholder="Search..."
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="btn-primary">Search</button>
    </div>
  </div>
</div>
```

---

## Dark Mode Usage

```tsx
// Color adjustments for dark mode
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>

// Border colors
<div className="border border-gray-300 dark:border-gray-600">
  Content
</div>

// Background gradients
<div className="bg-gradient-to-r from-blue-50 dark:from-blue-900/20">
  Content
</div>
```

---

## Accessibility Tips

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Accessible Button
</button>
```

### Color Contrast
- Use high contrast text on backgrounds
- Avoid relying solely on color
- Test with accessibility tools

### Semantic HTML
```tsx
<section>
  <h2>Section Title</h2>
  <article>
    <h3>Article Title</h3>
  </article>
</section>
```

---

## Performance Tips

### CSS Optimization
- Use `transition` instead of multiple animations
- Prefer `transform` and `opacity` for animations
- Use `will-change` sparingly for heavy animations
- Batch similar animations

### Animation Performance
```tsx
// Good - uses transform
<div className="transform hover:scale-105 transition-transform duration-300">
  Performant
</div>

// Okay - uses opacity
<div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
  Good
</div>

// Avoid - uses width/height
<div className="w-0 hover:w-full transition-all duration-300">
  Slower
</div>
```

---

## Common Patterns

### Header Component
```tsx
<header className="sticky top-0 z-50 flex justify-between items-center h-20 px-4 md:px-8 shadow-lg" 
  style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
  {/* Logo and navigation */}
</header>
```

### Feature Cards Section
```tsx
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature, idx) => (
    <div key={idx} className="card hover-lift">
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
    </div>
  ))}
</section>
```

### Table with Premium Styling
```tsx
<div className="card overflow-x-auto">
  <table className="w-full">
    <thead className="bg-gray-50 dark:bg-gray-800/50">
      <tr>
        <th className="px-6 py-3 text-left font-semibold">Header</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
        <td className="px-6 py-3">Data</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Customization

To customize the design system, edit:
1. **Colors**: Update gradient values in `globals.css`
2. **Animations**: Modify keyframe definitions
3. **Shadows**: Adjust shadow values in class definitions
4. **Spacing**: Use Tailwind's spacing scale

---

## Resources

- **Tailwind CSS**: https://tailwindcss.com
- **CSS Gradients**: https://gradientmagic.com
- **Animation Library**: https://animista.net
- **Color Tools**: https://coolors.co

---

*Keep this guide handy for consistent design implementation across your project!*
