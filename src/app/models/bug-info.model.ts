export interface BugInfo {
  id: string;
  title: string;
  description: string;
  errorMessage: string;
  file: string;
  line: number;
  fixSuggestion: string;
  triggerLabel: string;
}
