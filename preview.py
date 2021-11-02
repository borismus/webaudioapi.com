#!/usr/bin/env python3
from livereload import Server, shell

server = Server()
server.watch('content', shell('../lightning/lightning -o docs'))
server.serve(root='docs')
