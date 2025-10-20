export interface Profile {
  id: string;
  name: string;
  description: string;
  ask?: () => Promise<void | Record<string, any>>;
  run: (options: Record<string, any>) => Promise<void>;
}

export interface FileObject {
  path: string;
  content: string | null;
}

export interface Devcontainer {
  name: string;
  image: string;
  features: { [key: string]: {} };
  postCreateCommand: string | undefined;
  customizations: {
    vscode: {
      extensions: string[];
    };
  };
}
