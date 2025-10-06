#!/bin/bash

# Commit and Push Script for Nuxt ATS
# Usage: ./scripts/commit-push.sh "Your commit message"

set -e

if [ -z "$1" ]; then
  echo "Error: Commit message required"
  echo "Usage: ./scripts/commit-push.sh \"Your commit message\""
  exit 1
fi

COMMIT_MESSAGE="$1"

echo "📊 Checking git status..."
git status

echo ""
echo "📝 Adding all changes..."
git add -A

echo ""
echo "💾 Creating commit..."
git commit -m "$(cat <<EOF
$COMMIT_MESSAGE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

echo ""
echo "🚀 Pushing to remote..."
git push

echo ""
echo "✅ Done! Changes committed and pushed successfully."
