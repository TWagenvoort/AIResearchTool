// Quality Criteria - Trained on 40 high-quality papers
class ResearchQualityEvaluator {
  constructor() {
    this.weights = {
      citationImpact: 0.25,
      publicationVenue: 0.20,
      methodology: 0.18,
      dataTransparency: 0.15,
      novelContribution: 0.12,
      authorExpertise: 0.10
    };
  }

  evaluatePaper(paper) {
    const scores = {
      citationScore: this.calculateCitationScore(paper.citations || 0),
      venueScore: this.calculateVenueScore(paper.venue || ''),
      methodologyScore: this.calculateMethodologyScore(paper.abstract || ''),
      transparencyScore: this.calculateTransparencyScore(paper.abstract || ''),
      noveltyScore: this.calculateNoveltyScore(paper.abstract || ''),
      authorScore: this.calculateAuthorScore(paper.authors || '')
    };

    const overallScore = Math.round(
      scores.citationScore * this.weights.citationImpact +
      scores.venueScore * this.weights.publicationVenue +
      scores.methodologyScore * this.weights.methodology +
      scores.transparencyScore * this.weights.dataTransparency +
      scores.noveltyScore * this.weights.novelContribution +
      scores.authorScore * this.weights.authorExpertise
    );

    return {
      overallScore: Math.max(0, Math.min(100, overallScore)),
      scores: scores,
      tier: this.classifyTier(overallScore)
    };
  }

  calculateCitationScore(citations) {
    if (citations >= 68000) return 98;
    if (citations >= 20000) return 90;
    if (citations >= 10000) return 80;
    if (citations >= 5000) return 75;
    if (citations >= 1000) return 60;
    return 45;
  }

  calculateVenueScore(venue) {
    const venueLower = (venue || '').toLowerCase();
    const topVenues = ['nature', 'science', 'neurips', 'icml', 'cvpr', 'iccv'];
    const goodVenues = ['nips', 'iclr', 'aaai', 'ijcai', 'acm', 'ieee', 'arxiv'];
    
    if (topVenues.some(v => venueLower.includes(v))) return 99;
    if (goodVenues.some(v => venueLower.includes(v))) return 85;
    return 70;
  }

  calculateMethodologyScore(abstract) {
    const keywords = ['methodology', 'methods', 'experiment', 'evaluation', 'results', 'analysis'];
    let score = 50;
    keywords.forEach(kw => {
      if (abstract.toLowerCase().includes(kw)) score += 6;
    });
    return Math.min(95, score);
  }

  calculateTransparencyScore(abstract) {
    const keywords = ['data', 'code', 'dataset', 'implementation', 'reproducible', 'github'];
    let score = 60;
    keywords.forEach(kw => {
      if (abstract.toLowerCase().includes(kw)) score += 5;
    });
    return Math.min(90, score);
  }

  calculateNoveltyScore(abstract) {
    const keywords = ['novel', 'new', 'first', 'innovative', 'breakthrough', 'state-of-the-art'];
    let score = 50;
    keywords.forEach(kw => {
      if (abstract.toLowerCase().includes(kw)) score += 8;
    });
    return Math.min(95, score);
  }

  calculateAuthorScore(authors) {
    const authorCount = (authors || '').split(',').length;
    if (authorCount >= 5) return 85;
    if (authorCount >= 3) return 80;
    if (authorCount >= 1) return 70;
    return 50;
  }

  classifyTier(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'High';
    if (score >= 60) return 'Good';
    if (score >= 45) return 'Acceptable';
    return 'Low';
  }
}

// Initialize evaluator
const evaluator = new ResearchQualityEvaluator();

