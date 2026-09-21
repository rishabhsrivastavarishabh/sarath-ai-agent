import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.attio.com/mcp",
  description: "Work with CRM records and relationships.",
  auth: connect("mcp.attio.com/prj_mVyRSGBkeGLB6BTSjQumrnrlw8Wk"),
});
