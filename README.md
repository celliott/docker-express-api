###Express Server API
This is a node express api with basic auth that uses [mongodb](https://github.com/celliott/docker-mongodb) for the db.

##Runbook
#####Set env varibles or edit entries in Makefile.

	$ export AUTH_USER={auth_user}		# example joe
	$ export AUTH_PASS={auth_pass}		# example 47ejheh7629
	$ export MONGODB={mongodb}			# example 'mongodb://@172.17.42.1:27017/api'
	

#####Build and run docker container

	$ make container && make run
	

#####Restart container

	$ make kill && make run	
	

#####Apply changes to app.js and restart container

	$ make container && make kill && make run	
	

#####Tail logs in running container

	$ make tail	
		
	
##Auth
This api is simple and only currently supports one user:pass. It is desiged to be used as an endpoint for an iot device to post data. 

#####To change user and pass on the server

	$ export AUTH_USER={new_auth_user}
	$ export AUTH_PASS={new_auth_pass}
	$ make kill && make run

##Endpoints

#####Get all items from {collection_name}

	$ curl -X GET 'http://{auth_user}:{auth_pass}@{api_server}/collections/{collection_name}'
	

#####Get item by id from {collection_name}

	$ curl -X GET 'http://{auth_user}:{auth_pass}@{api_server}/collections/{collection_name}/{item_id}'


#####Add item to {collection_name}

	$ curl -X POST 'http://{auth_user}:{auth_pass}@{api_server}/collections/{collection_name}' -d { "device_id": "00001", "timestamp": "1424546663", "}
	

#####Update item by id in {collection_name}

	$ curl -X PUT 'http://{auth_user}:{auth_pass}@{api_server}/collections/{collection_name}/{item_id}'		
	
#####Delete item by id from {collection_name}

	$ curl -X DELETE 'http://{auth_user}:{auth_pass}@{api_server}/collections/{collection_name}/{item_id}'