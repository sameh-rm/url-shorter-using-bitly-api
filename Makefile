## The Makefile includes instructions on environment setup and lint tests
# Create and activate a virtual environment
# Install dependencies in requirements.txt
# Dockerfile should pass hadolint
# app.py should pass pylint
# (Optional) Build a simple integration test

setup:
	# Create python virtualenv & source it
	python3 -m venv ~/venv

activate_env:
	source ~/venv/bin/activate

install:
	# This should be run from inside a virtualenv
	pip install --upgrade pip &&\
		pip install -r requirements.txt

install-hadolint:
	sudo wget -O -y /bin/hadolint https://github.com/hadolint/hadolint/releases/download/v1.17.5/hadolint-Linux-x86_64
	sudo chmod +x /bin/hadolint

install-docker:
	sudo apt-get update

	sudo apt-get -y install \
		apt-transport-https \
		ca-certificates \
		curl \
		gnupg \
		lsb-release

	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

	echo \
		"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
		$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

	sudo apt-get update
	sudo apt-get -y install docker-ce docker-ce-cli containerd.io

install-minikube:
	wget -O /bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
	chmod +x /bin/minikube
	minikube version 
	minikube start --driver=docker

install-all: install-minikube install-hadolint

test:
	python3 manage.py test

lint:
	# See local hadolint install instructions:   https://github.com/hadolint/hadolint
	# This is linter for Dockerfiles
	hadolint Dockerfile
	# This is a linter for Python source code linter: https://www.pylint.org/
	# This should be run from inside a virtualenv
	pylint --disable=R,C,W1203 app.py

start_minikube:
	minikube start -Y

run_kubes:
	kubectl create deployment shorty --image=urokai/udacity-cloud-devops-capestone --port=5000
	kubectl get deployments
	ping google.com
	ping google.com
	kubectl port-forward deployment/shorty 5000:5000 & echo started

all: install lint test
