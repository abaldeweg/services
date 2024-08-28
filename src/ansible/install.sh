#!/bin/sh
set -e

echo "Activating feature 'ansible'"

sudo apt update && sudo apt install -y pipx && pipx install --include-deps ansible && pipx ensurepath
