import type { Profile } from './../types/types.js';
import { appVueAction } from './actions/app_vue.js';
import { baseAction } from './actions/base.js';
import { ciAction } from './actions/ci.js';
import { devcontainerAction } from './actions/devcontainer.js';
import { packageLibTsAction } from './actions/package_lib_ts.js';
import { appModuleGoAction } from './actions/app_module_go.js';

/**
 * Registry of available profiles
 */
export const profiles: Record<string, Profile> = {
  base: baseAction,
  devcontainer: devcontainerAction,
  ci: ciAction,
  appVueAction: appVueAction,
  packageLibTs: packageLibTsAction,
  appModuleGo: appModuleGoAction,
};

/**
 * Get a profile by name
 */
export function getProfile(name: string): Profile | undefined {
  return profiles[name];
}

/**
 * List all available profiles
 */
export function listProfiles(): Profile[] {
  return Object.values(profiles);
}