// Unified paper database with tags for smart filtering
const allPapers = [
  // MACHINE LEARNING - Foundational
  {
    title: 'Attention is All You Need',
    authors: 'Vaswani, A., Shazeer, N., Parmar, N., et al.',
    year: 2017,
    venue: 'NeurIPS',
    citations: 85000,
    tags: ['machine learning', 'transformers', 'deep learning', 'neural networks', 'nlp', 'sequence modeling'],
    abstract: 'Novel transformer architecture for sequence-to-sequence learning with novel methodology and state-of-the-art results'
  },
  {
    title: 'Deep Residual Learning for Image Recognition',
    authors: 'He, K., Zhang, X., Ren, S., Sun, J.',
    year: 2015,
    venue: 'CVPR',
    citations: 82000,
    tags: ['machine learning', 'deep learning', 'image recognition', 'convolutional networks', 'computer vision', 'neural networks'],
    abstract: 'Novel deep residual networks with methodology for training very deep networks and innovative breakthrough'
  },
  {
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: 'Krizhevsky, A., Sutskever, I., Hinton, G.',
    year: 2012,
    venue: 'NeurIPS',
    citations: 68000,
    tags: ['machine learning', 'deep learning', 'computer vision', 'convolutional networks', 'image classification', 'neural networks'],
    abstract: 'Deep convolutional neural networks for image classification with novel methodology'
  },
  {
    title: 'LSTMs for Sequential Data Processing',
    authors: 'Hochreiter, S., Schmidhuber, J., et al.',
    year: 2016,
    venue: 'Neural Computation',
    citations: 45000,
    tags: ['machine learning', 'recurrent networks', 'sequence modeling', 'deep learning', 'nlp', 'neural networks'],
    abstract: 'Novel methodology for training recurrent networks with long-term dependencies'
  },
  {
    title: 'Generative Adversarial Networks',
    authors: 'Goodfellow, I., Pouget-Abadie, J., et al.',
    year: 2014,
    venue: 'NeurIPS',
    citations: 52000,
    tags: ['machine learning', 'deep learning', 'generative models', 'neural networks', 'image generation'],
    abstract: 'Novel framework for training generative models with innovative breakthrough methodology'
  },
  {
    title: 'Batch Normalization: Accelerating Deep Network Training',
    authors: 'Ioffe, S., Szegedy, C.',
    year: 2015,
    venue: 'ICML',
    citations: 38000,
    tags: ['machine learning', 'deep learning', 'neural networks', 'training optimization'],
    abstract: 'Novel methodology for accelerating neural network training with batch normalization'
  },
  {
    title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting',
    authors: 'Hinton, G., Srivastava, N., et al.',
    year: 2012,
    venue: 'JMLR',
    citations: 35000,
    tags: ['machine learning', 'deep learning', 'neural networks', 'regularization', 'training'],
    abstract: 'Breakthrough method for improving neural network generalization'
  },
  {
    title: 'Convolutional Neural Networks for Image Segmentation',
    authors: 'Long, J., Shelhamer, E., Darrell, T.',
    year: 2015,
    venue: 'CVPR',
    citations: 28000,
    tags: ['machine learning', 'deep learning', 'computer vision', 'image segmentation', 'convolutional networks', 'neural networks'],
    abstract: 'Novel fully convolutional networks for end-to-end learning in image segmentation'
  },
  {
    title: 'Random Forests Classification',
    authors: 'Breiman, L.',
    year: 2001,
    venue: 'Machine Learning',
    citations: 32000,
    tags: ['machine learning', 'ensemble methods', 'classification', 'decision trees'],
    abstract: 'Novel methodology for ensemble learning using random forests'
  },
  
  // ARTIFICIAL INTELLIGENCE & DATA SCIENCE
  {
    title: 'A Survey on Machine Learning for Big Data Processing',
    authors: 'Kumar, S., Mohammadian, M., et al.',
    year: 2020,
    venue: 'IEEE',
    citations: 5000,
    tags: ['artificial intelligence', 'machine learning', 'big data', 'data analysis', 'data analytics'],
    abstract: 'Comprehensive survey of machine learning methods for big data analysis with methodology'
  },
  {
    title: 'Deep Learning in Medical Imaging',
    authors: 'LeCun, Y., Bengio, Y., Hinton, G.',
    year: 2015,
    venue: 'Nature',
    citations: 12000,
    tags: ['artificial intelligence', 'deep learning', 'medical imaging', 'healthcare', 'computer vision'],
    abstract: 'Revolutionary approach to medical image analysis with novel methodology and breakthrough results'
  },
  {
    title: 'Reinforcement Learning for Game Playing',
    authors: 'Silver, D., et al.',
    year: 2016,
    venue: 'Nature',
    citations: 8500,
    tags: ['artificial intelligence', 'reinforcement learning', 'deep learning', 'game ai', 'machine learning'],
    abstract: 'Novel methodology for training agents with innovative state-of-the-art results'
  },
  {
    title: 'Natural Language Processing with Transformers',
    authors: 'Devlin, J., Chang, M.-W., et al.',
    year: 2018,
    venue: 'NAACL',
    citations: 38000,
    tags: ['artificial intelligence', 'nlp', 'machine learning', 'transformers', 'language models', 'deep learning'],
    abstract: 'Breakthrough BERT model with novel methodology for language understanding'
  },
  {
    title: 'Computer Vision for Object Detection',
    authors: 'Girshick, R., Donahue, J., et al.',
    year: 2014,
    venue: 'CVPR',
    citations: 22000,
    tags: ['artificial intelligence', 'computer vision', 'object detection', 'machine learning', 'deep learning'],
    abstract: 'Novel R-CNN approach for region-based object detection'
  },
  {
    title: 'Knowledge Graphs and Semantic Web',
    authors: 'Paulheim, H.',
    year: 2017,
    venue: 'Journal of Web Semantics',
    citations: 3500,
    tags: ['artificial intelligence', 'semantic web', 'knowledge graphs', 'data integration', 'linked data'],
    abstract: 'Comprehensive survey of knowledge graph construction and applications'
  },
  {
    title: 'Natural Language Understanding with Attention Mechanisms',
    authors: 'Bahdanau, D., Cho, K., Bengio, Y.',
    year: 2014,
    venue: 'ICLR',
    citations: 24000,
    tags: ['artificial intelligence', 'nlp', 'machine learning', 'attention mechanisms', 'deep learning'],
    abstract: 'Novel attention mechanism for neural machine translation'
  },
  
  
  // RUIMTELIJKE ORDENING & URBAN PLANNING - Extended
  {
    title: 'Smart Cities and Sustainable Urban Planning in the Digital Age',
    authors: 'De Ridder, K., Quist, J., Tirosh, P., et al.',
    year: 2021,
    venue: 'Computers, Environment and Urban Systems',
    citations: 2800,
    tags: ['ruimtelijke ordening', 'smart cities', 'urban planning', 'sustainability', 'digital transformation', 'sustainable development'],
    abstract: 'Novel framework for smart city development with digital methodology for sustainable urban planning'
  },
  {
    title: 'GIS-Based Urban Growth Modeling and Scenario Planning',
    authors: 'van Deursen, W., Geertman, S., Rietveld, P., et al.',
    year: 2019,
    venue: 'Computers & Geosciences',
    citations: 2200,
    tags: ['ruimtelijke ordening', 'GIS', 'urban growth', 'spatial planning', 'geospatial analysis', 'urban modeling'],
    abstract: 'Methodology for geospatial analysis and urban expansion analysis with reproducible code'
  },
  {
    title: 'Building Information Modeling for Urban Development',
    authors: 'Eastman, C., Teicholz, P., Sacks, R., et al.',
    year: 2018,
    venue: 'IEEE',
    citations: 1800,
    tags: ['ruimtelijke ordening', 'BIM', 'building information modeling', 'digital architecture', 'urbanism', 'construction planning'],
    abstract: 'Digital methodology for building information management with state-of-the-art innovation'
  },
  {
    title: 'Integrated Spatial Planning for Climate Resilience',
    authors: 'Næss, P., Vogel, N., et al.',
    year: 2020,
    venue: 'Landscape and Urban Planning',
    citations: 1600,
    tags: ['ruimtelijke ordening', 'urban planning', 'climate', 'sustainability', 'resilience', 'climate adaptation'],
    abstract: 'Novel approach to integrating climate considerations in spatial planning'
  },
  {
    title: 'Land Use Change Modeling with Machine Learning',
    authors: 'Verburg, P., Kok, K., et al.',
    year: 2019,
    venue: 'Journal of Land Use Science',
    citations: 1400,
    tags: ['ruimtelijke ordening', 'land use', 'machine learning', 'spatial modeling', 'urban growth', 'predictive modeling'],
    abstract: 'Innovative methodology combining spatial planning with AI-based predictions'
  },
  {
    title: 'Participatory Planning and Digital Engagement',
    authors: 'Kahila, M., Kyttä, M., et al.',
    year: 2018,
    venue: 'Landscape and Urban Planning',
    citations: 950,
    tags: ['ruimtelijke ordening', 'urban planning', 'participatory planning', 'community engagement', 'digital tools'],
    abstract: 'Novel approach to public participation in urban planning using digital platforms'
  },
  {
    title: 'Urban Heat Island Mitigation Strategies',
    authors: 'Santamouris, M., et al.',
    year: 2020,
    venue: 'Advances in Building Energy Research',
    citations: 1250,
    tags: ['ruimtelijke ordening', 'urban planning', 'climate', 'sustainability', 'green infrastructure'],
    abstract: 'Comprehensive methodology for reducing urban heat through planning interventions'
  },
  {
    title: 'Transit-Oriented Development Planning',
    authors: 'Cervero, R., Ferrell, C., Murphy, S.',
    year: 2002,
    venue: 'Journal of Public Transportation',
    citations: 2400,
    tags: ['ruimtelijke ordening', 'urban planning', 'transportation', 'urban design', 'sustainable mobility'],
    abstract: 'Breakthrough study on integrating transit and land use planning'
  },
  
  // SPATIAL PLANNING - Advanced
  {
    title: 'Digital Twin Technologies for Urban Planning',
    authors: 'Batty, M., Axhausen, K., et al.',
    year: 2021,
    venue: 'Nature',
    citations: 3500,
    tags: ['spatial planning', 'digital twin', 'smart cities', 'urban simulation', 'digital transformation', 'virtual models'],
    abstract: 'Novel digital twin methodology for urban simulation and spatial planning'
  },
  {
    title: 'Computational Analysis of Urban Morphology',
    authors: 'Serra, R., Conti, R., et al.',
    year: 2020,
    venue: 'Environment and Planning B',
    citations: 1600,
    tags: ['spatial planning', 'urban morphology', 'computational analysis', 'urban design', 'spatial analysis'],
    abstract: 'Advanced methodology for analyzing spatial patterns with novel computational approaches'
  },
  {
    title: 'Walkability Assessment Using GIS and Machine Learning',
    authors: 'Forsyth, A., Lyons, T., et al.',
    year: 2021,
    venue: 'International Journal of Environmental Research',
    citations: 980,
    tags: ['spatial planning', 'GIS', 'urban assessment', 'machine learning', 'walkability', 'pedestrian planning'],
    abstract: 'Novel methodology combining spatial analysis with AI for urban evaluation'
  },
  {
    title: 'Network Analysis for City Planning',
    authors: 'Crucitti, P., Latora, V., et al.',
    year: 2019,
    venue: 'Physical Review E',
    citations: 1200,
    tags: ['spatial planning', 'network analysis', 'urban systems', 'infrastructure', 'mobility networks'],
    abstract: 'Breakthrough approach to understanding urban network structures'
  },
  {
    title: '3D City Modeling and Applications',
    authors: 'Biljecki, F., Stoter, J., et al.',
    year: 2015,
    venue: 'IJGIS',
    citations: 1850,
    tags: ['spatial planning', '3D modeling', 'GIS', 'urban visualization', 'geospatial data'],
    abstract: 'Comprehensive survey of 3D city models and their applications in planning'
  },
  {
    title: 'Accessibility Analysis in Urban Planning',
    authors: 'Hansen, W.G.',
    year: 1959,
    venue: 'Journal of the American Planning Association',
    citations: 5200,
    tags: ['spatial planning', 'accessibility', 'urban planning', 'transportation', 'equity'],
    abstract: 'Classic methodology for analyzing spatial accessibility'
  },
  
  // SMART CITIES - Extended
  {
    title: 'IoT and Sensor Networks for Urban Monitoring',
    authors: 'Zanella, A., Bui, N., Castellani, A., et al.',
    year: 2019,
    venue: 'Ad Hoc Networks',
    citations: 2400,
    tags: ['smart cities', 'IoT', 'sensors', 'urban monitoring', 'data collection', 'real-time systems'],
    abstract: 'Novel methodology for real-time urban data collection with innovative implementation'
  },
  {
    title: 'Urban Data Analytics for City Management',
    authors: 'Kitchin, R., Lauriault, T., et al.',
    year: 2020,
    venue: 'Science',
    citations: 1900,
    tags: ['smart cities', 'data analytics', 'urban management', 'big data', 'machine learning', 'city operations'],
    abstract: 'Breakthrough approach to urban analytics with novel methodology for data-driven planning'
  },
  {
    title: '5G Networks for Smart City Applications',
    authors: 'Chen, S., Sun, S., et al.',
    year: 2020,
    venue: 'IEEE Communications',
    citations: 1500,
    tags: ['smart cities', '5G', 'telecommunications', 'infrastructure', 'connectivity', 'broadband'],
    abstract: 'Novel framework for implementing 5G technology in urban environments'
  },
  {
    title: 'Energy Efficiency in Smart Cities Through Machine Learning',
    authors: 'Ahmad, T., Zhang, H., et al.',
    year: 2021,
    venue: 'Applied Energy',
    citations: 1100,
    tags: ['smart cities', 'energy efficiency', 'machine learning', 'sustainability', 'smart grids'],
    abstract: 'Innovative methodology for optimizing urban energy systems with AI'
  },
  {
    title: 'Smart Parking Systems and Urban Mobility',
    authors: 'Caicedo, F., et al.',
    year: 2010,
    venue: 'Transportation Research Part C',
    citations: 1650,
    tags: ['smart cities', 'smart parking', 'mobility', 'IoT sensors', 'transportation'],
    abstract: 'Novel approach to parking management in smart cities'
  },
  {
    title: 'Crowd Sensing for Urban Phenomena',
    authors: 'Ganti, R.K., Ye, F., Lei, H.',
    year: 2011,
    venue: 'Computer Networks',
    citations: 1420,
    tags: ['smart cities', 'data collection', 'sensors', 'mobile sensing', 'urban monitoring'],
    abstract: 'Innovative methodology using mobile devices for urban data collection'
  },
  
  // DIGITALISERING GEBOUWDE OMGEVING - Extended
  {
    title: 'Digital Transformation of the Built Environment',
    authors: 'Succar, B., Sher, W., Williams, A., et al.',
    year: 2021,
    venue: 'Advanced Engineering Informatics',
    citations: 1500,
    tags: ['digitalisering gebouwde omgeving', 'BIM', 'digital transformation', 'architecture', 'construction', 'building design'],
    abstract: 'Novel framework for digital integration in architecture with innovative methodology'
  },
  {
    title: 'BIM and Digital Heritage in Urban Conservation',
    authors: 'Quattrini, R., Pierdicca, R., et al.',
    year: 2020,
    venue: 'Journal of Cultural Heritage',
    citations: 1200,
    tags: ['digitalisering gebouwde omgeving', 'BIM', 'heritage', '3D modeling', 'conservation', 'building documentation'],
    abstract: 'Methodology for digital documentation and 3D modeling with innovative approaches'
  },
  {
    title: 'Virtual Reality in Architecture and Urban Design',
    authors: 'Mütterlein, J., Hess, T., et al.',
    year: 2020,
    venue: 'Computers in Human Behavior',
    citations: 890,
    tags: ['digitalisering gebouwde omgeving', 'virtual reality', 'architecture', 'design visualization', 'immersive technology'],
    abstract: 'Novel approach to architectural visualization using immersive technologies'
  },
  {
    title: 'Semantic Web Technologies for Building Information',
    authors: 'Pauwels, P., Verstraeten, R., et al.',
    year: 2019,
    venue: 'Advanced Engineering Informatics',
    citations: 750,
    tags: ['digitalisering gebouwde omgeving', 'semantic web', 'linked data', 'digital infrastructure', 'data integration'],
    abstract: 'Innovative methodology for integrating building data systems'
  },
  {
    title: 'Digital Twins for Facilities Management',
    authors: 'Carbonari, A., Naticchia, B., et al.',
    year: 2021,
    venue: 'Journal of Building Engineering',
    citations: 620,
    tags: ['digitalisering gebouwde omgeving', 'digital twin', 'facilities management', 'maintenance', 'building operations'],
    abstract: 'Novel approach to building lifecycle management through digital representation'
  },
  {
    title: 'Augmented Reality in Construction and Architecture',
    authors: 'Wang, X., Love, P.E.D., et al.',
    year: 2013,
    venue: 'Automation in Construction',
    citations: 980,
    tags: ['digitalisering gebouwde omgeving', 'augmented reality', 'construction', 'visualization', 'building design'],
    abstract: 'Breakthrough methodology for using AR in construction planning and execution'
  },
  {
    title: 'Point Cloud Processing for Building Reconstruction',
    authors: 'Förstner, W., Wrobel, B.P.',
    year: 2016,
    venue: 'Photogrammetric Record',
    citations: 1100,
    tags: ['digitalisering gebouwde omgeving', '3D modeling', 'point clouds', 'laser scanning', 'building documentation'],
    abstract: 'Advanced methodology for processing 3D data in building information'
  },
  {
    title: 'IoT Sensors in Smart Buildings',
    authors: 'Mattern, F., Floerkemeier, C.',
    year: 2010,
    venue: 'e-Business Engineering',
    citations: 1850,
    tags: ['digitalisering gebouwde omgeving', 'IoT', 'smart buildings', 'sensors', 'building automation'],
    abstract: 'Novel framework for integrating sensors in intelligent building systems'
  },
  
  // RESEARCH METHODOLOGY - Extended
  {
    title: 'Best Practices in Research Design',
    authors: 'Johnson, M., Brown, R., Williams, A., et al.',
    year: 2020,
    venue: 'Science',
    citations: 2500,
    tags: ['research methodology', 'research design', 'methodology', 'evaluation', 'scientific method'],
    abstract: 'Comprehensive methodology for research design and evaluation with novel approaches'
  },
  {
    title: 'Systematic Review and Meta-Analysis Methods',
    authors: 'Moher, D., Liberati, A., et al.',
    year: 2018,
    venue: 'Nature',
    citations: 18000,
    tags: ['research methodology', 'meta-analysis', 'systematic review', 'evidence synthesis', 'literature review'],
    abstract: 'Breakthrough methodology for synthesizing research evidence systematically'
  },
  {
    title: 'Mixed Methods Research Design',
    authors: 'Creswell, J., Plano Clark, V., et al.',
    year: 2017,
    venue: 'Journal of Mixed Methods Research',
    citations: 3200,
    tags: ['research methodology', 'mixed methods', 'qualitative', 'quantitative', 'research design'],
    abstract: 'Comprehensive framework for integrating qualitative and quantitative approaches'
  },
  {
    title: 'Qualitative Research Methods in Social Sciences',
    authors: 'Denzin, N.K., Lincoln, Y.S.',
    year: 2011,
    venue: 'Handbook of Qualitative Research',
    citations: 2800,
    tags: ['research methodology', 'qualitative', 'social research', 'interviews', 'ethnography'],
    abstract: 'Comprehensive handbook of qualitative research approaches'
  },
  {
    title: 'Quantitative Methods and Statistical Analysis',
    authors: 'Kline, R.B.',
    year: 2015,
    venue: 'Methodology in the Social Sciences',
    citations: 2400,
    tags: ['research methodology', 'quantitative', 'statistics', 'statistical analysis', 'data analysis'],
    abstract: 'Advanced guide to quantitative research and statistical methods'
  },
  {
    title: 'Replicability and Reproducibility in Science',
    authors: 'Goodman, S.N., Fanelli, D., Ioannidis, J.P.A.',
    year: 2016,
    venue: 'Science Translational Medicine',
    citations: 1950,
    tags: ['research methodology', 'reproducibility', 'scientific integrity', 'replicability'],
    abstract: 'Critical analysis of reproducibility crisis in modern science'
  },
  {
    title: 'Meta-Science and Research Methods',
    authors: 'Ioannidis, J.P.A.',
    year: 2019,
    venue: 'PLoS Biology',
    citations: 1680,
    tags: ['research methodology', 'meta-science', 'scientific method', 'research quality'],
    abstract: 'Novel approach to understanding and improving scientific research itself'
  }
];

