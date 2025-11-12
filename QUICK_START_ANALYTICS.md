# 🚀 Quick Start: Get Analytics Running in 5 Minutes

Want to get analytics up and running ASAP? Follow these minimal steps:

## 1. Microsoft Clarity (2 minutes)

1. Go to https://clarity.microsoft.com
2. Sign in → Click "Add new project"
3. Name: "Lokus Docs", URL: "https://docs.lokus.dev"
4. Copy your Project ID (looks like: `abcd1234efgh`)

## 2. Google Analytics 4 (3 minutes)

1. Go to https://analytics.google.com
2. Admin → Create Property → Name: "Lokus Docs"
3. Create Web Data Stream → URL: "https://docs.lokus.dev"
4. Copy your Measurement ID (looks like: `G-XXXXXXXXXX`)

## 3. Add IDs to Your Site (30 seconds)

Open `.env.local` and add your IDs:

```bash
NEXT_PUBLIC_CLARITY_ID=your_clarity_project_id_here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 4. Deploy

```bash
git add .env.local
git commit -m "chore: Add analytics IDs"
git push
```

## 5. Verify (After Deployment)

- Visit your docs site
- Check Clarity dashboard in 2-3 hours
- Check GA4 Realtime report (shows immediately)

---

## What You'll Get

- **Session Recordings**: Watch users navigate your docs
- **Heatmaps**: See where users click
- **Traffic Analytics**: Understand where visitors come from
- **Popular Pages**: Know what docs people read most
- **Real-time**: See current visitors
- **Performance**: Automated tests on every PR

## Need More Details?

See `ANALYTICS_SETUP.md` for the complete guide including:
- Google Search Console setup
- Lighthouse CI details
- Troubleshooting
- Privacy considerations
- Advanced configuration

---

**Total Cost**: $0/month forever 🎉
**Total Time**: ~5 minutes to get started
