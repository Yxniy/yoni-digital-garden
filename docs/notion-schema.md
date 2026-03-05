# Notion Schema (Phase 2 Target)

Use one database per concern to keep sync logic simple and predictable.

## 1) Profile (single row)
- `Name` (title)
- `Tagline` (text)
- `Summary` (text)
- `Location` (text)
- `GitHub` (url)
- `LinkedIn` (url)

## 2) Experience
- `Role` (title)
- `Company` (text)
- `Period` (text)
- `Bullets` (rich text or child blocks)
- `Publish` (checkbox)

## 3) Projects
- `Name` (title)
- `Status` (select: planned/in_progress/active/done)
- `Summary` (text)
- `Stack` (multi-select)
- `Highlights` (rich text or child blocks)
- `Publish` (checkbox)

## 4) Goals
- `Title` (title)
- `Horizon` (text/date)
- `Status` (select)
- `Why` (text)
- `Publish` (checkbox)

## 5) Learning
- `Topic` (title)
- `Stage` (select)
- `Resources` (rich text)
- `Notes` (text)
- `Publish` (checkbox)

## 6) Research Notes
- `Name` (title)
- `Category` (select)
- `Tags` (multi-select)
- `Publish` (checkbox)

Map these to `src/data/*.json` and `src/content/blog/*.md` in the next sync script upgrade.
