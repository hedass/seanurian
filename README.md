# Sean Zeliq Urian - Resume Website

This repository contains the code for my professional resume website, built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Dark mode toggle
- Interactive timeline for work experience
- Skill badges with hover effects
- PDF download option
- Clean, professional layout

## Setup GitHub Pages

To deploy this resume website using GitHub Pages:

1. Push this repository to GitHub (create a new repository on GitHub first)

   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. Go to your repository on GitHub
3. Navigate to Settings > Pages
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select "main" and "/ (root)" folder, then click Save
6. Wait a few minutes for the site to deploy
7. Your site will be published at `https://yourusername.github.io/your-repo-name/`

## Local Development

To work on this website locally:

1. Clone the repository
2. Open the folder in your code editor
3. Open `index.html` in your browser

## Converting LaTeX to PDF

If you need to update the PDF download:

1. Compile your LaTeX resume file to PDF
   ```
   pdflatex resume.tex
   ```
2. Move the generated PDF to this project folder

## License

This project is licensed under the MIT License.
