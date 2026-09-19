import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient.js";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/** Sanity image ref -> a sized, hotspot-aware URL. Returns null if unset/unconfigured. */
export function urlForImage(source, { width } = {}) {
  if (!builder || !source) return null;
  let img = builder.image(source).auto("format");
  if (width) img = img.width(width);
  return img.url();
}
