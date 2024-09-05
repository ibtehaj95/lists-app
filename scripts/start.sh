#!/bin/bash

gnome-terminal --title 'backend' -- npm start --prefix ./backend
gnome-terminal --title 'webpack' -- npm run serve --prefix ./frontend
docker compose --project-name lists-app up -d