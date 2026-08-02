# میز ویرایش وب — Web edit workflow

**Tool:** `gosan-website/editor.html` on the local preview server (port 8731).
It wraps the real magazine site; the editor works on the exact page readers see.
The originals in `article-content.jsx` are never touched by this tool.

## The flow

1. **Editor** opens `http://localhost:8731/editor.html`, picks the essay, enters
   their name, presses **آغاز ویرایش**. The article body becomes editable in
   place (gold dashed outline). Form-only edits per the شیوه‌نامه — the banner
   says so permanently.
2. **ذخیره** posts the edit to the local server → saved here as
   `pending/<slug>.json` (editor, timestamp, edited HTML, original HTML).
   If the editor works remotely, **دریافت JSON** downloads the same file to
   email in — identical to the author-proof feedback flow.
3. **Editor-in-chief review:** `editor.html?review=<slug>` opens the essay with
   the word-level diff panel — green = added, red = removed, with editor name,
   time, and changed-word count.
4. **Approval happens in chat.** Nothing is applied automatically. On approval,
   the assistant applies the changes to `article-content.jsx` (the real site),
   runs the QC gate, commits and pushes, and moves the JSON to `applied/`.
   Rejected edits move to `rejected/` with a note.

## Folders

- `pending/` — saved, awaiting the editor-in-chief
- `approved/` — approved in chat, awaiting application
- `applied/` — applied to the live site (kept as the audit trail)

## Boundaries

- Saving requires the local server; the tool is not on the public site
  (`noindex`, not linked anywhere).
- The diff is on visible text; structural HTML damage would show up as mass
  changes — reject and re-edit rather than approving noise.
- Content changes (rewording an author) are out of scope by house rule №1 —
  they go back to the author via the proof, never through this tool.
