# UI/UX Style Guide - CRM Digest Application

## Table of Contents
1. [Overview](#overview)
2. [Visual Design System](#visual-design-system)
3. [Component Library](#component-library)
4. [Layout & Responsive Design](#layout--responsive-design)
5. [Interaction Patterns](#interaction-patterns)
6. [Accessibility Standards](#accessibility-standards)
7. [Content Guidelines](#content-guidelines)
8. [Implementation Notes](#implementation-notes)

---

## Overview

The CRM Digest application is an email-based dashboard system designed for financial advisors to view mortgage and appointment data. The design prioritizes email client compatibility, particularly Microsoft Outlook, while maintaining a clean, professional appearance.

### Technology Stack
- **Backend**: Node.js with Express framework
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Inline CSS with email-optimized HTML
- **Layout**: Table-based responsive design
- **Email Compatibility**: MSO (Microsoft Office) conditional formatting

### Design Philosophy
- **Email-First**: All components designed for email client compatibility
- **Professional**: Clean, business-appropriate aesthetic
- **Data-Dense**: Efficient information display for busy professionals
- **Accessible**: High contrast and readable typography

---

## Visual Design System

### Color Palette

#### Primary Colors
```css
/* Primary Black */
#000000 (rgb(0, 0, 0))
/* Used for: Text, buttons, active states, borders */

/* Pure White */
#FFFFFF (rgb(255, 255, 255))
/* Used for: Backgrounds, button text, card backgrounds */
```

#### Secondary Colors
```css
/* Light Gray Background */
#ECECEC (rgb(236, 236, 236))
/* Used for: Section headers, inactive elements */

/* Medium Gray */
#CCCCCC (rgb(204, 204, 204))
/* Used for: Borders, dividers */

/* Text Gray */
#333333 (rgb(51, 51, 51))
/* Used for: Primary text content */

/* Muted Text */
#666666 (rgb(102, 102, 102))
/* Used for: Secondary text, labels, timestamps */

/* Light Text */
#999999 (rgb(153, 153, 153))
/* Used for: Footer text, disclaimers */
```

#### Heatmap Colors (GitHub-style)
```css
/* No Activity */
#ECECEC (rgb(236, 236, 236))

/* Low Activity (1) */
#C6E48B (rgb(198, 228, 139))

/* Medium Activity (2) */
#7BC96F (rgb(123, 201, 111))

/* High Activity (3) */
#239A3B (rgb(35, 154, 59))

/* Very High Activity (4+) */
#196127 (rgb(25, 97, 39))
```

### Typography

#### Font Family
```css
font-family: Arial, sans-serif;
```
*Arial is used throughout for maximum email client compatibility*

#### Font Scale
```css
/* Large Headers */
font-size: 20px; /* Week titles in appointments */
font-weight: normal;

/* Section Headers */
font-size: 18px;
font-weight: bold;
color: #333333;

/* Card Titles */
font-size: 16px;
font-weight: bold;

/* Primary Text */
font-size: 14px;
font-weight: normal;

/* Secondary Text */
font-size: 12px;
font-weight: normal;

/* Small Text */
font-size: 10px;
font-weight: normal;
/* Used for: Labels, timestamps, legends */
```

#### Line Height
```css
line-height: 1.2; /* Standard across all text elements */
```

### Spacing System

#### Consistent Spacing Values
```css
/* Micro spacing */
2px  /* Gaps between heatmap cells */

/* Small spacing */
5px  /* Card internal padding, small margins */

/* Medium spacing */
10px /* Card padding, section spacing */

/* Large spacing */
15px /* Section header padding */

/* Extra large spacing */
20px /* Section margins, main container padding */
```

#### Container Widths
```css
/* Main container */
width: 1500px;
max-width: 1500px;

/* Responsive container */
width: 90%; /* For smaller screens */

/* Column widths */
width: 25%; /* 4-column mortgage layout */
width: 33%; /* 3-column appointment layout */
```

### Border Radius

```css
/* Card corners */
border-radius: 10px;

/* Button corners */
border-radius: 10px;

/* Circular elements (date badges) */
border-radius: 25px; /* Small circles */
border-radius: 100px; /* Perfect circles */

/* Small elements */
border-radius: 5px; /* Bento box internal elements */
```

### Shadows and Effects

```css
/* Borders */
border: 1px solid #cccccc; /* Standard card/container border */
border: 1px solid black; /* Calendar day separators */

/* No box shadows used (email compatibility) */
```

---

## Component Library

### 1. Card Component

The card component is the primary content container used for both mortgages and appointments.

#### Base Card Structure
```html
<div style="border: 1px solid #ccc; padding: 10px; background-color: #fff; border-radius: 10px; margin-top: 10px;">
    <!-- Card content -->
</div>
```

#### Mortgage Card Variant
```html
<!-- Date badge (left) -->
<div style="background-color: black; color: white; width: 40px; height: 35px; text-align: center; line-height: 15px; border-radius: 100px;">
    <div style="font-size: 10px;">JUL</div>
    <div style="font-size: 12px; font-weight: bold;">07</div>
</div>

<!-- Content (center) -->
<div style="font-weight: bold; font-size: 14px;">$1,200,000.00</div>
<div style="margin-top: 2px; font-size: 14px;">Member Name</div>

<!-- CRM Link (right) -->
<a href="#" style="background-color: black; color: white; text-decoration: none; padding: 5px; font-weight: bold; border-radius: 10px;">CRM</a>
```

#### Appointment Card Variant
```html
<!-- Content differences for appointments -->
<div style="font-weight: bold; font-size: 14px;">Service Name</div>
<div style="margin-top: 2px; font-size: 14px;">Member Name</div>
<div style="color: #666; margin-top: 2px; font-size: 12px;">
    Monday, 2:00 PM
</div>
```

#### Card Footer
```html
<hr style="margin: 5px 0; border: none; border-top: 1px solid #ccc;">
<div style="font-style: italic; font-size: 10px; text-align: right;">
    Updated 2 hours ago
</div>
```

### 2. Section Headers

Consistent header styling across all sections.

```html
<div style="border: 1px solid #cccccc; background-color: #ECECEC; border-radius: 10px; padding: 15px; text-align: center;">
    <div style="font-weight: bold; font-size: 18px; color: #333333; line-height: 1.2;">
        SECTION TITLE
    </div>
    <!-- Optional subtitle -->
    <div style="font-size: 12px; color: #666666; margin-top: 2px; line-height: 1.2;">
        (SUBTITLE TEXT)
    </div>
</div>
```

### 3. Bento Box Components

Statistical summary containers used in the heatmap section.

```html
<div style="border: 1px solid #cccccc; background-color: #ffffff; border-radius: 10px; padding: 10px; text-align: center; min-height: 50px;">
    <div style="font-size: 12px; color: #666666; margin-bottom: 2px; line-height: 1.2;">
        LABEL
    </div>
    <div style="font-weight: bold; font-size: 16px; color: #333333; line-height: 1.2;">
        VALUE
    </div>
</div>
```

### 4. Button Styles

#### Primary Button (CRM Links)
```html
<a href="#" style="display: inline-block; background-color: black; color: white; text-decoration: none; padding: 5px; font-weight: bold; border-radius: 10px;">
    CRM
</a>
```

#### Button States
- **Default**: Black background, white text
- **Hover**: Not implemented (email limitation)
- **Focus**: Not implemented (email limitation)

### 5. Progress Indicators

Used in appointment sections to show progress toward targets.

```html
<!-- Progress bar container -->
<div style="width: 100%; text-align: center; white-space: nowrap;">
    <!-- Individual segments -->
    <span style="display: inline-block; width: 20%; height: 6px; margin-right: 2px; border: 1px solid #000; background-color: #000; box-sizing: border-box;"></span>
    <!-- Unfilled segments -->
    <span style="display: inline-block; width: 20%; height: 6px; margin-right: 2px; border: 1px solid #000; background-color: #fff; box-sizing: border-box;"></span>
</div>
```

### 6. Calendar Components

#### Weekly Calendar Header
```html
<!-- Calendar day cell -->
<td width="50" style="width: 50px; padding: 0 5px; border-right: 1px solid black; text-align: center;">
    <div style="background-color: black; padding: 5px; border-radius: 25px;">
        <div style="color: white; font-size: 12px;">MON</div>
        <div style="color: white; font-weight: bold; font-size: 14px;">07</div>
    </div>
</td>
```

#### Date Badge (in cards)
```html
<div style="background-color: black; color: white; width: 40px; height: 35px; text-align: center; line-height: 15px; border-radius: 100px;">
    <div style="font-size: 10px;">JUL</div>
    <div style="font-size: 12px; font-weight: bold;">07</div>
</div>
```

### 7. Heatmap Visualization

#### Heatmap Cell
```html
<td width="11" height="20" bgcolor="#C6E48B" style="width: 11px; height: 20px; padding: 0; margin: 0; font-size: 1px; line-height: 1px;">
    <div style="width: 11px; height: 20px; background-color: #C6E48B; font-size: 1px; line-height: 1px;">&nbsp;</div>
</td>
```

#### Heatmap Legend
```html
<table role="presentation" cellpadding="0" cellspacing="2" border="0">
    <tr>
        <td style="font-size: 11px; color: #666666;">Less (0)</td>
        <!-- Color squares -->
        <td width="11" height="20" bgcolor="#ECECEC" style="width: 11px; height: 20px;"></td>
        <td style="font-size: 11px; color: #666666;">More (4+)</td>
    </tr>
</table>
```

---

## Layout & Responsive Design

### Grid Systems

#### 4-Column Layout (Mortgages)
```html
<tr>
    <td style="width: 25%; padding: 5px; vertical-align: top;"><!-- Column 1 --></td>
    <td style="width: 25%; padding: 5px; vertical-align: top;"><!-- Column 2 --></td>
    <td style="width: 25%; padding: 5px; vertical-align: top;"><!-- Column 3 --></td>
    <td style="width: 25%; padding: 5px; vertical-align: top;"><!-- Column 4 --></td>
</tr>
```

#### 3-Column Layout (Appointments)
```html
<tr>
    <td style="width: 33%; vertical-align: top;"><!-- Column 1 --></td>
    <td style="width: 33%; vertical-align: top;"><!-- Column 2 --></td>
    <td style="width: 33%; vertical-align: top;"><!-- Column 3 --></td>
</tr>
```

#### 7-Column Layout (Heatmap Statistics)
```html
<tr>
    <td width="14.28%" style="width: 14.28%;"><!-- Column 1 --></td>
    <!-- Repeat for 7 columns -->
</tr>
```

### Container Structure

#### Main Container
```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
        <td align="center">
            <table role="presentation" width="90%" style="width: 1500px; max-width: 1500px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333333;">
                <!-- Content -->
            </table>
        </td>
    </tr>
</table>
```

### Email Client Compatibility

#### MSO (Microsoft Outlook) Conditional Comments
```html
<!--[if mso]>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
        <td bgcolor="#ECECEC" style="padding: 15px;">
            <!-- Outlook-specific content -->
        </td>
    </tr>
</table>
<![endif]-->
```

#### VML (Vector Markup Language) for Outlook
```html
<!--[if mso]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" stroked="false" style="width:11px;height:20px;">
    <v:fill type="solid" color="#C6E48B"/>
</v:rect>
<![endif]-->
```

### Responsive Considerations

- **Table-based layouts** ensure compatibility across email clients
- **Fixed widths** with percentage fallbacks
- **Inline CSS** for maximum compatibility
- **No media queries** (limited email client support)

---

## Interaction Patterns

### Link Styling

#### CRM Links
```css
background-color: black;
color: white;
text-decoration: none;
padding: 5px;
font-weight: bold;
border-radius: 10px;
```

#### Tracking Links
```css
display: none;
visibility: hidden;
opacity: 0;
width: 0;
height: 0;
```

### State Management

#### Active States
- **Today's date**: Black background with white text in calendar
- **Filled progress segments**: Black background
- **Heatmap intensity**: Color-coded based on activity level

#### Loading States
- **Relative timestamps**: "Updated 2 hours ago", "3 days ago"
- **Data availability**: Conditional rendering with `<% if %>` statements

### User Feedback Patterns

#### Success Indicators
- **Emoji celebrations**: 🎉 when appointment targets are met
- **Progress visualization**: Filled segments show completion

#### Data States
- **Empty states**: Sections don't render if no data available
- **Conditional content**: Smart hiding of empty sections

---

## Accessibility Standards

### Color Contrast

#### High Contrast Combinations
- **Black text on white background**: Ratio 21:1 (AAA)
- **White text on black background**: Ratio 21:1 (AAA)
- **Dark gray (#333) on white**: Ratio 12.6:1 (AAA)
- **Medium gray (#666) on white**: Ratio 5.7:1 (AA)

### Typography Accessibility

#### Readable Font Sizes
- **Minimum body text**: 12px
- **Preferred body text**: 14px
- **Headers**: 16px-20px
- **Small text**: 10px (used sparingly)

#### Font Weight Hierarchy
- **Bold**: Used for emphasis and headers
- **Normal**: Standard body text
- **No light weights**: Avoided for readability

### Email Client Accessibility

#### Screen Reader Support
```html
<!-- Semantic table structure -->
<table role="presentation">
<!-- Descriptive alt text -->
<img alt="Descriptive text">
<!-- Proper heading hierarchy -->
```

#### Keyboard Navigation
- **Focusable links**: All CRM links are keyboard accessible
- **Logical tab order**: Table-based layout provides natural flow

---

## Content Guidelines

### Data Formatting

#### Currency Display
```javascript
// Format: $1,200,000.00
amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
})
```

#### Date Formatting
```javascript
// Card dates: "JUL 07"
const cardDate = formatCardDate(item.date);

// Full dates: "Monday, 2:00 PM"
new Date(item.date).toLocaleString('en-US', { 
    weekday: 'long', 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
})
```

#### Number Formatting
```javascript
// Large numbers with commas
totalAppointments.toLocaleString('en-US')
```

### Text Hierarchy

#### Headers
- **ALL CAPS**: Section headers and labels
- **Title Case**: Service names and member names
- **Sentence case**: Descriptive text

#### Content Tone
- **Professional**: Business-appropriate language
- **Concise**: Information-dense, minimal text
- **Consistent**: Standardized terminology

### Error Handling

#### Empty States
```ejs
<% if (!matured_mortgages || matured_mortgages.length === 0) return; %>
```

#### Fallback Content
- **Missing data**: Graceful degradation
- **Conditional rendering**: Sections appear only when relevant

---

## Implementation Notes

### EJS Template Patterns

#### Conditional Rendering
```ejs
<% if (condition) { %>
    <!-- Content -->
<% } %>
```

#### Loops and Data Iteration
```ejs
<% items.forEach(function(item) { %>
    <!-- Repeated content -->
<% }); %>
```

#### Include Patterns
```ejs
<%- include('./component', { data: value }) %>
```

### CSS Best Practices

#### Inline Styles
```html
<!-- All styles inline for email compatibility -->
<div style="property: value; property: value;">
```

#### Table-Based Layouts
```html
<!-- Use tables for layout structure -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
```

### Performance Considerations

#### Optimized Rendering
- **Conditional sections**: Only render when data exists
- **Efficient loops**: Minimize nested iterations
- **Cached calculations**: Reuse computed values

#### Email Size Optimization
- **Inline CSS**: Reduces external dependencies
- **Minimal JavaScript**: None used for email compatibility
- **Optimized images**: None used, text-based design

### Browser/Client Testing

#### Recommended Testing
- **Outlook Desktop**: Primary target
- **Outlook Web**: Secondary target
- **Gmail**: Web and mobile
- **Apple Mail**: Desktop and iOS
- **Thunderbird**: Alternative desktop client

#### Known Limitations
- **No hover effects**: Email client limitations
- **Limited animations**: Not supported
- **No JavaScript**: Email security restrictions
- **CSS limitations**: Inline styles only

---

## Maintenance Guidelines

### Consistency Checklist

When adding new components:
- [ ] Use established color palette
- [ ] Follow typography scale
- [ ] Apply consistent spacing
- [ ] Include MSO compatibility
- [ ] Test in multiple email clients
- [ ] Maintain table-based structure
- [ ] Use inline CSS only

### Future Improvements

#### Potential Enhancements
1. **Dark mode support**: Alternative color scheme
2. **Brand customization**: Configurable color themes
3. **Mobile optimization**: Enhanced responsive design
4. **Accessibility improvements**: ARIA labels and roles
5. **Performance optimization**: Reduced email size

#### Scalability Considerations
- **Component modularity**: Reusable template includes
- **Data-driven styling**: Dynamic color/theme selection
- **Internationalization**: Multi-language support
- **A/B testing**: Template variations

---

*This style guide serves as the definitive reference for maintaining visual and functional consistency across the CRM Digest application. Regular updates should be made as the system evolves.*
