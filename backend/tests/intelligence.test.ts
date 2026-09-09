import { describe, expect, it } from "vitest";

import {
  getPredictionFreshness,
} from "../src/features/intelligence/services/freshness.service";

describe("prediction freshness", () => {
  it("returns unavailable when dates are missing", () => {
    expect(
      getPredictionFreshness(null, null),
    ).toBe("unavailable");
  });

  it("returns expired for an expired prediction", () => {
    const generated = new Date(
      Date.now() - 3 * 60 * 60 * 1000,
    );

    const expires = new Date(
      Date.now() - 60 * 60 * 1000,
    );

    expect(
      getPredictionFreshness(
        generated,
        expires,
      ),
    ).toBe("expired");
  });

  it("returns fresh for a healthy prediction", () => {
    const generated = new Date();

    const expires = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    );

    expect(
      getPredictionFreshness(
        generated,
        expires,
      ),
    ).toBe("fresh");
  });
});