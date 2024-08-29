#!/bin/sh

set -e

CUSTOM_BASH_FILE="/usr/local/etc/bash_custom.sh"

cat << 'EOF' > "$CUSTOM_BASH_FILE"
#!/bin/bash

PATH="$(yarn global bin):$PATH"

alias ll='ls -alF'

alias push='git push origin --follow-tags'
alias ws="yarn workspace"

function tag()
{
  if [[ $(git status -s) ]];
    then
      echo "Git repo has uncommitted changes."
      git status -s;
    else
      git tag -a "v${1}" -m "v${1}";
  fi
}

function dev ()
{
  if [ -f yarn.lock ]
    then
      yarn dev
  fi
}

function build ()
{
  if [ -f yarn.lock ]
    then
      yarn build
  fi
}
EOF

echo "source $CUSTOM_BASH_FILE" >> /etc/bash.bashrc
