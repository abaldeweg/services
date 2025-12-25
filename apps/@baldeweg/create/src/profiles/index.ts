import { tsVueProfile } from './tsVueProfile.js';
import { baseProfile } from './baseProfile.js';
import { devcontainerProfile } from './devcontainerProfile.js';
import { tsLibProfile } from './tsLibProfile.js';
import { goModuleProfile } from './goModuleProfile.js';
import { notebookProfile } from './notebookProfile.js';
import type { Profile } from './../types/types.js';

/**
 * Registry of available profiles.
 */
const profiles: Record<string, Profile> = {
  baseProfile,
  devcontainerProfile,
  tsVueProfile,
  tsLibProfile,
  goModuleProfile,
  notebookProfile
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
