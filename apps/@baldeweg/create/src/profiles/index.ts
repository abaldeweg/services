import type { Profile } from './../types/types.js';
import { appVue } from './vue_ts_app.js';
import { base } from './base.js';
import { devcontainer } from './devcontainer.js';
import { appLibTs } from './ts_app.js';
import { appGo } from './go_app.js';
import { tsPackage } from './ts_package.js';
import { goPackage } from './go_package.js';

/**
 * Registry of available profiles
 */
export const profiles: Record<string, Profile> = {
  base,
  devcontainer,
  appVue,
  appLibTs,
  appGo,
  tsPackage,
  goPackage
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
