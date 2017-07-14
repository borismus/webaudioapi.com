#!/usr/bin/env python
from livereload import Server, shell

server = Server()
server.watch('content', shell('lightning -o www'))
server.serve(root='www')
