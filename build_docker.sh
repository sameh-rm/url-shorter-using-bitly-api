# Step 1:
# Build image and add a descriptive tag
docker build --tag=shorty .
# Step 2: 
# List docker images
docker image ls
# Step 3: 
# Run flask app
docker run  -d  -m "1G" \
    -p5000:5000  --name shorty shorty