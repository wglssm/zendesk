import "@testing-library/jest-dom";

declare global {
  namespace Vi {
    interface JestAssertion {
      toBeInTheDocument(): void;
      toBeVisible(): void;
      toHaveTextContent(text: string): void;
      toHaveAttribute(attr: string, value?: string): void;
    }
  }
}

// This exports an empty object to make this file a module
export {};
