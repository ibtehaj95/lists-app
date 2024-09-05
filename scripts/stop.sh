#!/bin/bash
wmctrl -l | grep 'backend' | awk '{print $1}' | xargs -I{} wmctrl -ic {}
wmctrl -l | grep 'webpack' | awk '{print $1}' | xargs -I{} wmctrl -ic {}
docker compose down