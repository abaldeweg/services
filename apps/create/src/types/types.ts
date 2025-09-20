export interface Profile {
  name: string;
  description: string;
  ask?: () => Promise<void | Record<string, any>>;
  run: (options: Record<string, any>) => Promise<void>;
}

export interface TemplateOptions {
  templateName: string;
  targetPath: string;
  variables?: Record<string, string>;
  templateDir?: string;
}

export interface FileObject { path: string; content: string; }
