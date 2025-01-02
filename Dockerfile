# imagem base
FROM node:18

# Diretório onde ficará a aplicação
WORKDIR /app

#Copia a pasta do código fonte
COPY . .

#Executa o comando para baixar as dependências
RUN npm install --force

#Executar o comando de Build
RUN npm run build

CMD ["node", "dist/main.js"]

