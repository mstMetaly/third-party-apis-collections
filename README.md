# Third-Party APIs Collection

A collection of third-party API integrations for music streaming, facial recognition, and external services.

## 🎯 Overview

This category contains projects that integrate with external APIs and services, providing functionality for music streaming, facial expression analysis, and other third-party services.

## 📁 Projects

### 🎵 **SpotifyAPI** - Spotify Web API
- **API**: Spotify Web API
- **Purpose**: Music streaming and playlist management
- **Features**:
  - Browse music categories and genres
  - Access playlists and tracks
  - Music search and discovery
  - Playback control (with premium account)
- **Authentication**: OAuth 2.0 with Client Credentials flow
- **Use Cases**: Music apps, playlist generators, music discovery

### 😊 **FacialExpression** - Face++ API
- **API**: Face++ (Megvii) API
- **Purpose**: Facial expression recognition and analysis
- **Features**:
  - Emotion detection
  - Facial landmark detection
  - Age and gender estimation
  - Face comparison and recognition
- **Use Cases**: Emotion analysis, user experience optimization, accessibility features

## 🚀 Quick Start

### Prerequisites
- API keys for each service
- Node.js runtime
- Internet connection for API calls

### Setup

1. **Get API Keys**
   - **Spotify**: Register app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - **Face++**: Sign up at [Face++ Console](https://console.faceplusplus.com/)

2. **Configure Environment Variables**
   ```env
   # Spotify API
   SPOTIFY_CLIENT_ID=your-spotify-client-id
   SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
   
   # Face++ API
   FACEPP_API_KEY=your-facepp-api-key
   FACEPP_API_SECRET=your-facepp-api-secret
   ```

3. **Install Dependencies**
   ```bash
   cd ThirdParty/[project-name]
   npm install
   ```

## 🔧 Configuration

### Spotify API Setup
1. **Create Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Get Client ID and Client Secret
   - Set redirect URIs for OAuth

2. **Authentication Flow**
   - Client Credentials flow for server-to-server calls
   - Authorization Code flow for user-specific data
   - Refresh token management for long-term access

### Face++ API Setup
1. **Register Account**
   - Sign up at [Face++ Console](https://console.faceplusplus.com/)
   - Verify your account
   - Get API Key and API Secret

2. **API Endpoints**
   - Face detection and analysis
   - Emotion recognition
   - Face comparison
   - Face search and recognition

## 🛡️ Security

- **API Key Protection**: Store keys in environment variables
- **HTTPS Only**: All API calls use secure connections
- **Rate Limiting**: Respect API rate limits
- **Data Privacy**: Handle user data according to privacy policies

## 💰 Pricing

### Spotify API
- **Free Tier**: Limited requests per hour
- **Premium Features**: Require user authentication
- **Rate Limits**: Vary by endpoint and user type

### Face++ API
- **Free Tier**: Limited API calls per month
- **Paid Plans**: Based on API call volume
- **Enterprise**: Custom pricing for high-volume usage

## 🎯 Use Cases

### Spotify API
- **Music Discovery Apps**: Recommend songs based on user preferences
- **Playlist Generators**: Create custom playlists
- **Music Analytics**: Analyze listening patterns
- **Social Music Apps**: Share music with friends

### Face++ API
- **Emotion Analysis**: Detect user emotions in real-time
- **Accessibility**: Help users with visual impairments
- **User Experience**: Adapt UI based on user emotions
- **Security**: Face recognition for authentication

## 📚 Documentation

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Face++ API Documentation](https://console.faceplusplus.com/documents/4888373)

## 🔄 API Limits

### Spotify API
- **Rate Limits**: 25 requests per second
- **Quota**: Varies by endpoint
- **Authentication**: Tokens expire, implement refresh logic

### Face++ API
- **Rate Limits**: Varies by plan
- **Concurrent Requests**: Limited based on subscription
- **Image Size**: Maximum file size limits

## 🚨 Error Handling

### Common Issues
- **Authentication Errors**: Invalid or expired tokens
- **Rate Limiting**: Too many requests
- **Network Issues**: Connection timeouts
- **Data Format**: Invalid request parameters

### Best Practices
- Implement retry logic with exponential backoff
- Cache responses when appropriate
- Monitor API usage and costs
- Handle errors gracefully with user-friendly messages

## 🔍 Monitoring

- **API Usage**: Track request counts and response times
- **Error Rates**: Monitor failed requests
- **Cost Tracking**: Monitor API costs and usage
- **Performance**: Optimize for response times

---

**Part of the API Server Collection** 