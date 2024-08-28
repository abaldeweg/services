#!/bin/sh
set -e

echo "Activating feature 'ansible'"

sudo apt update && sudo apt install -y pipx && sudo pipx install --system-site-packages --include-deps ansible
