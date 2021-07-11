#!/usr/bin/env bash

## Complete the following steps to get Docker running locally

# Step 1:
# create ssh key
aws ec2 create-key-pair --region us-east-2 --key-name udacity

# Step 2:
# create cluster
eksctl create cluster \
--name shorty \
--version 1.19 \
--region us-east-2 \
--nodegroup-name shorty-workers \
--node-type t2.micro \
--nodes 2 \
--nodes-min 1 \
--nodes-max 3 \
--node-ami auto \
--zones us-east-2a \
--zones us-east-2b 

# Step 3:
# create deployment using deployment.yml
kubectl apply -f deployment.yml

# Step 4:
# create service using service.yml
kubectl apply -f service.yml

# to get the loadbalancer url
# kubectl get services shorty 
# copy the the external ip