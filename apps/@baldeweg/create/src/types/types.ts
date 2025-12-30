export interface Profile {
  id: string
  name: string
  description: string
  ask?: () => Promise<void | Record<string, unknown>>
  run: (options: Record<string, unknown>) => Promise<void>
}

export interface FileObject {
  path: string
  content: string | null
}

export interface Devcontainer {
  name: string
  image: string
  features: { [key: string]: object }
  postCreateCommand?: string[]
  customizations: {
    vscode: {
      extensions: string[]
    }
  }
}
