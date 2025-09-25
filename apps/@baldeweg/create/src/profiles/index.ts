import type { Profile } from './../types/types.js';
import { appVue } from './app_vue.js';
import { base } from './base.js';
import { devcontainer } from './devcontainer.js';
import { appLibTs } from './app_lib_ts.js';
import { appGo } from './app_go.js';

/**
 * Registry of available profiles
 */
export const profiles: Record<string, Profile> = {
  base,
  devcontainer,
  appVue,
  appLibTs,
  appGo,
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
