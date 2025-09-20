import type { Profile } from './../types/types.js';
import { baseAction } from './actions/base.js';
import { devcontainerAction } from './actions/devcontainer.js';

/**
 * Registry of available profiles
 */
export const profiles: Record<string, Profile> = {
  base: baseAction,
  devcontainer: devcontainerAction,
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
