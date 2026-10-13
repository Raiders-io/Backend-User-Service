# Variables
COMPOSE_FILE = ./docker-compose.yml

MAKE = make -j

# Rules
all:
	@docker network create public-network || true
	@docker network create --internal api-network || true
	@./start.sh -i
status:
	@docker images -a
	@echo ""
	@docker ps -a

stop:
	@docker compose -f $(COMPOSE_FILE) stop

down:
	@docker compose -f $(COMPOSE_FILE) down -v
	@docker network rm public-network || true
	@docker network rm api-network || true
	