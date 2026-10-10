export interface CopySnippetCommand {
  label: string;
  command: string;
  prefix?: string;
}

export interface CopySnippetProps {
  command?: string;
  commands?: CopySnippetCommand[];
  prefix?: string;
  variant?: "subtle" | "outline" | "ghost";
  copyable?: boolean;
  class?: string;
}
