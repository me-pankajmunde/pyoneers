# PyOneers — AI Automation & Development

Professional website for PyOneers — an AI automation and development company specializing in intelligent systems, agent orchestration, and production-ready ML solutions across industries.

## Features

- **Modern Design**: Refined UI with gradient effects, smooth animations, and professional polish
- **Technical Focus**: Showcases AI agent development, LangGraph orchestration, computer vision, and full-stack capabilities
- **Responsive Layout**: Works seamlessly across desktop, tablet, and mobile devices
- **Interactive Elements**: Scroll animations, hover effects, and engaging user experience
- **Contact Form**: Client-side validation with elegant feedback (ready for backend integration)

## Project Structure

```
├── index.html      # Main landing page with hero, expertise, solutions, tech stack, and contact sections
├── styles.css      # Sophisticated styling with CSS custom properties and animations
├── script.js       # Client-side interactivity and form handling
└── README.md       # This file
```

## Run Locally

From the project root (`/workspaces/pyoneers`), start a local server:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open: **http://127.0.0.1:8000**

## Technical Highlights

The website showcases PyOneers' expertise in:

- 🤖 **AI Agent Development** — LangGraph orchestration, multi-agent systems
- 🧠 **Document Intelligence** — RAG systems, knowledge extraction
- ⚡ **Full-Stack Development** — Django, FastAPI, React Native
- 👁️ **Computer Vision** — Object detection, anomaly detection, real-time inference
- 💬 **Conversational AI** — WhatsApp integration, multi-channel chatbots
- 🗄️ **Data Engineering** — Neo4j, PostgreSQL, vector databases
- 🔒 **Enterprise LLM Deployment** — Azure OpenAI, on-premises solutions

## Next Steps

### Backend Integration
The contact form is currently client-side only. To make it production-ready:

1. Create a FastAPI or Django endpoint to handle form submissions
2. Update `script.js` to POST to your API
3. Add email notifications (SendGrid, AWS SES, etc.)
4. Implement rate limiting and CAPTCHA

### Deployment Options

- **Static Hosting**: Netlify, Vercel, GitHub Pages, Cloudflare Pages
- **Full Stack**: Deploy with Django/FastAPI backend on AWS, Azure, or DigitalOcean
- **CDN**: CloudFront, Cloudflare for global performance

### Enhancements

- Add custom domain and SSL certificate
- Implement analytics (Google Analytics, Plausible, etc.)
- Add blog section for technical content
- Create case study pages with detailed project breakdowns
- Add testimonials and client logos
