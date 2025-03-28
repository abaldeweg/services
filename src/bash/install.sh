#!/bin/sh

set -e

CUSTOM_BASH_FILE="/usr/local/etc/bash_custom.sh"

cat << 'EOF' > "$CUSTOM_BASH_FILE"
#!/bin/bash

git config --global pull.rebase false

if command -v yarn &> /dev/null; then
  PATH="$(yarn global bin):$PATH"
fi

alias ll='ls -alF'

alias push='git push origin --follow-tags'
alias ws="yarn workspace"

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

function dev()
{
  if [ -f yarn.lock ]
    then
      yarn dev
  fi
  if [ -f composer.json ]
    then
      symfony server:start --no-tls
  fi
  if [ -f package-lock.json ]
    then
      npm run dev
  fi
  if [ -f docker-compose.yml ]
    then
      sudo docker-compose up
  fi
  if [ -f go.sum ]
    then
      go run ./
  fi
  if [ -f hugo.yaml ]
    then
      hugo server
  fi
  if [ -f pnpm-lock.yaml ]
    then
      pnpm dev
  fi
}
EOF

echo "source $CUSTOM_BASH_FILE" >> /etc/bash.bashrc
