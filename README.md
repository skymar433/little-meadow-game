# Little Meadow — expanded village update

A cozy shared multiplayer village by Sky Marcel. Everyone tends the same persistent village without accounts or installs.

## What's new
- Ten crops: berries, carrots, flowers, wheat, tomatoes, corn, pumpkins, blueberries, radishes, and golden melons. Seasonal planting, different sale prices, sunshine bonuses, and watering requirements make crop choices matter.
- Five-level upgrade tracks for cottages, fences, cannons, bakery, greenhouse, market, workshop, personal cottages, plot size, watering cans, tools, and storage barns. Village levels unlock crops and facilities. Existing higher-level saved upgrades are retained.
- Ten cooking and crafting recipes, shared delivery orders, coins, fishing, rare golden fish, and six decoration spots.
- Greenhouses accelerate crops 3% per level; bakery and workshop upgrades shorten recipe timers; markets improve earnings.
- Chickens and cows produce eggs and milk; carrots feed them. Community windmill and bridge projects unlock village benefits. Personal keepsake trades, peaceful neighbor gifts, reputation, and daily goals add cooperative activities.
- Existing battles, picnics, helpers, walking animals, and shared progress remain.

## Update your existing Vercel game
1. Extract this ZIP into a temporary folder.
2. Open your EXISTING repository folder in VS Code: C:\Users\skyle\Downloads\Little_Meadow_Vercel\little-meadow-game
3. Copy the CONTENTS of the extracted little-meadow-game folder into that existing folder and choose Replace when asked. Keep the existing folder, its .git directory, and any .env.local file.
4. In Terminal > New Terminal, run:

```powershell
git status
git add .
git commit -m "Expand Little Meadow with crops, cooking and activities"
git push
```

Do not run git init or add a new remote again. If git status does not recognize a repository, open the original folder. Do not force push.

Vercel automatically builds the new commit using your existing GitHub connection. Your URL stays https://little-meadow-game.vercel.app/ . Your existing Neon connection and DATABASE_URL stay the same. No new SQL, database, environment variables, or hosting project are required.

Expansion data is added to the existing saved JSON state. The original one-time fresh-start marker is unchanged, so an already initialized village is not reset. After Vercel says Ready, refresh the live game. Activities and World should appear next to Garden, Village, and Battle. Check your saved resources and upgrades, then deliver a market order or sell crops.

## The new loop
Reach village level 2 or upgrade cottages to unlock wheat, tomatoes, and corn. Seasons rotate every 15 minutes; plants already growing remain harvestable after the season changes. Thirsty crops must be watered before harvesting. Grow crops, deliver orders, and spend shared coins on facilities. The greenhouse unlocks at village level 4. Build one for pumpkins; upgrade it to level 2 for blueberries. Cook in the bakery and craft in the workshop. Finished recipes arrive automatically when the village is next opened. Place crafted decorations under Decorate, then see them in Village. Fishing unlocks at 180 harvest points. Personal cottage upgrades are cosmetic and use shared coins.

## Stack and persistence
Next.js App Router, React, TypeScript, SVG artwork, CSS animation, Neon Postgres. Clients poll once a second. Server actions enforce crop gates, costs, timers, and stock accounting. Database version checks prevent concurrent overwrites; action IDs prevent repeated requests from charging twice. Browser-local guest tokens restore each player's animal.

## Local development
Use Node.js 22.13 or newer. Run npm install, copy .env.example to .env.local, set DATABASE_URL to a separate Neon development database, and run database.sql there. Then run npm run dev. Do not commit secrets or use production credentials for local experiments.

## Verification
Run npm run check, npm test, and npm run build. Ten automated test files cover farming, battles, helpers, picnics, avatars, bulk actions, saved-state compatibility, and expanded activities. Expansion checks include atomic costs, shared station locking, offline completion exactly once, order uniqueness, fishing, decoration placement, upgrade caps, seasonal gates, water requirements, animal production, community projects, escrow trades, and daily rewards.

Type checking, automated tests, and production build passed. Browser visual testing was unavailable in the build environment. This package has not yet been deployed to your Vercel project; check the live update after pushing.

## Production versus preview
This ZIP is the real Vercel multiplayer app with the existing Neon backend. It does not include the browser-local preview adapter, sample trade player, demo coins, clock controls, or sandbox reset button. Your live saved progress remains.

## Level 50 meadow expansion
Core cottages, fences and cannon, facility buildings, personal cottages and all four upgrade tracks now reach level 50. Existing saves are retained. Village progression reaches level 50. Cottages expand the scrollable neighborhood to 50 visible homes; milestones add decorative landmarks at levels 10, 20, 30, 40 and 50. Home styling, fencing and cannon styling evolve at milestones. Plot upgrades grow the garden to 112 patches. Greenhouse growth has a 35% minimum duration and tending routes a 350ms minimum. Animal family size remains five of each species.

Update your existing GitHub checkout with these files, retain your .git directory and local environment file, then commit and push to main. Your existing Vercel project automatically deploys the update; no SQL changes are required.
