import type { Profile } from './../types/types.js';
import { tsVueApp } from './vue_ts_app.js';
import { base } from './base.js';
import { devcontainer } from './devcontainer.js';
import { tsLibApp } from './ts_app.js';
import { go } from './go.js';
import { tsPackage } from './ts_package.js';

/**
 * Registry of available profiles.
 */
export const profiles: Record<string, Profile> = {
  base,
  devcontainer,
  tsVueApp,
  tsLibApp,
  go,
  tsPackage,
};

/**
 * Get a profile by name.
 */
export function getProfile(name: string): Profile | undefined {
  return profiles[name];
}

/**
 * List all available profiles.
 */
export function listProfiles(): Profile[] {
  return Object.values(profiles);
}
