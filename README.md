# Little Meadow

A cozy shared multiplayer village by Sky Marcel. Plant berries, carrots, and flowers with friends, build cottages and defenses, and battle grumpy towers with a berry cannon. All visitors join the same persistent village without accounts.

## Stack
Next.js App Router, React, TypeScript, original SVG artwork, CSS animation, and Neon Postgres. Clients poll once a second; the server owns crop timers, resource costs, and battles. A database version check prevents concurrent actions from overwriting each other. Each action has a deduplication ID. Browser-local guest tokens restore each player's animal.

## Upload to the existing GitHub repository (Windows / VS Code)
1. Extract this ZIP. Open the folder containing package.json in VS Code.
2. Open Terminal > New Terminal. Run each command below separately:

```powershell
git init
git add .
git commit -m "Add Little Meadow multiplayer game"
git branch -M main
git remote add origin https://github.com/skymar433/little-meadow-game.git
git push -u origin main
```

If Git requests login, sign in to GitHub through its browser prompt. If it says the remote already exists, use `git remote set-url origin https://github.com/skymar433/little-meadow-game.git`. If the push is rejected because the remote has a README or other commits, stop and ask for help; do not force push.

## Deploy to Vercel
1. In Vercel, import skymar433/little-meadow-game. If it is absent, adjust the Vercel GitHub app's repository access.
2. Keep the Next.js preset, root directory ./, and default build settings. Name the project little-meadow-game. Deploy.
3. The UI can deploy before the database is connected, but gameplay will show a connection message until steps 4–7 are complete.
4. Open the Vercel project's Storage tab, add Neon, select its Free plan, and connect it to this project for Production. A separate Preview database is recommended if enabling Preview deployments. Avoid connecting preview code to your production village.
5. Confirm the project has the server environment variable DATABASE_URL from that integration. Do not prefix it with NEXT_PUBLIC_. Never paste a database secret into chat or commit it to GitHub.
6. In the Neon console for this database, open SQL Editor and run the contents of database.sql once. It creates the rooms table and does not delete existing data.
7. Redeploy the latest Vercel deployment so it receives DATABASE_URL.
8. Open the production .vercel.app URL in a private window. Confirm you can harvest a ready patch, plant another, and switch tabs. Two browser sessions should see the same crops and storage. No friend is required for this basic check.
9. Send the new URL to update your portfolio and contest entry. The original Sites game remains online until deliberately removed after the new deployment works.

## Run locally
Install Node.js 22.13 or newer, then:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set DATABASE_URL in .env.local to your Neon development database connection string and run database.sql in that database. Open http://localhost:3000. Use a separate development database to avoid changing the live village while testing. Secrets are excluded by .gitignore.

## Checks
```powershell
npm run check
npm test
npm run build
```

## Fresh start and hosting migration
This project starts a new village in the newly connected database; existing Sites progress and browser identities are not exported. The one-time fresh-start marker only clears a database state once, then future play stays saved. Images, animal designs, animation, timers, and game rules match the current game. The new hosting setup is independent of ChatGPT Sites.

## Resource roles
- Berries: cannon ammo (4 per shot) and cannon upgrades.
- Carrots: cottages and fences.
- Flowers: healing (5 restores 30 health).

Plants mature in 1–2 minutes. Shared picnics and visible village milestones give the team longer goals. Moss, Pip, and Clover help solo visitors. Everyone can play directly from a browser.
