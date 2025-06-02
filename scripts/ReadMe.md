# 📁 Scripts

This directory contains utility scripts for fetching and importing tree data into the database.

---

## 📂 `scrape/`

Responsible for **fetching fruit tree data** from external sources (e.g., Budapest FaTér) and saving it in a structured format.

### Structure:

scripts/
├── scrape/
│ ├── fetchTrees.js # Main script to scrape and save data
│ ├── sources/
│ │ └── fruitTreeList.json # List of trees and metadata
│ └── results/
│ ├── data.json # Output JSON dataset
│ └── images/ # (Optional) saved images

perl
Copy
Edit

### Usage:

```bash
npm run scrape
Runs the scraping script:

bash
Copy
Edit
node scripts/scrape/fetchTrees.js
Output is saved to:

bash
Copy
Edit
scripts/scrape/results/data.json
📂 import/
Responsible for importing scraped data into the Supabase database via Payload CMS.

Structure:
python
Copy
Edit
scripts/
├── import/
│   └── import.js             # Reads `data.json` and inserts into Supabase
Usage:
bash
Copy
Edit
npm run import
Runs the import script:

bash
Copy
Edit
node scripts/import/import.js
📝 Notes
Run npm run scrape before npm run import to ensure you're importing fresh data.

Make sure your .env file contains the necessary Supabase environment variables:

env
Copy
Edit
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