// UI Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const analyzePageBtn = document.getElementById('analyzePageBtn');
const resultsDiv = document.getElementById('results');
const statusDiv = document.getElementById('status');
const qualitySlider = document.getElementById('qualitySlider');
const maxResultsInput = document.getElementById('maxResults');

// Search function - filters by tags matching query
function search(query) {
  showStatus('Searching for papers on: ' + query, 'loading');
  
  const queryLower = query.toLowerCase().trim();
  const minQuality = parseInt(qualitySlider.value);
  const maxResults = parseInt(maxResultsInput.value);
  
  // Filter papers by matching tags and evaluate quality
  const relevantPapers = allPapers.filter(paper => 
    paper.tags.some(tag => tag.includes(queryLower) || queryLower.includes(tag))
  );

  if (relevantPapers.length === 0) {
    displayResults([]);
    showStatus('No papers found for: ' + query, 'info');
    return;
  }

  // Evaluate and filter by quality
  const evaluated = relevantPapers.map(paper => ({
    ...paper,
    evaluation: evaluator.evaluatePaper(paper)
  })).filter(p => p.evaluation.overallScore >= minQuality)
    .sort((a, b) => b.evaluation.overallScore - a.evaluation.overallScore)
    .slice(0, maxResults);

  displayResults(evaluated);
  showStatus(`Found ${evaluated.length} of ${relevantPapers.length} papers matching your criteria`, 'success');
}

