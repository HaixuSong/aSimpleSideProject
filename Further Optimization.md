1. Do a share page using template engine. No need to login. This improves a lot on propagation.
2. Same address on map problem. I'll change it into filter when there's several points sharing the same address
3. Filter-button UI
4. Picture slides UI
5. Login page UI
6. I think it's necessary to separate login page and main functional page. Because the current structure solved login-page flashing problem using componentWillMount hook (which will be deprecated) and synchronous xhr. Using seperate page can avoid both to solve the flashing problem. (Actually initiation animation may solve too, but not good UI I think).