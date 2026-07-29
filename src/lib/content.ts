import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

/**
 * Reads committed content files from the repo. This is used by the public site
 * in BOTH local and GitHub storage modes — GitHub mode only changes where the
 * /keystatic admin writes; the published site always reads the committed files.
 */
export const reader = createReader(process.cwd(), keystaticConfig);
