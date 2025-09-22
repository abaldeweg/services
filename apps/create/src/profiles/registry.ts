import type { Profile } from './../types/types.js';
import { appVueAction } from './actions/app_vue.js';
import { baseAction } from './actions/base.js';
import { devcontainerAction } from './actions/devcontainer.js';
import { appLibTsAction } from './actions/app_lib_ts.js';
import { appGoAction } from './actions/app_go.js';

/**
 * Registry of available profiles
 */
export const profiles: Record<string, Profile> = {
  base: baseAction,
  devcontainer: devcontainerAction,
  appVueAction: appVueAction,
  appLibTsAction: appLibTsAction,
  appGoAction: appGoAction,
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
