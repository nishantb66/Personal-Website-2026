# Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. **Content Ready**
- ✅ Footer text sanitized (removed "Built with Next.js & Framer Motion")
- ✅ All sections populated with real content
- ⚠️ **ACTION REQUIRED**: Add your actual resume PDF to `public/resume/resume.pdf`
- ⚠️ **ACTION REQUIRED**: Update project links in `/src/lib/constants.ts` (currently pointing to GitHub)

### 2. **Configuration Files**
- ✅ `next.config.ts` - Ready for production
- ✅ `package.json` - All scripts configured
- ✅ `.gitignore` - Properly configured

### 3. **SEO & Metadata**
- ✅ Meta tags configured in `layout.tsx`
- ✅ Title: "Nishant Baruah — Backend Developer"
- ✅ Description added
- ✅ Keywords included

### 4. **Performance**
- ✅ Using Next.js 16.1.1 (latest)
- ✅ Framer Motion for smooth animations
- ✅ Tailwind CSS v4 for optimal styling
- ✅ Mobile responsive design

### 5. **Links & Navigation**
- ✅ All internal navigation working
- ✅ Social links configured:
  - LinkedIn: https://www.linkedin.com/in/nishantbaru/
  - GitHub: https://github.com/nishantb66
  - Email: mailto:nishantbaruah3@gmail.com
- ⚠️ **VERIFY**: Resume download link (requires actual PDF)

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### Step 3: Environment Variables (if needed)
- No environment variables required for current setup

### Step 4: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## ⚠️ BEFORE DEPLOYMENT - ACTION ITEMS

### **CRITICAL:**
1. **Add Resume PDF**
   - Place your actual resume at: `public/resume/resume.pdf`
   - Current file is just a placeholder

2. **Update Project Links**
   - Edit `/src/lib/constants.ts`
   - Replace GitHub links with actual project URLs:
   ```typescript
   {
     title: "NLP Chatbot",
     // ...
     link: "YOUR_PROJECT_LINK_HERE",
   }
   ```

3. **Test Resume Download**
   - After adding resume, test the download button works

### **RECOMMENDED:**
1. **Remove Placeholder Images**
   - Current project images are AI-generated
   - Replace with actual project screenshots at:
     - `public/projects/chatbot.jpg`
     - `public/projects/accident-analysis.jpg`
   - OR remove images from projects section (already done)

2. **Test All Links**
   - Verify all social media links
   - Test email mailto link
   - Check all internal navigation

3. **Build Test**
   ```bash
   npm run build
   npm run start
   ```
   - Verify no build errors
   - Test site at http://localhost:3000

---

## 📋 Vercel Build Configuration

Vercel will automatically:
- Detect framework: **Next.js**
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

No additional configuration needed!

---

## 🔍 Post-Deployment Checks

After deployment:
1. ✅ Check all pages load correctly
2. ✅ Test mobile responsiveness
3. ✅ Verify theme toggle (dark/light) works
4. ✅ Test all navigation links
5. ✅ Check custom cursor on desktop
6. ✅ Test project card links
7. ✅ Verify social media links
8. ✅ Test resume download
9. ✅ Check SEO meta tags (View Page Source)
10. ✅ Test animations and scroll effects

---

## 🛠️ Optional Enhancements

1. **Analytics**
   - Add Google Analytics or Vercel Analytics
   - Track visitor engagement

2. **Performance**
   - Enable Vercel Speed Insights
   - Monitor Core Web Vitals

3. **Security**
   - Add security headers in `next.config.ts`
   - Enable HTTPS (automatic on Vercel)

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify no TypeScript errors
3. Check console for JavaScript errors
4. Review Vercel documentation: https://vercel.com/docs

---

**Your portfolio is ready for deployment!** 🎉

Just complete the action items above and you're good to go!
