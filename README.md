# fsf-assessment2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

# This is only for backend testing verification, frontend is not workable at the moment
1)Run backend server, under server directory run `nodemon`

2)Use 'POSTMAN' or 'Advanced REST client` app for testing

Below are the queries

Requirement 1

  Q1 Search fields using queries: Title & Author

        http://localhost:3000/api/books?title=adv&limit=10&offset=0

        http://localhost:3000/api/books?author=wil&limit=10&offset=0

        http://localhost:3000/api/books?title=adv&author=wil&limit=10&offset=0
  Q2 Directory of books
  
    a.List of 10 books by default, with the titles in alphabetical order
    
        http://localhost:3000/api/books
        
        http://localhost:3000/api/books?limit=10
        
        http://localhost:3000/api/books?limit=10&offset=0
        
        http://localhost:3000/api/books?limit=10&offset=1
        
    
    b.Each item in the books list should return the following information:
    
      i.Thumbnail of the Cover (image URL)
      
      ii.Title
      
      iii.Author
      
      Same as Q1, http://localhost:3000/api/books?title=adv&author=wil&limit=10&offset=0
      
      
    c.Search result should include all possibilities based on keywords found in Title or Author fields
    
    
        http://localhost:3000/api/books?title=adv&limit=10&offset=0

        http://localhost:3000/api/books?author=wil&limit=10&offset=0

        http://localhost:3000/api/books?title=adv&author=wil&limit=10&offset=0
        
    d.Able to sort books list by Title or Author from A-Z and Z-A
    
        Sort by title in ascending A-Z
        
        http://localhost:3000/api/books?title=adv&author=wil&limit=10&offset=0&sortType=titleAsc
        
        Sort by title in descending Z-A
        
        http://localhost:3000/api/books?title=adv&author=wil&limit=10&offset=0&sortType=titleDesc
        
        Sort by author in ascending A-Z
        
        http://localhost:3000/api/books?title=adv&author=wil&limit=10&offset=0&sortType=authorAsc
        
        Sort by author in descending Z-A
         
        http://localhost:3000/api/books?title=adv&author=wil&limit=10&offset=0&sortType=authorDesc
        
    e.Pagination
      
      Change the 'offset' values
       
       http://localhost:3000/api/books?title=adv&author=wil&offset=0
    
    f.Ability to change a number of books listed in a page
    
      Change the 'limit' values 
       
       http://localhost:3000/api/books?title=adv&author=wil&limit=3
    
    g.You may use GET or POST methods for the search
```
Give examples
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# fsf-assessment2
