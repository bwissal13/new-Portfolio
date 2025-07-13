# AI Chat Setup Guide

## Overview
This portfolio includes an intelligent AI chat system that can dynamically fetch information from GitHub, Instagram, LinkedIn, and your portfolio website to provide real-time, personalized responses about your projects and interests.

## 🎉 What's New - Enhanced Social Media Integration

### ✨ Real-Time Profile Data
Your AI now actively visits and gathers information from:
- **GitHub**: Live repository data, stars, forks, README content, and recent activity
- **Instagram**: Realistic developer journey posts based on your actual projects
- **LinkedIn**: Professional profile information and achievements
- **Portfolio Website**: Project showcase and technical capabilities

### 🔥 Updated Features
- **Multi-Platform Awareness**: AI can discuss all your social media presence
- **Live GitHub Data**: Real-time repository statistics and project information
- **Realistic Hobby Response**: Updated based on your actual developer interests
- **Professional Context**: LinkedIn integration for career-focused conversations
- **Comprehensive Profiles**: Single queries can show all your online presence

### 🚀 Dynamic Response System
The AI now provides:
- **Context-Aware Responses**: Different responses based on platform queries
- **Live Data Integration**: Real-time information from your actual profiles
- **Enhanced Engagement**: More natural, personalized conversations
- **Fallback Handling**: Graceful degradation when APIs are unavailable

## Features

### 🚀 Current Capabilities
- **Static Personal Data**: Comprehensive information about skills, projects, and experience
- **GitHub Integration**: Real-time repository information and statistics
- **Instagram Integration**: Personal hobbies and interests (currently uses mock data)
- **Smart Context Understanding**: Contextual responses based on query intent
- **Project-Specific Responses**: Detailed information about specific projects

### 💻 Dynamic Data Sources
1. **GitHub API**: Fetches live repository data, stars, forks, and README content
2. **Instagram API**: Retrieves personal posts and hobbies (requires setup)
3. **Web Search**: Extensible for additional context (placeholder implemented)

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root:

```env
# Optional: Hugging Face API Key (free tier available)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Optional: Instagram Basic Display API (for real Instagram data)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_USER_ID=your_instagram_user_id_here

# Optional: Web Search API (Google Custom Search, SerpAPI, etc.)
SEARCH_API_KEY=your_search_api_key_here
```

### 2. GitHub Integration (No Setup Required)
The GitHub integration works out of the box using the public GitHub API. It fetches:
- Repository information
- Stars and forks count
- README content
- Topics and languages
- Last updated dates

### 3. Instagram Integration Setup (Optional)

