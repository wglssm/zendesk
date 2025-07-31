import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with Jest DOM matchers
expect.extend(matchers);

// Automatically clean up after each test
afterEach(() => {
  cleanup();
});
