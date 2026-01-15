# GitHub Setup Instructions

The extension folder has been prepared for GitHub. To push it to the repository, follow these steps:

## Prerequisites
- Git installed and configured
- GitHub account with access to https://github.com/TWagenvoort/AIResearchTool
- GitHub Personal Access Token (if using HTTPS)

## Setup Steps

### Option 1: Using PowerShell
```powershell
cd "c:\Users\Thijs W\Desktop\Minor Digitalisering in de Gebouwde Omgeving\Python testing\Web Tool\web-research-extension\extension"

# Initialize if not already done
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Add and commit
git add -A
git commit -m "Initial commit: AI Research Tool Chrome Extension"

# Add remote
git remote add origin https://github.com/TWagenvoort/AIResearchTool.git
git branch -M main

# Push
git push -u origin main
```

### Option 2: Using Git Bash
```bash
cd "/c/Users/Thijs W/Desktop/Minor Digitalisierung in de Gebouwde Omgeving/Python testing/Web Tool/web-research-extension/extension"

git init
git add -A
git commit -m "Initial commit: AI Research Tool Chrome Extension"
git remote add origin https://github.com/TWagenvoort/AIResearchTool.git
git branch -M main
git push -u origin main
```

## What Gets Pushed

- `manifest.json` - Chrome Extension configuration
- `popup.html` - Extension UI
- `popup.js` - Core logic with 51 papers and quality evaluator
- `content.js` - Webpage content reader
- `background.js` - Service worker
- `images/` - Extension icons (16x16, 48x48, 128x128)
- `README.md` - User documentation
- `RO_THEMES.md` - Spatial planning paper documentation
- `DATABASE_UPDATE.md` - Database improvements documentation

## Database Overview

**Total Papers**: 51 research papers

**Key Statistics**:
- Machine Learning: 18 papers
- Deep Learning: 13 papers
- Neural Networks: 8 papers
- Ruimtelijke Ordening (Spatial Planning): 8 papers
- Smart Cities: 8 papers
- Digitalisering Gebouwde Omgeving: 8 papers
- Artificial Intelligence: 7 papers
- Spatial Planning: 7 papers
- Research Methodology: 7 papers
- Urban Planning: 6 papers

**Tag-Based Filtering**:
- 141 unique tags
- Smart search across all papers
- Auto-detection of webpage topics
- Quality evaluation on 6 metrics

## After Push

Once pushed to GitHub, the repository will be available at:
https://github.com/TWagenvoort/AIResearchTool

## Troubleshooting

**Authentication Issues**:
- If using HTTPS, GitHub may prompt for credentials
- Use a GitHub Personal Access Token (PAT) instead of password
- Create a PAT at: https://github.com/settings/tokens

**Path Issues**:
- Ensure no spaces in command line paths (they're handled in PowerShell)
- Use absolute paths when changing directories

**Already Has Remote**:
```powershell
git remote remove origin
git remote add origin https://github.com/TWagenvoort/AIResearchTool.git
```
