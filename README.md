# CEO Digital Twin Based on Earnings Call Transcripts

An LLM-based digital twin of Jamie Dimon (CEO of JPMorgan Chase) trained on 17 years of earnings call transcripts to predict his responses to analyst questions.

## 🌐 Project Website

Open `index.html` in your browser to view the interactive project demonstration.

### Quick Start
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use a local server (recommended for best performance)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 📊 Project Overview

This project builds and evaluates an LLM-based digital twin of a single high-profile corporate executive using their earnings call transcripts and public information. We investigate whether the model can generate realistic responses to analyst questions and evaluate the accuracy of predicted responses.

### Key Findings

| Metric | Result |
|--------|--------|
| Semantic Similarity | ~0.81 (FinBERT) |
| Tone Alignment | ~0.45-0.52 |
| Training Data | 2,115 Q&A pairs |
| Time Period | July 2007 - October 2024 |
| Test Samples | 43 Q&A pairs (2025 Q1-Q3) |

## 🔬 Methodology

Four specifications were tested:

1. **Random 500 Q&A** - Randomly sampled historical Q&A pairs
2. **Recent 500 Q&A** - Most recent Q&A pairs (temporal focus)
3. **Recent Q&A + 10-Q** - Adding quarterly financial context
4. **Persona + 10-Q** - Compressed persona summary approach (best performing)

## 📁 Project Structure

```
├── index.html              # Project website
├── styles.css              # Website styling
├── script.js               # Interactive features
├── Final Submission.tex    # Research paper (LaTeX)
├── Final Submission.pdf    # Research paper (PDF)
└── Results/
    ├── spec1_random_500_*.json           # Spec 1 generated responses
    ├── spec2_recent_500_*.json           # Spec 2 generated responses
    ├── spec3_recent_500_plus_10q_*.json  # Spec 3 generated responses
    ├── spec4_persona_plus_10q_*.json     # Spec 4 generated responses
    ├── Evaluation/
    │   ├── NLI/            # Natural Language Inference results
    │   ├── SBERT/          # Semantic similarity results
    │   └── Tone/           # Tone alignment results
    └── synthetic audio/
        ├── spec1_random_500/       # 43 audio files
        ├── spec2_recent_500/       # 43 audio files
        ├── spec3_recent_500_plus_10q/  # 43 audio files
        └── spec4_persona_plus_10q/     # 43 audio files
```

## 🎧 Synthetic Audio

We generated text-to-speech audio for all 43 test responses across all 4 specifications (172 total audio files). These demonstrate how the AI-generated responses sound when spoken.

## 👥 Research Team

*Author names are listed in alphabetical order by surname.*

- Yufei Chen
- Jiehang Yu
- Karina Zhang

## 🔗 Links

- [Full Results Data (Dropbox)](https://www.dropbox.com/scl/fo/htkfxh4b4779z5r4aa1f4/ALGOhpKNLWzcNSB9M3zuLW0?rlkey=nkkukhf3zs4gt5gfe3td0ttjn&st=07ofqp4j&dl=0)
