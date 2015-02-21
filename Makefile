# Makefile for docker-express

# set token
AUTH_TOKEN ?= '{set_token}'
AUTH_USER ?= '{set_user}'

# docker settings
ENVS = -e AUTH_TOKEN=$(AUTH_TOKEN) -e AUTH_USER=$(AUTH_USER)
PORTS = -p 80:3000
CONTAINER = express
VOLUMES =


.PHONY: container run

container :
	docker build -t $(CONTAINER) .

run :
	docker run --name $(CONTAINER) -i -d $(PORTS) $(ENVS) $(VOLUMES) -t $(CONTAINER)
stop :
	docker stop $(CONTAINER)
	docker rm $(CONTAINER)
kill :
	docker kill $(CONTAINER)
	docker rm $(CONTAINER)
restart :
	docker kill $(CONTAINER)
	docker rm $(CONTAINER)
	docker run --name $(CONTAINER) -i -d $(PORTS) $(ENVS) $(VOLUMES) -t $(CONTAINER)
attach:
	docker attach $(CONTAINER)

tail:
	docker logs -f $(CONTAINER)
