#!/bin/sh
set -e

echo "Activating feature 'ansible'"

sudo apt update && sudo apt install -y pipx && pipx install --system-site-packages --include-deps ansible && pipx ensurepath
