import { VercelRequest, VercelResponse } from "@vercel/node";
import server from "../src/index";
// Only the entry point uses VercelRequest and VercelResponse
export default (req: VercelRequest, res: VercelResponse) => {
  server(req, res);
};
