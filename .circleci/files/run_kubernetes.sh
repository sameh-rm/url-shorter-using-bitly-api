#!/usr/bin/env bash

# This tags and uploads an image to Docker Hub

# Step 1:
# This is your Docker ID/path
# dockerpath=<>
dockerpath=urokai/udacity-cloud-devops-capestone
# Step 2
# Run the Docker Hub container with kubernetes
# kubectl run app --image=$dockerpath 
kubectl create deployment shorty --image=$dockerpath --port=5000
# Step 3:   
# List kubernetes deployments
kubectl get deployments
# Step 4:
# Forward the container port to a host
ping google.com
ping google.com
kubectl port-forward deployment/shorty 5000:5000 & echo started