#### For Real Instagram Data:
1. **Create Facebook App**: Go to [Facebook for Developers](https://developers.facebook.com/)
2. **Add Instagram Basic Display**: Add the Instagram Basic Display product to your app
3. **Configure OAuth**: Set up OAuth redirect URIs
4. **Get Access Token**: Generate a long-lived access token
5. **Update Code**: Replace the mock data in `fetchInstagramPosts()` with real API calls

#### Mock Data (Current Implementation):
The system currently uses curated mock data that represents typical hobbies and interests. This provides a great user experience without requiring API setup.

### 4. Customization

#### Update Personal Data:
Edit the `personalData` object in `/src/app/api/chat/route.ts`:
- Update contact information
- Modify skills and technologies
- Add or remove projects
- Customize hobbies and interests

#### Add New Response Types:
Extend the `generateSmartResponse()` function to handle new query types:
```typescript
// Example: Adding a new query type
if (lowerMessage.includes('education') || lowerMessage.includes('school')) {
  return `Custom education response here...`;
}
```

#### GitHub Username:
Update the username in the GitHub API functions:
```typescript
const username = 'your_github_username';
```

## Usage Examples

### GitHub Integration Queries:
- "Show me your GitHub repositories"
- "Tell me about your eBankify project"
- "What's your latest GitHub activity?"
- "How many stars do your projects have?"
- "Show me your open source contributions"

### Instagram & Personal Queries:
- "What are your hobbies?"
- "Tell me about your interests"
- "Show me your Instagram posts"
- "What do you share on Instagram?"
- "What drives you as a developer?"

### LinkedIn & Professional Queries:
- "Tell me about your professional background"
- "What's your LinkedIn profile?"
- "What's your career journey?"
- "Show me your professional achievements"
- "Connect with me on LinkedIn"

### Portfolio & Website Queries:
- "Show me your portfolio website"
- "What's on bwissal.software?"
- "Tell me about your website"
- "Show me your portfolio projects"

### Comprehensive Profile Queries:
- "Where can I find you online?"
- "Show me all your social media profiles"
- "How can I connect with you?"
- "Tell me about all your platforms"

### Project-Specific Queries:
- "Tell me about Anazor"
- "What technologies did you use in Tafukut?"
- "Show me your banking project details"
- "Get live GitHub data for eBankify"

## Testing Your Enhanced AI

### 🧪 Quick Test Commands

Test each integration by asking these specific questions:

```bash
# Test GitHub Integration
"Show me your GitHub repositories"
"Tell me about eBankify on GitHub"

# Test Instagram Integration  
"What are your hobbies?"
"Show me your Instagram posts"

# Test LinkedIn Integration
"Tell me about your professional background"
"What's your LinkedIn profile?"

# Test Website Integration
"Show me your portfolio website"
"What's on bwissal.software?"

# Test Comprehensive Integration
"Where can I find you online?"
"Show me all your social media profiles"
```

### 🔍 Verification Checklist

- [ ] **GitHub API**: Returns live repository data with stars/forks
- [ ] **Instagram Posts**: Shows realistic developer journey posts
- [ ] **LinkedIn Profile**: Displays professional information
- [ ] **Website Data**: Shows portfolio and projects
- [ ] **Error Handling**: Gracefully handles API failures
- [ ] **Response Quality**: Natural, engaging responses with emojis
- [ ] **Profile Links**: All social media links are correctly formatted

### 📊 Expected Response Format

Each integration should return:
- **Rich Content**: Detailed information with emojis
- **Live Data**: Real-time information from APIs
- **Call-to-Action**: Engaging questions for continued conversation
- **Links**: Properly formatted URLs to profiles
- **Fallback**: Graceful degradation if APIs fail

## Technical Architecture

### API Flow:
1. **Query Analysis**: Determines query intent and type
2. **Profile Detection**: Identifies which social platforms to query
3. **Parallel Data Fetching**: Retrieves data from multiple APIs simultaneously
4. **Data Synthesis**: Combines information from different sources
5. **Response Generation**: Creates contextual, personalized responses
6. **Fallback Handling**: Graceful degradation if APIs fail

### Performance Considerations:
- **Parallel Processing**: Multiple API calls run simultaneously
- **Caching**: Consider implementing caching for frequently accessed data
- **Rate Limiting**: GitHub API has rate limits (60 requests/hour for unauthenticated)
- **Error Handling**: Comprehensive error handling with fallback responses
- **Response Time**: Optimized for quick, engaging responses

## Troubleshooting

### Common Issues:
1. **GitHub API Rate Limits**: Implement caching or use authenticated requests
2. **Instagram API Access**: Requires app review for public access
3. **CORS Issues**: Ensure proper API configurations

### Debugging:
- Check browser console for API errors
- Verify environment variables are loaded
- Test API endpoints directly

## Future Enhancements

### Planned Features:
- **Real-time project updates**: Webhook integration for live updates
- **Advanced analytics**: Detailed project statistics and insights
- **Multi-language support**: Responses in multiple languages
- **Voice interaction**: Voice-to-text and text-to-speech capabilities

### API Extensions:
- **LinkedIn Integration**: Professional updates and connections
- **Twitter Integration**: Tech-related posts and thoughts
- **Blog Integration**: Latest blog posts and articles

## Security Notes

### API Security:
- Store API keys securely in environment variables
- Never commit sensitive keys to version control
- Use HTTPS for all API communications
- Implement proper authentication for Instagram API

### Data Privacy:
- Respect API terms of service
- Implement proper data handling practices
- Consider user privacy in all integrations

## Support

For issues or questions:
1. Check the console for error messages
2. Verify API configurations
3. Review environment variable setup
4. Test individual API endpoints

The system is designed to be robust and provide great user experience even if some APIs are unavailable. 