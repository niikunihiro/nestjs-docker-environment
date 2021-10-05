init-db:
	cp ./container/mysql/mysql.env ./container/mysql/.env && vi ./container/mysql/.env
dc-build:
	cd container && docker-compose build
dc-up:
	cd container && docker-compose up -d
dc-down:
	cd container && docker-compose down
dc-stop:
	cd container && docker-compose stop
dc-log:
	cd container && docker-compose logs -f
attach-api:
	docker exec -it todo_api sh
attach-vue:
	docker exec -it climax_app sh
