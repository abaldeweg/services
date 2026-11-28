# Workflow

## Agile Manifesto

In this repository, the [Agile Manifesto](https://agilemanifesto.org/) is put into practice.

## Conventional Commits

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). They serve to determine the version number of a release automatically.

- Breaking changes are marked solely with a `!`.
- Commit messages usually use type and subject, the rest is not needed.

## Branching Strategy

This repository applies [Trunk Based Development](https://trunkbaseddevelopment.com/).

Trunk-Based Development is a branching model in which changes are integrated from a PR into the common `main` branch at frequent intervals. In this repository, branches are allowed to be longer-lived, but they must be kept very small. This keeps merge conflicts small, ensures that integration issues are identified early, and maintains the trunk in a state that is always ready for a release.
