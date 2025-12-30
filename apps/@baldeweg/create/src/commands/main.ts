import {
  intro,
  outro,
  multiselect,
  isCancel,
  cancel,
  spinner,
  log,
} from "@clack/prompts"
import { listProfiles, getProfile } from "../profiles/index.js"

export const main = async (): Promise<void> => {
  intro("🎯 Project Generator")

  const profiles = listProfiles()
  const options = profiles.map((profile) => ({
    value: profile.id,
    label: `${profile.name}: ${profile.description}`,
  }))

  const selected = await multiselect({
    message: "Select one or more profiles to run:",
    options,
    required: true,
  })

  if (isCancel(selected)) {
    cancel("❌ Operation cancelled")
    process.exit(0)
  }

  for (const id of selected) {
    const profile = getProfile(id)
    if (!profile) {
      log.error(`❌ Unknown profile: ${id}`)
      continue
    }

    const options = (await profile.ask?.()) || {}

    const s = spinner()
    s.start(`\n🎯 Running profile: ${profile.name}`)
    try {
      await profile.run(options)
      s.stop(`✅ Action '${profile.name}' completed successfully!`)
    } catch (error) {
      s.stop(`❌ Error in action '${profile.name}'.`)
      throw error
    }
  }

  outro("🎉 All selected profiles run!")
}
