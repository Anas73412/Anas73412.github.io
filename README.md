# Anas Mansoori — Senior Android Developer Portfolio

Static personal portfolio for **Anas Mansoori**, a Senior Android Developer based in Noida, India. The site highlights professional experience, technical skills, and Android case studies (fintech, Mobile POS, NGO survey, education), with resume download and contact links.

**Live site:** [https://Anas73412.github.io/](https://Anas73412.github.io/)

No build tools, npm, or GitHub Actions are required. GitHub Pages serves the files as-is from the repository root.

## Technology stack

| Layer | Choice |
|--------|--------|
| Markup | HTML5 (semantic landmarks) |
| Styles | CSS3 (custom properties, responsive layout, dark/light theme) |
| Behavior | Vanilla JavaScript (progressive enhancement) |
| Hosting | GitHub Pages |
| Fonts | IBM Plex Sans (Google Fonts, with system fallbacks) |

## Repository structure

```
.
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
├── robots.txt
├── sitemap.xml
└── assets/
    ├── Anas_Mansoori_Resume.pdf
    └── images/
        ├── favicon.svg
        ├── apple-touch-icon.png
        └── .gitkeep
```

- `.nojekyll` disables Jekyll processing on GitHub Pages.
- All asset paths are **relative** so the site works from the Pages root URL.

## Local preview

1. Open the project folder on your computer.
2. Double-click `index.html` to open it in a browser, **or** serve the folder:

```bash
# Python 3
python -m http.server 8080
```

3. Visit `http://localhost:8080`.

## Deploy to GitHub Pages

Follow these exact steps:

1. Create a **public** repository named `Anas73412.github.io`.
2. Upload all project files to the **repository root** (same level as this README — do not nest them in a subfolder).
3. Commit them to the `main` branch.
4. Open **Settings**, then **Pages**.
5. Under Build and deployment, select **Deploy from a branch**.
6. Select branch **main** and folder **/(root)**.
7. Click **Save**.
8. Wait one to a few minutes, then visit [https://Anas73412.github.io/](https://Anas73412.github.io/).

No GitHub Actions workflow, npm install, or build command is needed.

### Optional: deploy with Git CLI

```bash
git init
git add .
git commit -m "Publish portfolio to GitHub Pages"
git branch -M main
git remote add origin https://github.com/Anas73412/Anas73412.github.io.git
git push -u origin main
```

Then complete Settings → Pages as in steps 4–7 above.

## Updating content after publish

### Resume

1. Replace `assets/Anas_Mansoori_Resume.pdf` with your latest PDF.
2. Keep the **same filename** so the Download Resume buttons keep working.
3. Commit and push to `main`. Pages will update automatically.

### Projects

1. Edit the Projects section in `index.html` (search for `id="projects"`).
2. Update case-study text, tech badges, or highlights as needed.
3. Only add GitHub or live-demo buttons when you have a real URL — never use `#`.
4. Commit and push to `main`.

### Experience, skills, or contact

1. Edit the matching section in `index.html`.
2. Keep headings semantic (`h1` once for the name, then `h2` per section).
3. Commit and push to `main`.

### Theme

Visitors can switch dark/light with the header toggle. Preference is stored in `localStorage` in their browser.

## SEO and discovery

Configured for the live site:

- Canonical: `https://Anas73412.github.io/`
- Open Graph / Twitter metadata
- JSON-LD `Person` schema
- `robots.txt` → `https://Anas73412.github.io/sitemap.xml`
- `sitemap.xml` → `https://Anas73412.github.io/`

## Contact

- Email: [anasmansoori734@gmail.com](mailto:anasmansoori734@gmail.com)
- LinkedIn: [anas-mansoori-1a946b134](https://www.linkedin.com/in/anas-mansoori-1a946b134)
- GitHub: [Anas73412](https://github.com/Anas73412)

## License

Portfolio content and branding belong to Anas Mansoori.
