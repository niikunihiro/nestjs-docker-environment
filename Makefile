init-db:
	cp ./container/mysql/mysql.env ./container/mysql/.env
run-dc:
	cd container && docker-compose up -d
dc-log:
	docker-compose logs
attach-api:
	docker exec -it todo_api sh
