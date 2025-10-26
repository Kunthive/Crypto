import fs from "fs"
import path from "path"

export interface Newsletter {
  id: string
  title: string
  content: string
  date?: string
}

const NEWSLETTERS_DIR = path.join(process.cwd(), "public", "newsletters")

let cached: Newsletter[] | null = null

function parseTitleFromContent(content: string, fallback: string) {
  const lines = content.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("# ")) return trimmed.replace(/^#\s+/, "").trim()
  }
  return fallback
}

export function loadNewsletters(): Newsletter[] {
  if (cached) return cached

  let files: string[] = []
  try {
    files = fs.readdirSync(NEWSLETTERS_DIR)
  } catch (e) {
    // If directory doesn't exist, return empty
    cached = []
    return cached
  }

  const newsletters: Newsletter[] = files
    .filter((f) => f.endsWith(".md") || f.endsWith(".markdown"))
    .map((file) => {
      const full = path.join(NEWSLETTERS_DIR, file)
      const raw = fs.readFileSync(full, "utf8")
      const id = file.replace(/\.md$|\.markdown$/i, "")
      const title = parseTitleFromContent(raw, id)
      return {
        id,
        title,
        content: raw,
      } as Newsletter
    })

  // Sort newest-first by filename descending (you can change to date if frontmatter added)
  newsletters.sort((a, b) => b.id.localeCompare(a.id))
  cached = newsletters
  return newsletters
}

export function getAllNewsletters(): Newsletter[] {
  return loadNewsletters()
}

export function getNewsletterById(id: string): Newsletter | null {
  const all = loadNewsletters()
  return all.find((n) => n.id === id) || null
}

export function getLatestNewsletters(count = 3): Newsletter[] {
  return getAllNewsletters().slice(0, count)
}
