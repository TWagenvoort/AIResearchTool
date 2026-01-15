# 📚 Research Paper Finder - Browser Extension

A lightweight browser extension that finds and evaluates research papers based on trained quality criteria.

## ✨ Features

- **Automatic Paper Search** - Search for papers on any topic
- **Trained Quality Evaluator** - Uses the 6-metric trained system (trained on 40 high-quality papers)
- **Page Analysis** - Automatically analyzes the current webpage to detect research topics
- **Quality Filtering** - Only shows papers above your quality threshold
- **Configurable Settings** - Adjust quality score and result limits

## 📋 How to Install

### Chrome / Edge

1. **Navigate to Extension Directory**
   ```
   C:\Users\Thijs W\Desktop\Minor Digitalisering in de Gebouwde Omgeving\Python testing\Web Tool\web-research-extension\extension
   ```

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your browser
   - OR `edge://extensions/` for Microsoft Edge

3. **Enable Developer Mode**
   - Toggle "Developer mode" in top-right corner

4. **Load Extension**
   - Click "Load unpacked"
   - Select the `extension` folder
   - Extension will appear in your toolbar!

## 🎯 How to Use

### 1. Click the Extension Icon
- Extension icon appears in your browser toolbar
- Click it to open the popup

### 2. Search Papers
- Enter a research topic (e.g., "machine learning", "artificial intelligence")
- Click "🔍 Search Papers"
- Results appear with quality scores

### 3. Analyze Current Page
- Click "📖 Analyze This Page"
- Extension reads the webpage content
- Automatically detects research topics
- Shows relevant papers

### 4. Adjust Settings
- **Min Quality Score**: 0-100 (default 75 = High Quality)
- **Max Results**: How many papers to show (default 10)

## 📊 Quality Scoring

Papers are evaluated on 6 metrics (trained on 40 landmark papers):

| Metric | Weight | What It Measures |
|--------|--------|-----------------|
| Citation Impact | 25% | How many times cited |
| Publication Venue | 20% | Journal/Conference prestige |
| Methodology | 18% | Research quality |
| Data Transparency | 15% | Open data/code |
| Novel Contribution | 12% | Innovation level |
| Author Expertise | 10% | Researcher credentials |

## 🏆 Quality Tiers

- **90-100**: Excellent (Nature, Science level)
- **75-89**: High (Strong standards)
- **60-74**: Good (Acceptable)
- **45-59**: Acceptable (Some concerns)
- **<45**: Low (Major issues)

## 📁 Extension Structure

```
extension/
├── manifest.json           # Extension configuration
├── popup.html             # UI interface
├── popup.js               # Research logic & quality evaluator
├── content.js             # Webpage content reader
└── background.js          # Background service worker
```

## 🔧 How It Works

1. **User clicks extension** → Popup opens with search box
2. **User enters topic or clicks "Analyze Page"** → Extension reads webpage
3. **Trained evaluator analyzes papers** → Scores them on 6 metrics
4. **Filters by quality threshold** → Shows only high-quality results
5. **Results displayed** → User can see scores and paper details

## ⚙️ Technical Details

- **Manifest V3** - Latest Chrome extension standard
- **No external dependencies** - Pure JavaScript
- **Trained weights** - Based on analysis of 40 Google Scholar papers
- **Local storage** - Settings saved in browser

## 🚀 What's Included

✅ Quality Criteria trained on 40 papers  
✅ Citation impact scoring  
✅ Venue prestige detection  
✅ Methodology evaluation  
✅ Novelty detection  
✅ Author expertise assessment  
✅ Automatic webpage analysis  
✅ Configurable quality thresholds  
✅ Results filtering  

## 📝 Notes

- Currently uses mock paper database for demo
- Can be integrated with Google Scholar API for live data
- Settings persist across sessions
- Extension works on any webpage

## 🎓 Training Data

The quality evaluator is trained on 40 landmark papers including:
- Transformers (Vaswani et al., 2017) - 85,000 citations
- ResNets (He et al., 2015) - 82,000 citations  
- AlexNet (Krizhevsky et al., 2012) - 68,000 citations
- Papers from Nature, Science, NeurIPS, ICML, CVPR, etc.

---

**Ready to find high-quality research papers!** 📚
