// ─────────────────────────────────────────────────────────────────────────────
// content.js — Single source of truth for all portfolio content
// ─────────────────────────────────────────────────────────────────────────────

export const personal = {
  name:     'Montassar Laboudi',
  title:    'AI & Signal Processing Engineer',
  subtitle: 'Machine Learning · Computer Vision · Scientific Computing',
  tagline:  'I design and deploy AI systems, signal processing pipelines, and data-driven applications on real-world experimental data.',
  email:    import.meta.env.VITE_EMAIL,
  phone:    import.meta.env.VITE_PHONE,
  location: import.meta.env.VITE_LOCATION,
  linkedin: import.meta.env.VITE_LINKEDIN,
  github:   import.meta.env.VITE_GITHUB,
  photo:    import.meta.env.VITE_PHOTO,
  cv:       import.meta.env.VITE_CV,
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS
// Four non-overlapping categories. No technology appears in more than one group.
// ─────────────────────────────────────────────────────────────────────────────

export const skills = [
  {
    category: 'Machine Learning & Deep Learning',
    tags: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'CNN',
      'Transformers',
      'Transfer Learning',
      'NLP',
      'RAG',
      'LangChain',
      'Anomaly Detection',
      'Data Augmentation',
      'Model Optimization',
      'Keras',
    ],
  },
  {
    category: 'Signal Processing & Computer Vision',
    tags: [
      'FFT',
      'STFT',
      'Wavelets',
      'Spectral Analysis',
      'Spectrograms',
      'Digital Filtering',
      'OpenCV',
      'Segmentation',
      '3D Image Processing',
      'IR Imaging',
      'Video Coding',
      'Digital Watermarking',
    ],
  },
  {
    category: 'Data Science & Scientific Computing',
    tags: [
      'NumPy',
      'SciPy',
      'Pandas',
      'SQL',
      'Feature Engineering',
      'Statistical Analysis',
      'Experimental Data Analysis',
      'Matplotlib',
      'Seaborn',
      'Jupyter',
      'Quantitative Analysis',
    ],
  },
  {
    category: 'Software, Tools & Infrastructure',
    tags: [
      'Python',
      'MATLAB',
      'C / C++',
      'TypeScript',
      'FastAPI',
      'Docker',
      'Git',
      'Linux',
      'CI/CD',
      'CUDA',
      'PyQt',
      'Oracle Cloud',
      'Raspberry Pi',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────

export const experience = [
  {
    company: "CEA — Commissariat à l'énergie atomique et aux énergies alternatives",
    logo:     import.meta.env.VITE_LOGO_CEA,
    fallback: 'CEA',
    title: 'Engineer Intern — 3D Data Analysis & Scientific Software',
    period: 'March 2025 – August 2025',
    location: 'Cadarache, France',
    featured: true,
    description:
      'Built scientific software for the WEST nuclear fusion project to process and analyze 3D confocal microscopy data. Designed automated segmentation and feature extraction pipelines on large noisy experimental datasets. Delivered interfaces used directly by physicists and engineers in a multidisciplinary research environment.',
    tags: ['Python', 'PyQt', 'NumPy', 'SciPy', '3D Image Processing', 'Segmentation', 'Scientific Computing'],
  },
  {
    company: 'dB.Sense',
    logo:     import.meta.env.VITE_LOGO_DBSENSE,
    fallback: 'dB',
    title: 'Engineer Intern — Embedded AI & Audio Signal Processing',
    period: 'June 2024 – August 2024',
    location: 'Tunis, Tunisia',
    featured: false,
    description:
      'Built an end-to-end real-time sound event detection system — from audio acquisition and mel-spectrogram extraction to deep learning inference — deployed on Raspberry Pi under strict compute and latency constraints.',
    tags: ['Python', 'TensorFlow', 'Signal Processing', 'Raspberry Pi', 'Embedded Linux', 'Docker'],
  },
  {
    company: 'Sharing Technologies',
    logo:     import.meta.env.VITE_LOGO_SHARING,
    fallback: 'ST',
    title: 'Software Development Intern',
    period: 'June 2023 – August 2023',
    location: 'Tunis, Tunisia',
    featured: false,
    description:
      'Developed a real-time supervision tool for Fujitsu scanners with live status tracking via SignalR in a C#/.NET client-server architecture.',
    tags: ['C#', '.NET', 'SignalR', 'Real-Time'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// featured: true → full-width hero card at the top of the grid
// confidential: true → show a "Confidential — CEA Internal" badge, no GitHub link
// certLink → optional internal anchor link (e.g. to certifications section)
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 'animegpt',
    title: 'AnimeGPT — Full-Stack AI Chatbot with RAG and Vision',
    image: import.meta.env.VITE_IMG_ANIMEGPT,
    github: 'https://github.com/montassar-laboudi/animegpt-rag-chatbot',
    live: 'https://animegpt-rag-chatbot.vercel.app',
    confidential: false,
    featured: true,
    description:
      'A full-stack AI chatbot built on a Retrieval-Augmented Generation architecture. Scrapes and indexes anime content into an Astra DB vector database, retrieves semantically relevant passages at query time, and injects them into the GPT context before generation. GPT-4o vision is integrated so users can upload or paste a screenshot and receive a structured identification response covering the anime, characters, scene context, synopsis, genres, and similar recommendations. Features a persistent conversation sidebar, dark and light themes, dynamic prompt suggestions generated by GPT each session, token-by-token response streaming, and Ctrl+V image paste support.',
    tech: ['Next.js', 'TypeScript', 'OpenAI GPT-4o', 'RAG', 'Astra DB', 'LangChain.js', 'Vercel AI SDK', 'Puppeteer'],
  },
  {
    id: 'iiot',
    title: 'IIoT Intrusion Detection — Machine Learning',
    image: import.meta.env.VITE_IMG_IIOT,
    github: 'https://github.com/montassar-laboudi/iot-iiot-intrusion-detection-ml',
    live: null,
    confidential: false,
    featured: false,
    description:
      'Development and comparison of binary and multi-class classification models for network intrusion detection on the industrial Edge-IIoTset dataset. Models evaluated include SVM, Random Forest, CNN, and LSTM. The project addressed class imbalance, feature selection, and thorough performance evaluation via F1-score, recall, precision, and confusion matrices. Conducted at ENIT.',
    tech: ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Intrusion Detection', 'Feature Engineering', 'IIoT'],
  },
  {
    id: 'rag-oracle',
    title: 'Generative RAG Chatbot — Oracle Cloud',
    image: import.meta.env.VITE_IMG_RAG,
    github: null,
    live: null,
    confidential: false,
    featured: false,
    certLink: '#certifications',
    description:
      'A modular Retrieval-Augmented Generation pipeline combining document ingestion, vector indexing, semantic retrieval, and text generation. The API was built with FastAPI and the full system was containerized with Docker and deployed on Oracle Cloud via a CI/CD workflow. Developed in the context of the OCI Generative AI Professional certification. Architecture structured into independent modules to facilitate maintenance, testing, and future integration.',
    tech: ['Python', 'FastAPI', 'RAG', 'LangChain', 'Vector Database', 'Docker', 'CI/CD', 'Oracle Cloud', 'NLP'],
  },
  {
  id: 'deeplearning',
  title: 'Deep Learning Image Classification',
  image: import.meta.env.VITE_IMG_DEEPLEARNING,
  github: 'https://github.com/montassar-laboudi/MetENet-CNN-Image-Classification-MATLAB-Python',
  live: null,
  confidential: false,
  featured: false,
  description:
    'Design and training of convolutional neural networks for image classification using both MATLAB and Python (PyTorch). The project implements a custom CNN architecture (MetENet) and evaluates it on CIFAR-10, with additional experiments on Fashion-MNIST and SVHN. It includes a comparative analysis between MATLAB and PyTorch implementations, highlighting how differences in preprocessing, initialization, and training settings can impact final accuracy. The work also covers data augmentation, hyperparameter optimization, architecture comparison, and rigorous evaluation using standard classification metrics. Conducted at IMT Atlantique / ENIB.',
  tech: ['MATLAB', 'Python', 'PyTorch', 'CNN', 'CIFAR-10', 'Data Augmentation', 'Hyperparameter Tuning', 'Classification', 'Experimental Validation'],
},
  {
    id: 'acoustics',
    title: 'Acoustic Signal Analysis — CEA WEST / HADES',
    image: import.meta.env.VITE_IMG_ACOUSTICS,
    github: null,
    live: null,
    confidential: true,
    featured: false,
    description:
      'R&D project conducted at CEA Cadarache within the HADES experimental program, in support of the WEST nuclear fusion device. Analyzed highly noisy acoustic signals emitted by actively cooled plasma-facing components under real experimental conditions. Applied FFT, STFT, and wavelet transforms to extract physical signatures correlated with thermal and hydraulic phenomena, enabling quantitative interpretation of experimental measurements.',
    tech: ['Python', 'MATLAB', 'FFT', 'STFT', 'Wavelets', 'Filtering', 'Correlation', 'Spectral Analysis'],
  },
  {
    id: 'emissivity',
    title: 'Thermal Emissivity Module — IR Imaging, CEA/IRFM',
    image: import.meta.env.VITE_IMG_EMISSIVITY,
    github: null,
    live: null,
    confidential: true,
    featured: false,
    description:
      'R&D project at CEA/IRFM in the context of infrared diagnostics on fusion experiments. Designed and integrated a Python module for estimating surface thermal emissivity from IR camera images, embedded directly into the existing data processing pipeline. Reduced computation time by a factor of ten while maintaining accuracy on real experimental data subject to acquisition noise, geometric constraints, and measurement variability.',
    tech: ['Python', 'NumPy', 'SciPy', 'Infrared Imaging', 'Image Processing', 'Optimization', 'Experimental Data'],
  },
  {
    id: 'mpeg',
    title: 'MPEG Video Processing & Digital Watermarking',
    image: import.meta.env.VITE_IMG_MPEG,
    github: 'https://github.com/montassar-laboudi/mpeg-video-compression-scrambling-matlab',
    live: null,
    confidential: false,
    featured: false,
    description:
      'Decoding of MPEG video streams and reconstruction of intra and inter frames from motion vectors and quantization matrices. Implementation of scrambling and descrambling techniques for visual content protection. Design of a digital watermarking and de-watermarking mechanism for embedding and extracting hidden information in image and video sequences. Analysis of the impact of each transformation on visual quality and robustness of embedded data.',
    tech: ['MATLAB', 'MPEG', 'Video Coding', 'Motion Vectors', 'Quantization', 'Scrambling', 'Digital Watermarking'],
  },
  {
    id: 'ofdm',
    title: 'CO-OFDM Chain & 4G/LTE Simulation',
    image: import.meta.env.VITE_IMG_OFDM,
    github: null,
    live: null,
    confidential: false,
    featured: false,
    description:
      'Implementation in MATLAB of a complete CO-OFDM transmission chain including modulation, physical impairment modeling, digital compensation, and performance evaluation via BER, EVM, and OSNR. A separate 4G/LTE OFDM chain was developed covering IFFT/FFT, cyclic prefix insertion, AWGN channel simulation, and constellation analysis under varying noise levels.',
    tech: ['MATLAB', 'OFDM', '4G/LTE', 'Optical Communications', 'BER', 'Numerical Modeling', 'FFT/IFFT'],
  },
  {
    id: 'lpc',
    title: 'LPC Vocoder — Speech Analysis and Synthesis',
    image: import.meta.env.VITE_IMG_LPC,
    github: null,
    live: null,
    confidential: false,
    featured: false,
    description:
      'Implementation of a Linear Predictive Coding vocoder for the analysis and synthesis of speech signals. The project modeled speech using the source-filter approach, separating the excitation signal from the spectral envelope. LPC coefficients were estimated and used to reconstruct the speech signal from a compact parametric representation. The analysis covered the relationship between model order, spectral accuracy, and perceptual quality of the synthesized output.',
    tech: ['MATLAB', 'LPC', 'Speech Processing', 'Source-Filter Model', 'Spectral Analysis', 'Signal Synthesis'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────────────────────

export const education = [
  {
    school: "Bretagne INP — ENIB (École Nationale d'Ingénieurs de Brest)",
    logo:     import.meta.env.VITE_LOGO_ENIB,
    fallback: 'ENIB',
    degree: 'Master of Science — Signal Processing and Telecommunications',
    period: '2024 – 2025',
    location: 'Brest, France',
    notes: 'Specialization in signal processing, telecommunications, and AI. Dual-degree program with ENIT.',
  },
  {
  school: "École Nationale d'Ingénieurs de Tunis (ENIT)",
  logo:     import.meta.env.VITE_LOGO_ENIT,
  fallback: 'ENIT',
  degree: 'Telecommunications Engineering Degree — Specialized in Data Science for Embedded Communications',
  period: '2022 – 2025',
  location: 'Tunis, Tunisia',
  notes: 'Three-year engineering program. Dual degree awarded jointly with Bretagne INP – ENIB.',
},

  {
    school: "IPEIEM — Institut Préparatoire aux Études d'Ingénieurs d'El Manar",
    logo:     import.meta.env.VITE_LOGO_IPEIEM,
    fallback: 'IPEIEM',
    degree: 'Classe Préparatoire aux Grandes Écoles — Physics and Technology (PT)',
    period: '2020 – 2022',
    location: 'Tunis, Tunisia',
    notes:
      'Intensive two-year preparatory program in mathematics, physics, and engineering sciences. Competitive track leading to admission into top engineering schools.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const certifications = [
  {
    name: 'OCI Generative AI Professional',
    issuer: 'Oracle University',
    logo:     import.meta.env.VITE_LOGO_ORACLE,
    fallback: 'Oracle',
    year: '2025',
    description: 'Large language models, RAG architectures, and generative AI deployment on Oracle Cloud.',
  },
  {
    name: 'OCI AI Foundations Associate',
    issuer: 'Oracle University',
    logo:     import.meta.env.VITE_LOGO_ORACLE,
    fallback: 'Oracle',
    year: '2025',
    description: 'Foundations of AI, machine learning, and deep learning on Oracle Cloud Infrastructure.',
  },
  {
    name: 'Deep Learning',
    issuer: 'NVIDIA',
    logo:     import.meta.env.VITE_LOGO_NVIDIA,
    fallback: 'NVIDIA',
    year: '2025',
    description: 'Neural network training, GPU computing, and deep learning model optimization.',
  },
  {
    name: 'Image Processing with MATLAB',
    issuer: 'MathWorks / Coursera',
    logo:     import.meta.env.VITE_LOGO_MATHWORKS,
    fallback: 'MathWorks',
    year: '2025',
    description: 'Segmentation, feature extraction, and quantitative image analysis using MATLAB.',
  },
  {
    name: 'PyTorch & TensorFlow–Keras Bootcamp',
    issuer: 'OpenCV University',
    logo:     import.meta.env.VITE_LOGO_OPENCV,
    fallback: 'OpenCV',
    year: '2025',
    description: 'Development, training, and evaluation of deep learning models with PyTorch and Keras.',
  },
  {
    name: 'Data Analytics Professional',
    issuer: 'DataCamp',
    logo:     import.meta.env.VITE_LOGO_DATACAMP,
    fallback: 'DataCamp',
    year: '2025',
    description: 'Data manipulation, cleaning, exploratory analysis, and visualization with Python.',
  },
]
