# Analytics & Performance Monitoring Setup Guide

This guide will help you set up **Microsoft Clarity**, **Google Analytics 4**, **Google Search Console**, and **Lighthouse CI** for your Lokus documentation site.

**Total Setup Time**: ~30 minutes
**Total Cost**: $0/month forever

---

## ✅ What's Already Configured

The following has been added to your codebase:

- ✅ Microsoft Clarity tracking script in `pages/_app.jsx`
- ✅ Google Analytics 4 integration via `@next/third-parties`
- ✅ Environment variables template (`.env.example`)
- ✅ Lighthouse CI GitHub Actions workflow
- ✅ Lighthouse configuration (`lighthouserc.json`)

---

## 🚀 Step 1: Microsoft Clarity Setup (5 minutes)

Microsoft Clarity provides session recordings, heatmaps, and user behavior insights - completely free with no limits!

### 1.1 Create Clarity Account

1. Go to https://clarity.microsoft.com
2. Sign in with your Microsoft or GitHub account (free)
3. Click **"Add new project"**

### 1.2 Configure Project

- **Project name**: `Lokus Docs`
- **Website URL**: `https://docs.lokus.dev`
- Click **"Add"**

### 1.3 Get Your Project ID

1. After creating the project, you'll see a setup page
2. Look for your **Project ID** (it looks like: `abcd1234efgh`)
3. Copy this ID

### 1.4 Add to Environment Variables

1. Open `.env.local` in your project root
2. Add your Clarity Project ID:

```bash
NEXT_PUBLIC_CLARITY_ID=your_clarity_project_id_here
```

### 1.5 Deploy and Verify

1. Commit and push changes to trigger Vercel deployment
2. Visit your docs site after deployment
3. Go back to Clarity dashboard
4. Data should appear within 2-3 hours
5. You'll see:
   - Session recordings
   - Heatmaps
   - User behavior insights
   - Rage clicks and dead clicks

**Clarity Dashboard**: https://clarity.microsoft.com/projects

---

## 📊 Step 2: Google Analytics 4 Setup (10 minutes)

Google Analytics provides detailed traffic analytics, user demographics, and conversion tracking.

### 2.1 Create GA4 Property

1. Go to https://analytics.google.com
2. Sign in with your Google account
3. Click **"Admin"** (gear icon in bottom left)
4. Click **"Create Property"**

### 2.2 Property Setup

- **Property name**: `Lokus Docs`
- **Reporting time zone**: Choose your timezone
- **Currency**: Choose your currency
- Click **"Next"**

### 2.3 Business Details

- **Industry category**: Choose relevant category (e.g., "Technology")
- **Business size**: Choose appropriate size
- Click **"Next"**

### 2.4 Business Objectives

- Select objectives relevant to documentation (e.g., "Examine user behavior")
- Click **"Create"**
- Accept Terms of Service

### 2.5 Set Up Data Stream

1. Select **"Web"** platform
2. **Website URL**: `https://docs.lokus.dev`
3. **Stream name**: `Lokus Docs`
4. Click **"Create stream"**

### 2.6 Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX`
3. Copy this ID

### 2.7 Add to Environment Variables

1. Open `.env.local` in your project root
2. Add your GA4 Measurement ID:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2.8 Configure Enhanced Measurement (Recommended)

1. In your data stream settings, scroll to **"Enhanced measurement"**
2. Toggle it ON (if not already)
3. This automatically tracks:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads

### 2.9 Deploy and Verify

1. Commit and push changes
2. After deployment, visit your docs site
3. Go to GA4 → **Reports** → **Realtime**
4. You should see yourself as an active user immediately
5. Full reports appear within 24 hours

**GA4 Dashboard**: https://analytics.google.com

---

## 🔍 Step 3: Google Search Console Setup (10 minutes)

Google Search Console provides real user Core Web Vitals data and SEO insights.

### 3.1 Add Property

1. Go to https://search.google.com/search-console
2. Click **"Add property"**
3. Choose **"URL prefix"**
4. Enter: `https://docs.lokus.dev`
5. Click **"Continue"**

### 3.2 Verify Ownership

You have several verification options. Choose the easiest for you:

#### Option A: HTML Tag (Easiest for Next.js)

1. Search Console will show you an HTML meta tag
2. Copy the `content` value (looks like: `google-site-verification=xxxxxxxxxxxx`)
3. Add to your `next-seo.config.js` or `theme.config.jsx`:

