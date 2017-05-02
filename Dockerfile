FROM ceruberu/rian-container:0.1.1
ADD . /rian
WORKDIR /rian
CMD ["./scripts/aws/wait-for-it.sh","mongodb:27017","--","./scripts/aws/BeforeDockerCompose.sh"]
