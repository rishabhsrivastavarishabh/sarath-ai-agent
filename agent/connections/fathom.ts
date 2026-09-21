import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://api.fathom.ai/mcp",
  description: "AI meeting notes and transcripts",
  auth: connect("api.fathom.ai/prj_mVyRSGBkeGLB6BTSjQumrnrlw8Wk"),
});