```js
{
  additionalMetaTags: [
    {
      name: 'google-site-verification',
      content: 'your_verification_code_here'
    }
  ]
}
```

4. Deploy the change
5. Return to Search Console and click **"Verify"**

#### Option B: DNS TXT Record

1. Copy the TXT record value from Search Console
2. Go to your domain registrar (where you manage `lokus.dev`)
3. Add a new TXT record:
   - **Name**: `@` or `docs` (depending on subdomain setup)
   - **Value**: The verification code from Search Console
   - **TTL**: 3600 (or default)
4. Wait 10-15 minutes for DNS propagation
5. Return to Search Console and click **"Verify"**

#### Option C: Upload HTML File

1. Download the HTML verification file
2. Add it to your `/public` folder
3. Deploy
4. Click **"Verify"** in Search Console

### 3.3 Wait for Data

- **Search performance data**: Appears in 24-48 hours
- **Core Web Vitals**: Requires 28 days of data
- **Index coverage**: Updates daily

### 3.4 What You'll Get

Once data is available, you'll see:

- **Performance**: Search impressions, clicks, CTR, average position
- **Core Web Vitals**: LCP, INP, CLS for real users
- **Coverage**: Which pages are indexed
- **Enhancements**: Mobile usability, breadcrumbs, etc.
- **Sitemaps**: Submit your sitemap.xml

**Search Console Dashboard**: https://search.google.com/search-console

---

## ⚡ Step 4: Lighthouse CI Setup (Already Done!)

Lighthouse CI is already configured via GitHub Actions. It will automatically:

- Run on every pull request
- Test 4 key pages (home, editor, installation, API reference)
- Generate performance, accessibility, SEO, and best practices scores
- Post results as PR comments
- Store reports for 7 days

### 4.1 How It Works

When you create a PR:

1. GitHub Actions triggers the Lighthouse workflow
2. It builds your Next.js site
3. Runs Lighthouse tests 3 times per URL (for accuracy)
4. Uploads results to temporary public storage
5. Posts summary in PR comments
6. You can view detailed reports via links

### 4.2 Viewing Results

1. Create a test PR
2. Wait for GitHub Actions to complete (~5-10 minutes)
3. Check the "Checks" tab on your PR
4. Look for "Lighthouse CI" results
5. Click "Details" to view full reports

### 4.3 Performance Budgets

The current configuration warns/fails on:

- **Performance**: Minimum score 85% (warning)
- **Accessibility**: Minimum score 90% (error)
- **Best Practices**: Minimum score 90% (warning)
- **SEO**: Minimum score 90% (warning)

You can adjust these in `lighthouserc.json`.

---

## 🎯 What Data You'll Get

### From Microsoft Clarity:

- **Session Recordings**: Watch real users navigate your docs
- **Heatmaps**: See where users click, scroll, and spend time
- **Rage Clicks**: Find broken links or frustrating UX
- **Dead Clicks**: Identify elements users think are clickable
- **User Insights**: Popular pages, devices, browsers
- **JavaScript Errors**: Track errors users encounter

**Use it to**:
- Find confusing documentation
- Optimize navigation
- Identify popular sections
- Discover UX issues

---

### From Google Analytics 4:

- **Traffic Sources**: Where users come from (Google, GitHub, direct, social)
- **Popular Pages**: Most visited documentation pages
- **User Demographics**: Country, city, language
- **Technology**: Browser, device, screen size
- **Engagement**: Time on page, bounce rate, scroll depth
- **Real-time**: Current active users
- **Conversions**: Track specific goals (e.g., GitHub stars, downloads)

**Use it to**:
- Understand user acquisition
- Measure documentation effectiveness
- Track search traffic
- Identify content gaps

---

### From Google Search Console:

- **Core Web Vitals**: Real user performance (LCP, INP, CLS)
- **Search Performance**: Impressions, clicks, CTR, rankings
- **Index Coverage**: Which pages are indexed by Google
- **Mobile Usability**: Mobile-specific issues
- **Sitemaps**: Indexing status
- **Manual Actions**: SEO penalties (if any)

**Use it to**:
- Monitor real user performance
- Optimize for search engines
- Find slow pages
- Track SEO improvements

---

### From Lighthouse CI:

- **Performance Score**: Overall speed rating (0-100)
- **Accessibility Score**: WCAG compliance
- **Best Practices**: Security, HTTPS, console errors
- **SEO Score**: Meta tags, structure, crawlability
- **Core Web Vitals**: LCP, CLS, TBT (lab data)
- **Opportunities**: Specific recommendations to improve
- **Regression Detection**: Catches performance drops

