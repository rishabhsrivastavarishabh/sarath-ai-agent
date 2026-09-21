import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://api-ssl.bitly.com/v4/mcp",
  description: "Shorten links, generate QR Codes, and track performance",
  auth: connect("api-ssl.bitly.com/prj_mVyRSGBkeGLB6BTSjQumrnrlw8Wk"),
});
