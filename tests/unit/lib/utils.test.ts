import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b", false, null, undefined)).toBe("a b");
  });

  it("returns empty string when no truthy classes", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});
