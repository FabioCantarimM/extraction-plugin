# Definições de variáveis
KEY_PATH=./pem/ec2-finalquest.pem
EC2_USER=ec2-user
EC2_IP=your-ec2-public-ip

# Alvo para se conectar via SSH
conectar:
	ssh -i ec2-finalquest.pem ubuntu@ec2-23-20-72-33.compute-1.amazonaws.com