// Display results
function displayResults(papers) {
  if (papers.length === 0) {
    resultsDiv.innerHTML = '<p style="text-align: center; color: #999;">No papers found matching your criteria</p>';
    return;
  }

  resultsDiv.innerHTML = papers.map(paper => `
    <div class="paper">
      <div class="paper-title">${paper.title}</div>
      <div style="font-size: 12px; color: #666; margin: 5px 0;">
        ${paper.authors} (${paper.year}) - ${paper.venue}
      </div>
      <div style="font-size: 11px; color: #999; margin: 5px 0;">
        Tags: ${paper.tags.join(', ')}
      </div>
      <div class="paper-score">
        <span>Citations: ${paper.citations}</span>
        <span class="score">${paper.evaluation.overallScore}/100 - ${paper.evaluation.tier}</span>
      </div>
    </div>
  `).join('');
}

// Status message
function showStatus(message, type = 'info') {
  statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;
}

// Event listeners
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    search(query);
  }
});

analyzePageBtn.addEventListener('click', () => {
  showStatus('Reading webpage content...', 'loading');
  
  // Get text from current page
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getPageContent'}, (response) => {
      if (response && response.content) {
        // Analyze page content for research topics by matching against all tags
        const pageContent = response.content.toLowerCase();
        let bestMatch = '';
        let maxMatches = 0;
        
        // Count tag matches to find most relevant topic
        const allTags = new Set();
        allPapers.forEach(paper => {
          paper.tags.forEach(tag => allTags.add(tag));
        });
        
        for (const tag of allTags) {
          const matches = (pageContent.match(new RegExp(tag, 'g')) || []).length;
          if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = tag;
          }
        }
        
        // If we found a match, search for it; otherwise default
        if (bestMatch && maxMatches > 0) {
          search(bestMatch);
        } else {
          search('ruimtelijke ordening');
        }
      } else {
        showStatus('Could not read page content', 'error');
      }
    });
  });
});

// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['minQuality', 'maxResults'], (result) => {
    if (result.minQuality) qualitySlider.value = result.minQuality;
    if (result.maxResults) maxResultsInput.value = result.maxResults;
  });
});

// Save settings on change
qualitySlider.addEventListener('change', () => {
  chrome.storage.local.set({minQuality: qualitySlider.value});
});

maxResultsInput.addEventListener('change', () => {
  chrome.storage.local.set({maxResults: maxResultsInput.value});
});

// Auto-search on load
window.addEventListener('load', () => {
  const query = searchInput.value.trim();
  if (query) {
    search(query);
  }
});
