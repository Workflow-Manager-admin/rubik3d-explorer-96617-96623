#!/bin/bash
cd /home/kavia/workspace/code-generation/rubik3d-explorer-96617-96623/main_container_for_rubik3d_explorer
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

