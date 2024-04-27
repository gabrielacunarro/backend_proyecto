# # definir que tipo de app vamos a construir
# FROM node

# #definir dónmde se va a guardar el proyecto/imagen
# WORKDIR /simplex-complex

# #copio/muevo el package de la app desde el sv hacia el 
# COPY package*.json ./

# #instalo paquetes
# RUN npm install

# #copio el resto de los archivos del sv a contenedor
# COPY . .

# #definir el puerto de exposicion (puerto donde va a funcionar nuestro contenedor) se recomienda que tenga el mismo numero (permite crear otras instancias con otros puertos)
# EXPOSE 8080

# #configurar el comando de ejecucion del sv
# CMD ["npm", "start"]