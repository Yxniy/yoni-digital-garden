/**
 * Sync Notion database to src/content/blog/ as Markdown.
 * Requires NOTION_API_KEY and NOTION_DATABASE_ID (or uses default).
 * Run: node scripts/sync-notion.js
 */

const NOTION_DATABASE_ID =
  process.env.NOTION_DATABASE_ID || '318b5575fd4080028428ff565b9cc698';
const OUTPUT_DIR = new URL('../src/content/blog/', import.meta.url);
const STATUS_FILE = new URL('../src/data/sync-status.json', import.meta.url);
const PLACEHOLDER_FILE = 'welcome.md';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'untitled';
}

function getPageTitle(page) {
  if (!page?.properties || typeof page.properties !== 'object') {
    return 'Untitled';
  }

  for (const property of Object.values(page.properties)) {
    if (property?.type === 'title') {
      return property.title?.[0]?.plain_text || 'Untitled';
    }
  }

  return 'Untitled';
}

async function main() {
  const apiKey = process.env.NOTION_API_KEY;
  const fs = await import('fs');
  const path = await import('path');
  const outDir = path.fileURLToPath(OUTPUT_DIR);
  const statusPath = path.fileURLToPath(STATUS_FILE);
  const writeStatus = async (status) => {
    await fs.promises.mkdir(path.dirname(statusPath), { recursive: true });
    await fs.promises.writeFile(statusPath, JSON.stringify(status, null, 2), 'utf8');
  };

  if (!apiKey) {
    console.warn('NOTION_API_KEY not set. Create a placeholder post only.');
    const content = `---
title: Welcome to the Digital Garden
description: Content is synced from Notion. Set NOTION_API_KEY and run npm run sync-notion.
pubDate: ${new Date().toISOString().slice(0, 10)}
tags: []
---

This is a placeholder. Once you configure \`NOTION_API_KEY\` and run \`npm run sync-notion\`, posts from your Notion database will appear here.
`;
    await fs.promises.mkdir(outDir, { recursive: true });
    await fs.promises.writeFile(path.join(outDir, PLACEHOLDER_FILE), content, 'utf8');
    await writeStatus({
      source: 'local-fallback',
      syncedCount: 1,
      lastSyncAt: new Date().toISOString(),
      databaseId: NOTION_DATABASE_ID,
      note: 'NOTION_API_KEY is missing, using fallback content.',
    });
    console.log('Wrote placeholder: src/content/blog/welcome.md');
    return;
  }

  const { Client } = await import('@notionhq/client');
  const { NotionToMarkdown } = await import('notion-to-md');

  const notion = new Client({ auth: apiKey });
  const n2m = new NotionToMarkdown({ notionClient: notion });

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
  });

  await fs.promises.mkdir(outDir, { recursive: true });
  let syncedCount = 0;

  for (const page of response.results) {
    if (page.object !== 'page') continue;
    const title = getPageTitle(page);
    const slug = slugify(title);
    const created = page.created_time?.slice(0, 10) || new Date().toISOString().slice(0, 10);
    const updated = page.last_edited_time?.slice(0, 10);

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const result = n2m.toMarkdownString(mdBlocks);
    const body = typeof result === 'string' ? result : (result?.parent ?? '');

    const frontmatter = `---
title: ${JSON.stringify(title)}
pubDate: ${created}
${updated ? `updatedDate: ${updated}\n` : ''}tags: []
---

`;
    const content = frontmatter + body;
    const filename = `${slug}.md`;
    await fs.promises.writeFile(path.join(outDir, filename), content, 'utf8');
    syncedCount += 1;
    console.log('Synced:', filename);
  }

  await writeStatus({
    source: 'notion',
    syncedCount,
    lastSyncAt: new Date().toISOString(),
    databaseId: NOTION_DATABASE_ID,
  });
  console.log('Sync complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
