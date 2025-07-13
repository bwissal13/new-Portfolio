# Deploy to Vercel

This guide will help you deploy your portfolio website to Vercel.

## Prerequisites

1. **GitHub Account**: Make sure your code is pushed to a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Hugging Face API Key**: Get a free API key from [huggingface.co](https://huggingface.co/settings/tokens)

## Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub
2. Ensure your repository is public or you have a Vercel Pro account for private repos

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. Configure the following settings:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `.next` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

## Step 3: Configure Environment Variables

After deployment, you need to set up environment variables:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add the following environment variable:

   **Name**: `HUGGINGFACE_API_KEY`
   **Value**: Your Hugging Face API key
   **Environment**: Production, Preview, Development

### Getting a Hugging Face API Key

1. Go to [huggingface.co](https://huggingface.co)
2. Sign up or log in
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Copy the token and use it as your `HUGGINGFACE_API_KEY`

## Step 4: Redeploy

After setting environment variables, redeploy your project:

1. Go to your Vercel project dashboard
2. Click "Deployments"
3. Click "Redeploy" on your latest deployment

## Step 5: Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues

1. **Build Errors**: Check the build logs in Vercel dashboard
2. **Environment Variables**: Make sure `HUGGINGFACE_API_KEY` is set correctly
3. **API Rate Limits**: Hugging Face has rate limits on free tier

### Build Configuration

The `vercel.json` file in your project root optimizes the deployment:
- Sets function timeout to 30 seconds for the chat API
- Configures the correct build and output directories
- Sets the deployment region to US East (iad1)

## Features After Deployment

✅ **Static Pages**: Home, About, Projects, Contact, Blog, Craft
✅ **AI Chat**: Powered by Hugging Face inference API
✅ **Responsive Design**: Works on all devices
✅ **Dark/Light Theme**: Automatic theme switching
✅ **Performance**: Optimized with Next.js

## Monitoring

- **Analytics**: Available in Vercel dashboard
- **Performance**: Built-in performance monitoring
- **Logs**: Function logs available in dashboard

Your portfolio will be live at: `https://your-project-name.vercel.app` 