# Starting points

după ce se copiaza git-ul puteti utiliza comenzile:
```bash
docker build -t < nume_imagine > .
```
Example:
```bash
docker build -t react_tasks .
```
# Pentru a rula acum docker
## Useful info:
Ne vom folosi de un alt bash pentru a prelua id-ul ultimei imagini create ( in cazul in care ultima imagine e cea a acestui proiect )
```bash
$(docker images --format='{{.ID}}' | head -1)
```
## The commands:
```bash
docker run -d -it --rm -p < port_dorit >:8080 --name < nume_container > $(docker images --format='{{.ID}}' | head -1) 
```

Example:
```bash
docker run -d -it --rm -p 3001:8080 --name react_tasks_container $(docker images --format='{{.ID}}' | head -1)
```

în cazul exemplului URL va fi : http://localhost:3001/
