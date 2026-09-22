import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defineTool } from "eve/tools";
import { z } from "zod";

// Notes persist locally in the (git-ignored) .eve data directory so they
// survive across sessions without needing any external service.
const NOTES_FILE = path.join(process.cwd(), ".eve", "data", "work-notes.json");

type WorkNote = {
  id: string;
  title: string;
  body: string;
  tag: string | null;
  createdAt: string;
};

async function loadNotes(): Promise<WorkNote[]> {
  try {
    const raw = await readFile(NOTES_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WorkNote[]) : [];
  } catch {
    return [];
  }
}

async function saveNotes(notes: WorkNote[]): Promise<void> {
  await mkdir(path.dirname(NOTES_FILE), { recursive: true });
  await writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), "utf8");
}

export default defineTool({
  description:
    "A persistent work notepad for the user. Use it to save notes, decisions, action items, and follow-ups so they can be recalled later. Actions: 'add' stores a new note (title required, body and optional tag); 'list' returns all saved notes, newest first, optionally filtered by tag; 'read' returns one note by id.",
  inputSchema: z.discriminatedUnion("action", [
    z.object({
      action: z.literal("add"),
      title: z.string().min(1).max(200),
      body: z.string().max(10000).default(""),
      tag: z.string().max(50).optional(),
    }),
    z.object({
      action: z.literal("list"),
      tag: z.string().max(50).optional(),
    }),
    z.object({
      action: z.literal("read"),
      id: z.string().min(1),
    }),
  ]),
  label: {
    start: (input) =>
      input.action === "add" ? `Add note: ${input.title}` : input.action === "read" ? "Read note" : "List notes",
  },
  async execute(input) {
    const notes = await loadNotes();

    if (input.action === "add") {
      const note: WorkNote = {
        id: randomUUID().slice(0, 8),
        title: input.title,
        body: input.body,
        tag: input.tag ?? null,
        createdAt: new Date().toISOString(),
      };
      notes.push(note);
      await saveNotes(notes);
      return { saved: note, totalNotes: notes.length };
    }

    if (input.action === "list") {
      const visible = (input.tag ? notes.filter((note) => note.tag === input.tag) : notes)
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map(({ id, title, tag, createdAt }) => ({ id, title, tag, createdAt }));
      return { count: visible.length, notes: visible };
    }

    const note = notes.find((candidate) => candidate.id === input.id);
    if (!note) {
      return { found: false, id: input.id, hint: "No note with that id. Use action 'list' to see available ids." };
    }
    return { found: true, note };
  },
});
