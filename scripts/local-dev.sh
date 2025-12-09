#!/usr/bin/env bash

SESSION_NAME="wb-dev"
BACKEND_DIR="backend"
FRONTEND_DIR="storefront"

start() {
    echo "Starting local development environment..."

    # If running already, don't attach — just exit
    if tmux has-session -t $SESSION_NAME 2>/dev/null; then
        echo "Session already running: $SESSION_NAME"
        exit 0
    fi

    # Create backend session
    tmux new-session -d -s $SESSION_NAME -n backend
    tmux send-keys -t $SESSION_NAME "cd $BACKEND_DIR && npm run dev" C-m

    # Create frontend pane
    tmux split-window -h -t $SESSION_NAME
    tmux send-keys -t $SESSION_NAME "cd $FRONTEND_DIR && npm run dev" C-m

    echo "Local dev started in tmux session: $SESSION_NAME"
    echo "Run 'tmux attach -t $SESSION_NAME' if you want to view logs."
}

stop() {
    echo "Stopping development environment..."
    tmux kill-session -t $SESSION_NAME 2>/dev/null || {
        echo "No running session named $SESSION_NAME"
        exit 1
    }
}

status() {
    if tmux has-session -t $SESSION_NAME 2>/dev/null; then
        echo "Session '$SESSION_NAME' is running."
    else
        echo "No active '$SESSION_NAME' session."
    fi
}

case "$1" in
    start) start ;;
    stop) stop ;;
    status) status ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        exit 1
        ;;
esac
