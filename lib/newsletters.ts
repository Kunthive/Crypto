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

function parseDateFromContent(content: string): string | undefined {
  const lines = content.split("\n")
  
  // Look for date patterns like "October 25, 2023" or "September 07, 2024"
  const datePattern = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (datePattern.test(trimmed)) {
      return trimmed
    }
  }
  
  return undefined
}

export function loadNewsletters(): Newsletter[] {
  if (cached) return cached

  let files: string[] = []
  try {
    // Check if directory exists
    if (!fs.existsSync(NEWSLETTERS_DIR)) {
      console.error(`Newsletters directory not found at: ${NEWSLETTERS_DIR}`)
      cached = []
      return cached
    }
    files = fs.readdirSync(NEWSLETTERS_DIR)
    console.log(`Found ${files.length} files in newsletters directory`)
  } catch (e) {
    // If directory doesn't exist, return empty
    console.error('Error reading newsletters directory:', e)
    cached = []
    return cached
  }

  const newsletters: Newsletter[] = files
    .filter((f) => {
      // Filter out the collection/index file
      const isMarkdown = f.endsWith(".md") || f.endsWith(".markdown")
      return isMarkdown && f !== "MILK.md"
    })
    .map((file) => {
      try {
        const full = path.join(NEWSLETTERS_DIR, file)
        const raw = fs.readFileSync(full, "utf8")
        const id = file.replace(/\.md$|\.markdown$/i, "")
        const title = parseTitleFromContent(raw, id)
        const date = parseDateFromContent(raw)
        return {
          id,
          title,
          content: raw,
          date,
        } as Newsletter
      } catch (error) {
        // Log error but continue processing other files
        console.error(`Error loading newsletter file: ${file}`, error)
        return null
      }
    })
    .filter((n) => n !== null) as Newsletter[]

  // Sort by date if available, otherwise by filename (newest first)
  newsletters.sort((a, b) => {
    if (a.date && b.date) {
      // Parse dates and sort newest first
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA // descending order
    }
    // Fallback to filename sorting
    return b.id.localeCompare(a.id)
  })
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
