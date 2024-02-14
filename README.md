docker build command

```
docker build -t calpad:v1 .

```

Docker run image command

```
docker run --rm -it -p 3000:3000 --name calpad calpad:v1
```

push docker image to docker hub

```
docker push username/repo:tagname
```

in this case

```
docker push himohitmehta/calpad
```

if it fails, add the image tag

```
docker tag calpad:v1 himohitmehta/calpad
```

run in play with docker

```
docker run -dp 3000:3000 himohitmehta/calpad
```
