# Starting points

după ce se copiaza git-ul puteti utiliza comenzile:

docker build -t < nume_imagine > .
e.g. docker build -t react_tasks .

# Pentru a rula acum docker

docker run -d -it --rm -p < port_dorit >:8080 --name < nume_container > $(docker images --format='{{.ID}}' | head -1) 
e.g. docker run -d -it --rm -p 3001:8080 --name react_tasks_container $(docker images --format='{{.ID}}' | head -1)
în cazul exemplului URL va fi : http://localhost:3001/
