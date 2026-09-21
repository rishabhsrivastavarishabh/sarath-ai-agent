import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://mcp.commonroom.io/mcp",
  description: "Explore buyer signals and customer intelligence.",
  auth: connect("mcp.commonroom.io/prj_mVyRSGBkeGLB6BTSjQumrnrlw8Wk"),
});
