# PRD: The "Living Resume" & Knowledge Memory System

## 1. Project Overview
A personal website that acts as a "Headless" digital garden. It uses Notion as the primary database (The Memory), GitHub Actions as the engine (The Pipeline), and GitHub Pages as the host (The Frontend).

## 2. Goals & Objectives
- **Automated Sync:** Changes in Notion should reflect on the website within 24 hours or on-demand.
- **Networking Focus:** A dedicated section to track "Deep Research" on Networking (OSI, TCP/UDP) to address gaps from the SOTI interview.
- **Academic Pivot:** A section documenting the transfer to UofT for Math/Physics.
- **Professionalism:** A clean, minimal UI that demonstrates "Cloud-Native" thinking to a Manager at Questrade.

## 3. Technical Stack
- **Source of Truth:** Notion (API-driven).
- **Framework:** Astro (for speed and easy Markdown/MDX handling).
- **Deployment:** GitHub Pages.
- **CI/CD:** GitHub Actions (to trigger builds from Notion updates).
- **Language:** TypeScript/JavaScript.

## 4. Key Features
### A. The Notion Bridge
- Fetch pages from a specific Notion Database.
- Convert Notion blocks into clean Markdown for Astro.
- Support for: Titles, Dates, Tags, and Code Blocks (for networking scripts).

### B. Content Categories
- **Internal Knowledge Base:** Deep-dives into Networking concepts.
- **Life Progress:** Tracking UofT transition and CS projects (Pokerly, etc.).
- **Goals:** A "Public Roadmap" of technical skills I'm mastering.

### C. The "Cloud Flex" Pipeline
- A GitHub Action script that:
  1. Wakes up on a CRON schedule.
  2. Pulls latest data via Notion API.
  3. Rebuilds the static site.
  4. Deploys to the `gh-pages` branch.

## 5. User Persona (The Reader)
- **Primary:** Engineering Managers (Questrade/Fintech).
- **Secondary:** Myself (as a centralized place for Gemini-driven deep research).

## 6. Success Criteria
- The site is live at `[username].github.io`.
- Adding a page in Notion automatically creates a new URL on the site after the next build.
- No manual code changes are required to update "Blog" or "Note" content.