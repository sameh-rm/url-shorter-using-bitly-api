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
	cd ~ && ls -la
	source ~/venv/bin/activate

install:
	# This should be run from inside a virtualenv
	pip3 install --upgrade pip &&\
		pip3 install -r requirements.txt --user

install-hadolint:
	wget -O /bin/hadolint https://github.com/hadolint/hadolint/releases/download/v1.17.5/hadolint-Linux-x86_64
	chmod +x /bin/hadolint

install-minikube:
	wget -O /bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
	chmod +x /bin/minikube

install-all: install-minikube install-hadolint

test:
	# Additional, optional, tests could go here
	python -m pytest -vv tests/*.py
	#python -m pytest --nbval notebook.ipynb

lint:
	# See local hadolint install instructions:   https://github.com/hadolint/hadolint
	# This is linter for Dockerfiles
	hadolint Dockerfile
	# This is a linter for Python source code linter: https://www.pylint.org/
	# This should be run from inside a virtualenv
	pylint --disable=R,C,W1203 app.py

run:
	python3 app.py

create_inventory:
	aws ec2 describe-instances --query "Reservations[*].Instances[*].PublicIpAddress" --filters "Name=tag:Name,Values=Prometheus" --output=text > D:\inventory

start_minikube:
	minikube start -Y

all: install lint test