**Use it to**:
- Prevent performance regressions
- Ensure accessibility standards
- Catch issues before production
- Set performance budgets

---

## 🔒 Privacy & GDPR

### Cookie Banner Considerations

**Microsoft Clarity** and **Google Analytics 4** use cookies for tracking.

If you have EU users, you should add a cookie consent banner. Options:

1. **CookieYes** (Free tier available): https://www.cookieyes.com
2. **Cookiebot** (Free for small sites): https://www.cookiebot.com
3. **Cookie Consent by Osano**: https://www.osano.com/cookieconsent

### Privacy-Friendly Alternative

If you want to avoid cookie banners entirely, consider replacing Microsoft Clarity + GA4 with **Umami Analytics** (self-hosted, no cookies required). See the detailed research report for Umami setup instructions.

---

## 📈 Recommended Analytics Workflow

### Daily:
- Check Clarity for new session recordings (spot UX issues)
- Monitor GA4 Real-time report (see current traffic)

### Weekly:
- Review Clarity heatmaps for popular pages
- Check GA4 Engagement reports (most visited pages)
- Review Lighthouse CI scores on recent PRs

### Monthly:
- Analyze GA4 Acquisition reports (traffic sources)
- Review Search Console Core Web Vitals
- Check Search Console Search Performance (SEO trends)
- Identify documentation gaps based on search queries

### Quarterly:
- Deep dive into user behavior patterns
- Optimize slow pages based on Search Console data
- Review and update performance budgets
- Analyze conversion funnels (if configured)

---

## 🐛 Troubleshooting

### Analytics Not Working

1. **Check .env.local**:
   ```bash
   cat .env.local
   ```
   Make sure IDs are correctly set (no quotes, no spaces)

2. **Verify Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `NEXT_PUBLIC_CLARITY_ID` and `NEXT_PUBLIC_GA_ID`
   - Redeploy

3. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for console errors related to analytics
   - Check Network tab for blocked requests

4. **Clear Cache**:
   - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
   - Clear browser cache
   - Try incognito mode

5. **Ad Blockers**:
   - Ad blockers may block analytics
   - Test with ad blocker disabled
   - This is expected behavior for some users

### Lighthouse CI Not Running

1. **Check GitHub Actions**:
   - Go to GitHub → Your Repo → Actions tab
   - Look for failed workflows
   - Check error logs

2. **Common Issues**:
   - **Build failures**: Fix any build errors first
   - **Timeout**: Increase timeout in workflow file
   - **Port conflicts**: Ensure port 3000 is used

3. **Test Locally**:
   ```bash
   npm run build
   npm start
   npx @lhci/cli@latest autorun
   ```

### Search Console Verification Failed

1. **Wait for DNS propagation** (if using DNS method): 15-30 minutes
2. **Check meta tag placement**: Must be in `<head>`
3. **Ensure HTTPS**: Search Console requires HTTPS
4. **Try alternative verification**: Use different method

---

## 📚 Additional Resources

- [Microsoft Clarity Documentation](https://docs.microsoft.com/clarity)
- [Google Analytics 4 Help](https://support.google.com/analytics)
- [Search Console Help](https://support.google.com/webmasters)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Web Vitals](https://web.dev/vitals/)

---

## ✅ Setup Checklist

- [ ] Microsoft Clarity account created
- [ ] Clarity Project ID added to `.env.local`
- [ ] Google Analytics 4 property created
- [ ] GA4 Measurement ID added to `.env.local`
- [ ] Changes committed and pushed
- [ ] Vercel deployment completed
- [ ] Visited site to trigger analytics
- [ ] Verified Clarity dashboard shows data (wait 2-3 hours)
- [ ] Verified GA4 Realtime shows traffic
- [ ] Google Search Console property added
- [ ] Search Console ownership verified
- [ ] Test PR created to verify Lighthouse CI
- [ ] Lighthouse CI results visible in PR

---

## 🎉 You're All Set!

Your documentation site now has:

- ✅ Complete visitor analytics (page views, traffic sources, demographics)
- ✅ User behavior insights (session recordings, heatmaps, click tracking)
- ✅ Real-time performance monitoring (Core Web Vitals)
- ✅ Automated performance testing (every PR)
- ✅ SEO insights (search performance, indexing status)

**All for $0/month!**

Need help? Open an issue on GitHub or refer to the resources above.
