#!/bin/bash
DIRPATH="./"

TZ=UTC
PORT=3333
HOST=0.0.0.0
NODE_ENV=development

# App
LOG_LEVEL=info
APP_KEY=$(openssl rand -base64 32 | tr -dc '[:alnum:]' | head -c 32)
APP_URL=http://${HOST}:
# Session
SESSION_DRIVER=cookie

# Database
DB_CONNECTION=pg
DB_HOST=postgresql
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=$(openssl rand -base64 32 | tr -dc '[:alnum:]' | head -c 32)
DB_DATABASE=lesson_service
AUTH_SERVICE_URL=http://auth-service:3333

#Flag
NON_INTERACTIVE=false
FORCE_REGENERATE=false
HELP=false

# Message broker (Redis)


create_env(){
    cat << eof > $DIRPATH/.env
TZ=${TZ}
PORT=${PORT}
HOST=${HOST}
NODE_ENV=${NODE_ENV}
LOG_LEVEL=${LOG_LEVEL}
APP_KEY=${APP_KEY}
APP_URL=${APP_URL}${PORT}
SESSION_DRIVER=${SESSION_DRIVER}
DB_CONNECTION=${DB_CONNECTION}
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_DATABASE=${DB_DATABASE}
AUTH_SERVICE_URL=http://auth-service:3333
LIMITER_STORE=memory
eof
}

# Generate .env file with default values or prompt for custom values
# Uncomment the following lines to enable custom database configuration
generate_env() {
    echo "Generating .env file..."
    if [ "$NON_INTERACTIVE" = true ]; then
        echo "Non-interactive mode: using default values."
        create_env
        return
    fi
    echo "Choose setup option:"
    read -p "1. Quick setup (default values) 2. Custom setup: " choice
    if [ "$choice" == "1" ]; then
        create_env
    elif [ "$choice" == "2" ]; then
        read -p "Enter PORT (default: 3333): " PORT
        PORT=${PORT:-3333}
        # read -p "Enter DB_CONNECTION (default: pg): " DB_CONNECTION 
        # DB_CONNECTION=${DB_CONNECTION:-pg}
        # read -p "Enter DB_HOST (default: postgresql): " DB_HOST 
        # DB_HOST=${DB_HOST:-postgresql}
        # read -p "Enter DB_PORT (default: 5432): " DB_PORT
        # DB_PORT=${DB_PORT:-5432}
        read -p "Enter DB_USER (default: postgres): " DB_USER
        DB_USER=${DB_USER:-postgres}
        read -p "Enter DB_PASSWORD (default: postgres): " DB_PASSWORD
        DB_PASSWORD=${DB_PASSWORD:-postgres}
    fi
    create_env
    echo ".env file generated."
}

check_env() {
    if [ "$FORCE_REGENERATE" = true ]; then
        echo "Force regenerating .env file..."
        generate_env
    elif [ ! -f .env ]; then
        echo ".env file not found!"
        generate_env
    else
        echo ".env file found."
        if [ "$NON_INTERACTIVE" = true ]; then
            echo "Non-interactive mode: skipping .env regeneration."
            return
        fi
        read -p "Do you want to regenerate the .env file? (y/n): " regenerate
        if [ "$regenerate" == "y" ]; then
            generate_env
        fi
    fi
}

# Add a flag to make the script non-interactive

check_flags() {
    while [[ "$#" -gt 0 ]]; do
        case $1 in
            --non-interactive) NON_INTERACTIVE=true ;;
            --force) FORCE_REGENERATE=true ;;
            --help) HELP=true ;;
            -[a-zA-Z]*) 
            local flags=${1#-}
            for (( i=0; i<${#flags}; i++ )); do
                local flag=${flags:$i:1}
                case $flag in
                    i) NON_INTERACTIVE=true ;;
                    f) FORCE_REGENERATE=true ;;
                    h) HELP=true ;;
                    *) echo "Unknown flag: -${flags:$i:1}"; exit 1 ;;
                esac
            done
            ;;
            *) echo "Unknown parameter passed: $1"; exit 1 ;;
        esac
        shift
    done
}

check_flags "$@"
if [ "$HELP" = true ]; then
    echo "Usage: ./start.sh [options]"
    echo "Options:"
    echo "  -i, --non-interactive    Run the script in non-interactive mode (use default values)"
    echo "  -f, --force              Force regeneration of the .env file"
    echo "  -h, --help               Show this help message"
    exit 0
fi
check_env
docker compose -f $DIRPATH/docker-compose.yml up -d --build --remove-orphans