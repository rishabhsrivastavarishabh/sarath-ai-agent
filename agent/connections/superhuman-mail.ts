import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.mail.superhuman.com/mcp",
  description: "Search and manage your email.",
  auth: connect("mcp.mail.superhuman.com/prj_mVyRSGBkeGLB6BTSjQumrnrlw8Wk"),
});
