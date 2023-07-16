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
### Useful info:
Ne vom folosi de un alt bash pentru a prelua id-ul ultimei imagini create ( in cazul in care ultima imagine e cea a acestui proiect )
```bash
$(docker images --format='{{.ID}}' | head -1)
```
### The command:
```bash
docker run -d -it --rm -p < port_dorit >:8080 --name < nume_container > $(docker images --format='{{.ID}}' | head -1) 
```

Example:
```bash
docker run -d -it --rm -p 3001:8080 --name react_tasks_container $(docker images --format='{{.ID}}' | head -1)
```

în cazul exemplului URL va fi : http://localhost:3001/

*cand veti opri containerul acesta se va sterge automat pentru a nu crea conflicte ulterior, datorita tagului "--rm"

## Error cases:
Daca aveti eroare deoarece ati rulat deja acea imagine utilizati urmatoarea comanda pentru a inchide orice container aveti pornit:
```bash
docker kill $(docker ps -q)
```

