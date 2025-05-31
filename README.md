# PlatterVerse - A Recipe Book Website

## 📖 Overview
A modern web application that helps users discover cooking recipes from around the world. Connects to TheMealDB API to provide:
- Instant recipe searches
- Categorized meal browsing
- Detailed cooking instructions
- Responsive design for all devices

## ✨ Key Features
**Search & Discovery**
- Real-time recipe search by name
- 7+ category filters (Beef, Vegetarian, Desserts, etc.)
- Area/origin based recipe filtering

**Recipe Experience**
- Complete ingredient lists with measurements
- Step-by-step cooking instructions
- High-quality food images
- Quick-view modal for instructions

## Usage
1. Search: Type a dish name + Enter
2. Browse: Click category buttons
3. View: Click any recipe card
4. Instructions: Toggle with "View Recipe" button

## 💻 Technical Stack
**Frontend**
- Semantic HTML5 markup
- CSS
- JavaScript
- Responsive design principles


## 🌐 API Integration
**TheMealDB** (https://www.themealdb.com)  
A free crowd-sourced recipe API containing:
- 300+ recipes with images
- 14 meal categories
- 25+ regional cuisines
- Regularly updated database

**TheMealDB API Usage**
- Base URL: `https://www.themealdb.com/api/json/v1/1/`
- Key Endpoints:
  - `search.php?s={query}` (Search)
  - `filter.php?c={category}` (Filter)
  - `lookup.php?i={id}` (Details)

## 🔄 System Workflow

### Architecture Overview
```mermaid
graph TD
    A[User Interface] -->|Search Query| B(API Handler)
    A -->|Category Select| B
    B -->|Fetch Data| C[TheMealDB API]
    C -->|JSON Response| B
    B -->|Parse Data| D[UI Renderer]
    D -->|Display| A
