"use client";

import { Loader2, FilePlus, FilePen, Eye, Trash2, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolInvocationBadgeProps {
  toolName: string;
  args: Record<string, unknown>;
  state: "partial-call" | "call" | "result";
}

function getFileLabel(toolName: string, args: Record<string, unknown>): { icon: React.ReactNode; label: string } {
  const path = (args.path as string) ?? "";
  const filename = path.split("/").filter(Boolean).pop() ?? path;

  if (toolName === "str_replace_editor") {
    const command = args.command as string;
    switch (command) {
      case "create":
        return { icon: <FilePlus className="w-3.5 h-3.5" />, label: `Creating ${filename}` };
      case "str_replace":
      case "insert":
        return { icon: <FilePen className="w-3.5 h-3.5" />, label: `Editing ${filename}` };
      case "view":
        return { icon: <Eye className="w-3.5 h-3.5" />, label: `Viewing ${filename}` };
      default:
        return { icon: <FilePen className="w-3.5 h-3.5" />, label: `Editing ${filename}` };
    }
  }

  if (toolName === "file_manager") {
    const command = args.command as string;
    switch (command) {
      case "delete":
        return { icon: <Trash2 className="w-3.5 h-3.5" />, label: `Deleting ${filename}` };
      case "rename": {
        const newPath = (args.new_path as string) ?? "";
        const newFilename = newPath.split("/").filter(Boolean).pop() ?? newPath;
        return { icon: <ArrowRightLeft className="w-3.5 h-3.5" />, label: `Renaming ${filename} → ${newFilename}` };
      }
    }
  }

  return { icon: <FilePen className="w-3.5 h-3.5" />, label: toolName };
}

export function ToolInvocationBadge({ toolName, args, state }: ToolInvocationBadgeProps) {
  const done = state === "result";
  const { icon, label } = getFileLabel(toolName, args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {done ? (
        <div className={cn("w-2 h-2 rounded-full flex-shrink-0 bg-emerald-500")} />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600 flex-shrink-0" />
      )}
      <span className={cn("flex items-center gap-1.5 text-neutral-700 font-medium")}>
        {icon}
        {label}
      </span>
    </div>
  );
}
