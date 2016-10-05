#Project variables
PROJECT_NAME ?= todobackend
ORG_NAME ?= timdelgado
REPO_NAME ?= todobackend

#Filenames
DEV_COMPOSE_FILE := docker/dev/docker-compose.yml
REL_COMPOSE_FILE := docker/release/docker-compose.yml

#Docker Compose Project Names
REL_PROJECT := $(PROJECT_NAME)$(BUILD_ID)
DEV_PROJECT := $(REL_PROJECT)dev

#Cosmetics
YELLOW := "\e[1;33m"
NC := "\e[0m"

#Shell Functions
INFO := @bash -c 'printf $(YELLOW); echo "=> $$1"; printf $(NC)' VALUE

.PHONY: test build release clean

test:
	${INFO} "Building images..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build
	${INFO} "Running unit and integration tests..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up test
	@docker cp $$(docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) ps -q test):/reports/. reports
	${INFO} "Testing complete"
build:
	${INFO} "Building application artifacts..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up builder
	${INFO} "Copying build artifacts to target folder..."
	@ docker cp $$(docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) ps -q builder):/release/package/. target
	${INFO} "Build complete"

release:
	${INFO} "Building release images..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) build
	${INFO} "Running acceptance tests..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) up test
	@docker cp $$(docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) ps -q test):/reports/. reports
	${INFO} "Acceptance tests complete"

clean:
	$(INFO) "Destroying development environment..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) kill
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) rm -f -v
	${INFO} "Destroying release environment..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) kill
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) rm -f -v
	${INFO} "Removing dangling images..."
	@ docker images -q -f dangling=true -f label=applicaiton=$(REPO_NAME) | xargs -I docker rmi -f ARGS
	${INFO} "Clean complete"

	