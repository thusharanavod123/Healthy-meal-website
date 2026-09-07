import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "./site-url";

const original = { ...process.env };
afterEach(() => { process.env = { ...original }; });

describe("getSiteUrl", () => {
  it("normalizes the configured canonical URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = " https://www.example.com/path ";
    expect(getSiteUrl()).toBe("https://www.example.com");
  });
  it("supports Vercel hostnames when configuration is blank", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "fresh-table.vercel.app";
    expect(getSiteUrl()).toBe("https://fresh-table.vercel.app");
  });
});
