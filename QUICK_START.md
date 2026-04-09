# REPAIR HVAC Services - Quick Start Guide

## 🚀 How to View Your Website

### Option 1: Using Python (Recommended)
```bash
cd "/Users/lukemcgrath/Desktop/WEBSITE BUILDING - REPAIRHVAC"
python3 -m http.server 3000
```

Then open: **http://localhost:3000**

### Option 2: Direct File View
- Double-click `index.html` to open in your browser
- Note: Some features work better when served via localhost

---

## 📍 What You'll See

### The landing page includes:

1. **Header/Navigation**
   - REPAIR HVAC logo and branding
   - Main navigation menu
   - "Get Quote" call-to-action button

2. **Hero Section**
   - Professional headline: "Professional HVAC Services You Can Trust"
   - Service description
   - Dual CTA buttons (Schedule Service / Learn More)
   - Visual support element

3. **Services Section**
   - 6 comprehensive service cards:
     - Installation
     - Maintenance
     - Repairs
     - Inspections
     - Upgrades
     - 24/7 Support

4. **Why Us Section**
   - Key metrics showcasing experience
   - Trust signals

5. **Benefits Section**
   - Licensed & Insured
   - Transparent Pricing
   - Warranty Coverage

6. **Contact/CTA Section**
   - Final call-to-action
   - Phone number and contact option

7. **Footer**
   - Links and information

---

## 🎨 Brand Colors Used

- **Navy** `#1E1B4B` - Primary dark color
- **Teal** `#0D7A7A` - Primary accent (CTAs, highlights)
- **Teal Light** `#5bbaba` - Secondary highlight
- **Off-white** `#F7F7F5` - Background sections

---

## ✏️ Customization

To customize the content, open `index.html` and find:

- **Phone Number**: Search for `(555) 123-4567`
- **Email**: Search for `info@repairmvac.com`
- **Headlines**: Direct text in HTML sections
- **Service Names**: Edit in the services grid
- **Button Text**: Find `Get Quote`, `Schedule Service`, etc.

---

## 🔗 File Locations

```
WEBSITE BUILDING - REPAIRHVAC/
├── index.html                    ← Main landing page
├── PROJECT_SUMMARY.md            ← This file
├── QUICK_START.md                ← Instructions
├── serve.mjs                     ← Node server (if needed)
├── BRAND_ASSETS/
│   ├── RepAIR_Brand_Guidelines_v4.html
│   ├── REP_1_SVG_-_Repair_HVAC_Services-removebg-preview.png
│   └── Website Build Brief...pdf
└── temporary screenshots/
    └── screenshot-*.png          ← Design verification
```

---

## 🎯 Key Features

✅ **Professional Design**
- Modern layout with proper spacing
- Brand-aligned color scheme
- Responsive (works on mobile, tablet, desktop)

✅ **Optimized Performance**
- Single HTML file with embedded CSS
- Uses Tailwind CSS via CDN
- Fast loading times

✅ **User-Friendly**
- Clear call-to-action buttons
- Easy navigation
- Mobile-optimized

✅ **Brand Consistency**
- Uses exact brand colors
- Proper typography (DM Sans / DM Serif Display)
- Professional imagery placeholders

---

## 📱 Testing the Responsiveness

1. Open the page on your desktop browser
2. On desktop: Press `F12` or `Cmd+Option+U` to open developer tools
3. Click the responsive design mode button (or press `Cmd+Shift+M`)
4. Test on different device sizes:
   - iPhone (375px)
   - iPad (768px)
   - Desktop (1920px)

---

## 🚨 Troubleshooting

**Issue**: "Address already in use" when starting server
- Solution: `lsof -ti:3000 | xargs kill -9` then restart

**Issue**: Logo not showing
- Check: Logo file exists at `BRAND_ASSETS/REP_1_SVG_-_Repair_HVAC_Services-removebg-preview.png`

**Issue**: Styles not loading
- Solution: Refresh the page (Cmd+Shift+R on Mac or Ctrl+Shift+R on Windows)

**Issue**: Page looks different than expected
- Check: You're using a modern browser (Chrome, Safari, Firefox, Edge)

---

## 📧 Next Steps

1. ✅ Review the website at http://localhost:3000
2. ⏭️ Update contact information with real details
3. ⏭️ Add real images/screenshots of your HVAC work
4. ⏭️ Test on different devices and browsers
5. ⏭️ Deploy to your web host

---

**Questions?** 
Every section of the website can be easily customized by editing the `index.html` file. The code is clean, well-commented, and ready for your web developer to work with.

---

**Status**: ✅ **LIVE AT** `http://localhost:3000`
