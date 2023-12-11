import { z } from "zod";
import { wooCommerceLineItemSchema } from "./sharedTypes";

export function parseWooCommerceLineItemsJson(json: any) {
  return z.array(wooCommerceLineItemSchema).parse(json);
}
