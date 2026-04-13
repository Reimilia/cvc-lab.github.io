# Add Publication

1. Go to CVC Publications Google Sheet
2. Add new row, and input a unique PaperID. Authors, Title, Location, PublicationType, PublishedDateMonth, and PublishedDateYear are required while PDFLink and ProjectLink are optional.
3. Export the updated sheet to `src/data/Papers.csv`.
4. Run `npm run sync:publications` to regenerate `src/data/papers.json`.
5. Restart Gatsby if it is already running.
