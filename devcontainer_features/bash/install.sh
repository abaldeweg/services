#!/bin/sh

set -e

CUSTOM_BASH_FILE="/usr/local/etc/bash_custom.sh"

cat << 'EOF' > "$CUSTOM_BASH_FILE"
#!/bin/bash

git config --global pull.rebase false

alias ll='ls -alF'

alias push='git push origin --follow-tags'

function tag()
{
  if [[ $(git status -s) ]];
    then
      echo "Git repo has uncommitted changes."
      git status -s
    else
      #!/bin/sh

      echo "Latest tags"
      git describe --tags --abbrev=0 $(git rev-list --tags --max-count=3)

      read -p "Version: " tag

      if [ -z "$tag" ]; then
        echo "Error: Version tag cannot be empty."
        exit 1
      fi

      read -p "Subpackage (optional): " subpackage

      if [ -n "$subpackage" ]; then
        subpackage="${subpackage}/"
      fi

      echo "Set tag ${subpackage}v${tag}"

      git tag -a "${subpackage}v${tag}" -m "${subpackage}v${tag}"
  fi
}
EOF

echo "source $CUSTOM_BASH_FILE" >> /etc/bash.bashrc
