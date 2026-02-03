# Project Page Files Breakdown

In the /src folder, you see assets, components and pages folders.

## assets

- react.svg (provided)
- UMCS Logo.png (provided)

## components 

- /footer (simplified code for visualization purposes, proper footer to be implemented later)
- /header (simplified code for visualization purposes, proper footer to be implemented later)
- /navbar (simplified code for visualization purposes, proper footer to be implemented later)
- /tile.jsx: accesses the database and pulls project information, displays each one on an individual tile.
        Tiles show Project name, image and status on the front. When clicked, they flip to show the project description on the other side.
- /tile.css: formats the tile component.
- /layout: determines the format that the browser renders the above components in.

## pages

- Projects.jsx: loads projects, formats the tiles and arranges them in a 3x3 grid. In event of a      backend or database access error, it shows the error and displays simple mock data.
- Projects.css: formats the projects page.

