#!/bin/bash

docker compose --project-name lists-app up -d
# gnome-terminal --title 'backend' -- npm start --prefix ./backend
# gnome-terminal --title 'lists_backend' -- bash -c "exec -a lists_backend npm start --prefix ./backend"
# gnome-terminal --title 'webpack' -- npm run serve --prefix ./frontend
gnome-terminal --title 'lists_webpack' -- bash -c "exec -a lists_webpack npm run serve --prefix ./frontend"