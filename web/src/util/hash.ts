import crypto from "crypto";

export default (input: string) =>
  crypto.createHash("sha1").update(input).digest("hex");
