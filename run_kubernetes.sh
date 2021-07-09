#!/usr/bin/env bash

# This tags and uploads an image to Docker Hub

# Step 1:
# This is your Docker ID/path
# dockerpath=<>
dockerpath=urokai/url_shorter
# Step 2
# Run the Docker Hub container with kubernetes
# kubectl run app --image=$dockerpath 
kubectl create deployment url_shorter --image=$dockerpath --port=8000
# Step 3:   
# List kubernetes deployments
kubectl get deployments
# Step 4:
# Forward the container port to a host
kubectl port-forward deployment/url_shorter 8000:80
