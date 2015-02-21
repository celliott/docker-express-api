# express dockerfile

# pull base image
FROM dockerfile/nodejs

# add files
RUN mkdir /app
ADD ./package.json /app/package.json
RUN cd /app && npm install
ADD ./app.js /app/app.js
ADD ./start.sh /start.sh
RUN chmod u+x /start.sh

# set working dir
WORKDIR /app

# expose ports
EXPOSE 3000

# define default command
CMD ["/start.sh"]
