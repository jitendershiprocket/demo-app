# Project Phoenix Demo Repo

Angular 17 demo app for testing the **Project Phoenix** self-healing agent.

## Intentional Bug

`UserService.getUserId()` crashes when user is not found:
- **Error:** `TypeError: Cannot read properties of undefined (reading 'id')`
- **File:** `src/app/services/user.service.ts` (line 27)
- **Fix:** Add null check, e.g. `return user?.id ?? null`

## Commands

```bash
npm install
npm start          # ng serve
npm run build      # ng build
npm run test       # ng test (1 test FAILS due to bug)
npm run lint       # ng lint (passes)
```

## Push to GitHub

```bash
cd demo-repo

# Create new repo on GitHub first, then:
git init
git add .
git commit -m "chore: Project Phoenix demo app with intentional bug"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/demo-repo.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username (or org).

## After Push

Add this repo URL to Project Phoenix config:

```yaml
# config/repos.yaml
repos:
  - name: demo-repo
    url: https://github.com/YOUR_USERNAME/demo-repo
    default_branch: main
```

Then run Repo Analyzer:
```bash
cd ..  # back to opus_4.6
python scripts/run_repo_analyzer.py
```
