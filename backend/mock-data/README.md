# Mock Data Folder

This folder contains mock/sample data files for seeding the database during development.

## Overview

**Mock data is used for development and testing purposes.** These JavaScript files contain sample data that can be loaded into the MongoDB database to populate the application with test data.

## Files

- **members.js** - Mock data for club members
  - Loads into: `Member` collection
  - Used by: `backend/models/member.js`
  - Schema fields: name, createdAt

- **executives.js** - Mock data for executive board members
  - Loads into: `Executive` collection
  - Used by: `backend/models/exec.js`
  - Schema fields: name, position, image, createdAt

- **projects.js** - Mock data for club projects
  - Loads into: `Project` collection
  - Used by: `backend/models/project.js`
  - Schema fields: title, image, description, status, createdAt

- **sigs.js** - Mock data for Special Interest Groups
  - Loads into: `Sig` collection
  - Used by: `backend/models/sig.js`
  - Schema fields: name, icon, description

- **events.js** - Mock data for club events
  - Loads into: `Event` collection
  - Used by: `backend/models/event.js`
  - Schema fields: title, image, description, createdAt

## Usage

To load all mock data into the database, run:

```bash
npm run seed
```

This will:
1. Connect to MongoDB using the connection string from your `.env` file
2. Clear existing data from all collections (optional - you can modify this in `seed.js`)
3. Load all mock data into the respective collections

The data structure matches the Mongoose schemas defined in the models directory.

## Note

**Remember:** This is mock/test data. In production, ensure you're using real data from your database and not loading these mock files.

## Image URLs

All image and icon fields in the mock data now use full web URLs (starting with `https://`). The frontend will use these URLs directly - no need to construct file paths or prepend server URLs. Examples are provided using placeholder services (Unsplash for photos, CDN services for icons). Replace these with your actual hosted image URLs when ready.
