import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description:
    "Get the current date, time, weekday, and IANA time zone of the server the agent runs on. Use this whenever a task involves dates, deadlines, scheduling, or relative times like 'today' or 'next Friday'.",
  inputSchema: z.object({}),
  execute() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-CA", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    return {
      iso: now.toISOString(),
      localFormatted: formatter.format(now),
      weekday: now.toLocaleDateString("en-US", { weekday: "long" }),
      date: now.toLocaleDateString("en-CA"),
      time: now.toLocaleTimeString("en-GB"),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
});
