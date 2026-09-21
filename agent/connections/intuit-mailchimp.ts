import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://ai-inc.mailchimp.com/claude/mcp/v2",
  description: "Manage email campaigns and audiences.",
  auth: connect("ai-inc.mailchimp.com/prj_mVyRSGBkeGLB6BTSjQumrnrlw8Wk"),
});
