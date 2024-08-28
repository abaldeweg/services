#!/bin/sh

set -e

echo "Activating feature 'ansible'"

sudo apt update
sudo apt install ansible -y
