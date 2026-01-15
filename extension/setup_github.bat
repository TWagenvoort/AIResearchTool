@echo off
REM GitHub Push Script for Extension

set BASE_DIR=c:\Users\Thijs W\Desktop\Minor Digitalisering in de Gebouwde Omgeving\Python testing\Web Tool
set EXT_DIR=%BASE_DIR%\web-research-extension\extension

echo Navigating to extension folder...
cd /d "%EXT_DIR%"

if exist .git (
    echo Git repository already exists
) else (
    echo Initializing new git repository...
    git init
)

echo.
echo Adding all files...
git add -A

echo.
echo Creating commit...
git commit -m "Initial commit: AI Research Tool Chrome Extension with 51 papers and smart tag filtering" || echo Commit failed or nothing to commit

echo.
echo Setting up remote...
git remote remove origin 2>nul
git remote add origin https://github.com/TWagenvoort/AIResearchTool.git

echo.
echo Configuring branch...
git branch -M main

echo.
echo Ready to push. Repository configured.
git remote -v
git log --oneline -1

echo.
echo To push, run: git push -u origin main
echo You may be prompted for GitHub credentials.
