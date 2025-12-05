# CEO Digital Twin Based on Earnings Call Transcripts

An LLM-based digital twin of Jamie Dimon (CEO of JPMorgan Chase) trained on 17 years of earnings call transcripts to predict his responses to analyst questions.

## 🌐 Interactive Demo Website

- [CEO Digital Twin Demo Website](https://ashleyyu5801-png.github.io/CEO-digital-twin-based-on-earnings-call-website/)

## 📊 Project Overview

This project builds and evaluates an LLM-based digital twin of Jamie Dimon using earnings call transcripts and public financial filings. We investigate whether the model can generate realistic responses to analyst questions and evaluate accuracy across multiple dimensions.

### Key Results

| Metric | Result |
|--------|--------|
| Semantic Similarity | 0.81 (FinBERT) |
| Tone Alignment | 0.45-0.52 |
| Training Data | 2,115 Q&A pairs |
| Test Data | 43 Q&A pairs (2025 Q1-Q3) |
| Time Period | July 2007 - October 2024 |

## 🔬 Methodology

Four specifications were tested:

| Spec | Description | Semantic Sim |
|------|-------------|--------------|
| 1 | Random 500 Q&A pairs | 0.807 |
| 2 | Most Recent 500 Q&A pairs | 0.784 |
| 3 | Recent Q&A + 10-Q Summary | 0.774 |
| **4** | **Persona Summary + 10-Q** | **0.815** |

## 📁 Repository Structure

```
├── README.md                          # This file
├── index.html                         # Interactive demo website
├── styles.css                         # Website styling
├── script.js                          # Website interactivity
│
├── Code/                              # Development pipeline
│   ├── 01_process_test_data.ipynb     # Process SeekingAlpha test transcripts
│   ├── 02_summarize_10Q.ipynb         # Summarize 10-Q filings with GPT-4o
│   ├── 03_four_specifications.ipynb   # Generate responses (4 specs)
│   ├── 04_evaluation.ipynb            # Evaluation (FinBERT, NLI, Tone)
│   ├── 05_synthetic_audio.ipynb       # Generate TTS audio
│   └── 06_generate_tables.ipynb       # Generate LaTeX tables
│
├── Data/                              # Raw input data
│   ├── CIQ transcripts/
│   │   └── 46625H100.csv              # WRDS Capital IQ transcripts (2007-2024)
│   ├── SeekingAlpha transcripts 2025/
│   │   ├── jpmorgan_chase_2025q1.txt  # Q1 2025 test transcript
│   │   ├── jpmorgan_chase_2025q2.txt  # Q2 2025 test transcript
│   │   └── jpmorgan_chase_2025q3.txt  # Q3 2025 test transcript
│   ├── 2025q1.pdf                     # 10-Q filing Q1 2025
│   ├── 2025q2.pdf                     # 10-Q filing Q2 2025
│   └── 2025q3.pdf                     # 10-Q filing Q3 2025
│
├── Processed Data/                    # Intermediate outputs
│   ├── 10Q_summaries.json             # GPT-4o summaries of 10-Q filings
│   ├── speaker_turns.csv              # Parsed speaker turns from transcripts
│   └── test_qa_pairs.jsonl            # Extracted test Q&A pairs
│
└── Results/                           # Final outputs
    ├── spec1_random_500_*.json        # Specification 1 results
    ├── spec2_recent_500_*.json        # Specification 2 results
    ├── spec3_recent_500_plus_10q_*.json  # Specification 3 results
    ├── spec4_persona_plus_10q_*.json  # Specification 4 results
    └── synthetic audio/               # Text-to-speech audio (172 files)
        ├── spec1_random_500/          # 43 audio files
        ├── spec2_recent_500/          # 43 audio files
        ├── spec3_recent_500_plus_10q/ # 43 audio files
        └── spec4_persona_plus_10q/    # 43 audio files
```

## 🚀 Pipeline

1. **Data Collection**: Historical transcripts from WRDS Capital IQ (2007-2024), test transcripts from SeekingAlpha (2025)
2. **Preprocessing**: Extract Q&A pairs where Jamie Dimon responds to analyst questions
3. **10-Q Processing**: Summarize quarterly 10-Q filings using GPT-4o
4. **Response Generation**: Generate synthetic responses using GPT-4o with 4 different prompting strategies
5. **Evaluation**: Measure semantic similarity (FinBERT), informational accuracy (NLI), and tone alignment (Loughran-McDonald)
6. **Audio Synthesis**: Convert generated responses to speech using OpenAI TTS

## 🎧 Synthetic Audio

We generated text-to-speech audio for all 43 test responses across 4 specifications (172 total audio files). Listen to samples on the demo website.

## 👥 Research Team

*Author names are listed in alphabetical order by surname.*

- Yufei Chen
- Jiehang Yu
- Karina Zhang

## 📚 Data Sources

- **Training Data**: WRDS Capital IQ Transcripts (JPMorgan Chase earnings calls, 2007-2024)
- **Test Data**: SeekingAlpha (JPMorgan Chase earnings calls, Q1-Q3 2025)
- **Financial Data**: SEC 10-Q filings (Q1-Q3 2025)

## 🔗 Links

- [Full Evaluation Results Data (Dropbox)](https://www.dropbox.com/scl/fo/htkfxh4b4779z5r4aa1f4/ALGOhpKNLWzcNSB9M3zuLW0?rlkey=nkkukhf3zs4gt5gfe3td0ttjn&st=07ofqp4j&dl=0)
