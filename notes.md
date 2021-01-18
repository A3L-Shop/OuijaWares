# Code Review I


## COLLABORATION

Roses

* Parallel progress, shared cognitive load
* Synthesizing between style difference and learning from others
* Consistent teammates, feeling invested in outcomes
* Keeping small, consistent tasks
* Vertical slices
* Feels like a real work simulation

Thorns

* Navigating Git x3, potential for merge conflicts
* Different communication styles/preferences
* Zoom collaboration

### GIT

Semantic Commit
* Nature of commit (e.g, feat, doc, test, debug, etc)
* Area of commit coverage (Models, docs, routes, React, testing, etc.)
* Present tense description of commit

### User Stories
As an X I want to Y so I can Z
Ever User Story as 1+ vertical slices
Break down vertical slices into small, horizontal tasks
Good tasks should est 15 mins - 2hrs

## CODEBASE

### README

Title, description of project
Credit yourselves as collaborators
Link to deployed version
Instructions for running locally

### API

* What if many-to-many existed between Orders + Products? "as line items"
* User has Many Orders, 
* Order belongs to User
* Order has Many Products
* Product belongs to Many Orders
```
Order_id   u_id
1           1 LV
2           2 DS
3           1 LV
4           3 ML

prod_id     name
1           ghost  
2           skull
3           eye of newt

// Join table between Orders and Products
line_item_id    o_id    p_id        quant
1               1          1        3
2               1          2        5
3               2          1        1
4               2          3        18
5               3          1        4000
```
* Order can have `isActive` property
* Good job avoiding Floats for price
* Good job using `ENUM` instead of `ARRAY`
* Keep your routes RESTful

GET www.netflix.com/shows/queerEye/eps/1?time=55

REpresentational
State
Transfer


## GOALS
* Next CR, Deployed MVP Shopper
* Persisting cart
    * In browser
    * HTML LocalStorage
    * In Server
    * Put Cart on the session