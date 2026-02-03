# 🚀 Growth Tracker Pro

A modern personal growth tracking web application with beautiful UI, interactive charts, and comprehensive habit management.

## ✨ Features

- 🎯 **Task Management**: Track daily tasks and habits with priority levels
- 📊 **Analytics Dashboard**: Interactive charts and progress visualization
- 🏆 **Achievement System**: Earn badges and track milestones
- 🌙 **Dark Mode**: Beautiful light/dark theme toggle
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔐 **Authentication**: Secure user login system
- 🎨 **Modern UI**: Professional design with smooth animations

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/your-username/growth-tracker-pro.git
cd growth-tracker-pro
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:8080/signup-pro.html`

### Production Deployment

🎉 **Ready for Render.com deployment!**

#### Option 1: Automated Deployment
```bash
# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

#### Option 2: Manual Deployment
1. Push code to GitHub
2. Create new Web Service on Render.com
3. Use these settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check**: `/signup-pro.html`

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
growth-tracker-pro/
├── website/                 # Static web assets
│   ├── signup-pro.html     # Authentication page
│   ├── dashboard-pro.html  # Main dashboard
│   ├── tasks-pro.html      # Task management
│   ├── analytics-pro.html  # Analytics & charts
│   ├── badges-pro.html     # Achievement system
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── components/        # Reusable components
├── server.js              # Production-ready Node.js server
├── package.json           # Dependencies and scripts
├── render.yaml           # Render deployment config
├── deploy.sh             # Deployment automation script
├── DEPLOYMENT.md         # Detailed deployment guide
└── README.md             # This file
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js (HTTP server)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Deployment**: Render.com

## 🎨 Pages Overview

### 📝 Sign Up (`signup-pro.html`)
- Google OAuth integration
- Modern authentication UI
- Responsive design

### 📊 Dashboard (`dashboard-pro.html`)
- Statistics overview cards
- Interactive charts
- Today's habits section
- Quick actions

### ✅ Tasks (`tasks-pro.html`)
- Daily task management
- Priority levels (High/Medium/Low)
- Progress tracking
- Add new tasks functionality

### 📈 Analytics (`analytics-pro.html`)
- Performance charts
- Date range filtering
- Habit performance metrics
- Interactive visualizations

### 🏆 Badges (`badges-pro.html`)
- Achievement system
- Progress tracking
- Earned and locked badges
- Statistics overview

## 🔧 Configuration

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
NODE_ENV=production
PORT=10000
ALLOWED_ORIGIN=https://your-app-name.onrender.com
```

### Customization

- **Colors**: Edit `css/themes.css` for theme customization
- **Layout**: Modify CSS variables in `css/professional.css`
- **Features**: Add new pages following the existing pattern

## 🚀 Deployment Features

### Production Optimizations
- ✅ **Security Headers**: XSS protection, frame options
- ✅ **CORS Configuration**: Proper cross-origin setup
- ✅ **Asset Caching**: 1-year cache for static files
- ✅ **Error Handling**: Professional 404/500 pages
- ✅ **Performance**: Optimized loading and rendering

### Render.com Ready
- ✅ **render.yaml**: Pre-configured deployment settings
- ✅ **Health Checks**: Automatic monitoring
- ✅ **Auto-scaling**: Ready for traffic growth
- ✅ **Custom Domains**: Easy domain setup

## 🧪 Testing

### Local Testing
```bash
# Development mode
npm run dev

# Production mode (local testing)
npm start
```

### Lighthouse Testing
Run Lighthouse audit for performance:
- Target: 90+ Performance score
- Target: 100+ Accessibility score
- Target: 90+ Best Practices score

## 📱 Responsive Design

The application is fully responsive:
- 📱 **Mobile**: 320px - 768px
- 📟 **Tablet**: 768px - 1024px
- 💻 **Desktop**: 1024px+

## 🔒 Security

- **Authentication**: Google OAuth integration
- **Data Storage**: Client-side localStorage
- **Security Headers**: XSS, CSRF protection
- **CORS**: Proper origin validation
- **Path Validation**: Directory traversal prevention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 **Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 **Issues**: Create an issue on GitHub
- 📧 **Contact**: growth-tracker@example.com

## 🎉 Acknowledgments

- Built with ❤️ for personal growth enthusiasts
- Icons by [Font Awesome](https://fontawesome.com/)
- Charts by [Chart.js](https://www.chartjs.org/)
- Hosted on [Render](https://render.com/)

---

**Ready to track your growth journey?** 🚀

Deploy now and start your personal development adventure!