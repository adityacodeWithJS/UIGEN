import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

afterEach(() => cleanup());

describe("ToolInvocationBadge", () => {
  describe("str_replace_editor", () => {
    it("shows 'Creating' with filename for create command", () => {
      render(
        <ToolInvocationBadge
          toolName="str_replace_editor"
          args={{ command: "create", path: "src/components/Button.tsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Creating Button.tsx")).toBeDefined();
    });

    it("shows 'Editing' with filename for str_replace command", () => {
      render(
        <ToolInvocationBadge
          toolName="str_replace_editor"
          args={{ command: "str_replace", path: "src/App.tsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Editing App.tsx")).toBeDefined();
    });

    it("shows 'Editing' with filename for insert command", () => {
      render(
        <ToolInvocationBadge
          toolName="str_replace_editor"
          args={{ command: "insert", path: "src/index.ts" }}
          state="call"
        />
      );
      expect(screen.getByText("Editing index.ts")).toBeDefined();
    });

    it("shows 'Viewing' with filename for view command", () => {
      render(
        <ToolInvocationBadge
          toolName="str_replace_editor"
          args={{ command: "view", path: "src/utils.ts" }}
          state="call"
        />
      );
      expect(screen.getByText("Viewing utils.ts")).toBeDefined();
    });

    it("extracts filename from nested path", () => {
      render(
        <ToolInvocationBadge
          toolName="str_replace_editor"
          args={{ command: "create", path: "src/components/ui/Card.tsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Creating Card.tsx")).toBeDefined();
    });
  });

  describe("file_manager", () => {
    it("shows 'Deleting' with filename for delete command", () => {
      render(
        <ToolInvocationBadge
          toolName="file_manager"
          args={{ command: "delete", path: "src/old-file.ts" }}
          state="call"
        />
      );
      expect(screen.getByText("Deleting old-file.ts")).toBeDefined();
    });

    it("shows 'Renaming' with old and new filename for rename command", () => {
      render(
        <ToolInvocationBadge
          toolName="file_manager"
          args={{ command: "rename", path: "src/Foo.tsx", new_path: "src/Bar.tsx" }}
          state="call"
        />
      );
      expect(screen.getByText("Renaming Foo.tsx → Bar.tsx")).toBeDefined();
    });
  });

  describe("state indicators", () => {
    it("shows spinner when state is call", () => {
      const { container } = render(
        <ToolInvocationBadge
          toolName="str_replace_editor"
          args={{ command: "create", path: "App.tsx" }}
          state="call"
        />
      );
      expect(container.querySelector(".animate-spin")).toBeTruthy();
      expect(container.querySelector(".bg-emerald-500")).toBeNull();
    });

    it("shows green dot when state is result", () => {
      const { container } = render(
        <ToolInvocationBadge
          toolName="str_replace_editor"
          args={{ command: "create", path: "App.tsx" }}
          state="result"
        />
      );
      expect(container.querySelector(".bg-emerald-500")).toBeTruthy();
      expect(container.querySelector(".animate-spin")).toBeNull();
    });
  });
});
