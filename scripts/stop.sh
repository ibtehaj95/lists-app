#!/bin/bash
# wmctrl -l | grep 'lists_backend' | awk '{print $1}' | xargs -I{} wmctrl -ic {}
wmctrl -l | grep 'lists_webpack' | awk '{print $1}' | xargs -I{} wmctrl -ic {}
docker compose down