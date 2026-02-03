# Google Sheets API Setup Guide

## 🚀 Step-by-Step Instructions

### 1. Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Enter project name: "Growth Tracker"
   - Click "CREATE"

### 2. Enable Google Sheets API

1. **Navigate to APIs & Services**
   - In the left sidebar, go to "APIs & Services" → "Library"

2. **Search and Enable Google Sheets API**
   - Search for "Google Sheets API"
   - Click on it
   - Click "ENABLE"

3. **Enable Google Identity Services**
   - Search for "Google Identity and Access Management (IAM) API"
   - Click on it
   - Click "ENABLE"

### 3. Get API Key

1. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS"
   - Select "API key"

2. **Configure API Key**
   - Copy the API key (this is YOUR_GOOGLE_API_KEY)
   - Click "RESTRICT KEY" for security
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Sheets API"
   - Click "SAVE"

### 4. Create OAuth 2.0 Client ID

1. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" and click "CREATE"
   - Fill in:
     - **App name**: Growth Tracker
     - **User support email**: your-email@gmail.com
     - **Developer contact information**: your-email@gmail.com
   - Click "SAVE AND CONTINUE" through all steps

2. **Create Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS"
   - Select "OAuth client ID"

3. **Configure OAuth Client**
   - **Application type**: Web application
   - **Name**: Growth Tracker Web
   - **Authorized JavaScript origins**: 
     - `http://localhost:8080`
     - `http://127.0.0.1:8080`
     - (Add your production domain later)
   - **Authorized redirect URIs**: 
     - `http://localhost:8080`
     - `http://127.0.0.1:8080`
   - Click "CREATE"

4. **Get Client ID**
   - Copy the "Client ID" (this is YOUR_GOOGLE_CLIENT_ID)
   - Copy the "Client Secret" (save this for later)

### 5. Create Google Sheet

1. **Create New Spreadsheet**
   - Go to Google Sheets: https://sheets.google.com
   - Click "+ Blank" or "Create new spreadsheet"
   - Name it: "Growth Tracker Data"

2. **Get Spreadsheet ID**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the part between `/d/` and `/edit`
   - This is YOUR_SPREADSHEET_ID

3. **Share the Sheet**
   - Click "Share" button
   - Add your service account email (if using service account)
   - Or make it "Anyone with link can view" (for testing)

### 6. Update Configuration File

Open `js/google-sheets-config.js` and replace:

```javascript
const GOOGLE_SHEETS_CONFIG = {
    // Replace with your actual values
    API_KEY: 'YOUR_GOOGLE_API_KEY',           // From Step 3
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID',       // From Step 4
    SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',    // From Step 5
    
    // These are already configured
    SCOPES: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    
    DISCOVERY_DOC: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
    APP_NAME: 'Growth Tracker Pro',
    DEV_MODE: false
};
```

### 7. Test the Integration

1. **Start Your Local Server**
   ```bash
   # If using Python
   python -m http.server 8080
   
   # If using Node.js
   npx http-server -p 8080
   ```

2. **Open Your App**
   - Go to: http://localhost:8080/tasks-pro.html
   - Try to authenticate with Google
   - Check browser console for any errors

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. "API Key Not Authorized"
- **Solution**: Make sure you restricted the API key to Google Sheets API only
- **Check**: API key is correctly copied without extra spaces

#### 2. "OAuth Client Not Authorized"
- **Solution**: Ensure localhost:8080 is in authorized origins
- **Check**: Client ID is correctly copied

#### 3. "Spreadsheet Not Found"
- **Solution**: Make sure the spreadsheet is shared correctly
- **Check**: Spreadsheet ID is correct (no extra characters)

#### 4. "CORS Error"
- **Solution**: Add your domain to authorized JavaScript origins
- **Check**: API key restrictions are properly set

### Security Best Practices

1. **API Key Restrictions**
   - Always restrict API keys to specific APIs
   - Set IP restrictions if possible

2. **OAuth Security**
   - Use HTTPS in production
   - Set proper redirect URIs
   - Don't expose client secret in frontend code

3. **Spreadsheet Sharing**
   - Share only with necessary users
   - Use viewer permissions for read-only access
   - Consider using service accounts for backend operations

## 📋 Quick Checklist

- [ ] Google Cloud Project created
- [ ] Google Sheets API enabled
- [ ] Google Identity API enabled
- [ ] API key created and restricted
- [ ] OAuth consent screen configured
- [ ] OAuth client ID created
- [ ] Google Sheet created and shared
- [ ] Configuration file updated
- [ ] Local server running
- [ ] Authentication tested

## 🚀 Next Steps

Once everything is working:

1. **Deploy to Production**
   - Add your production domain to authorized origins
   - Update API key restrictions for production
   - Use HTTPS for your production site

2. **Advanced Features**
   - Set up service accounts for backend operations
   - Implement data validation
   - Add backup and recovery procedures

3. **Monitor Usage**
   - Check Google Cloud Console for API usage
   - Set up alerts for quota limits
   - Monitor error rates

Your Growth Tracker will now store all data in Google Sheets with real-time synchronization!
