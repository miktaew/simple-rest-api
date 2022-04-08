## simple-rest-api

# library api mockup

## models: 
- employee (name, login, password, is_admin), 
- book (title, authors, release date, description, is_available)

guests can get all books and get single book

employees can add books, remove books, update books, change own password

admins can add employees


### requires .env with:
- MONGO_URI set to mongodb connection string
- ADMIN_PASSWORD for initial password of default admin account


# routes
## /api/employee
```
POST: create new employee 

 {
     login: admin login (String)
     password: admin password (String)
     employee: {
         name: employee name (String)
         login: employee login (String)
         password: employee password (String)
         is_admin: if admin (Boolean, default is false)
     }
 }

 PATCH: update password
 {
     login: employee login (String)
     password: employee password (String)
     new_password: new password to use (String)
 }
 ```
 ## /api/books
```
POST: create new book
{
    login: employee login (String)
    password: employee password (String)
    book: {
        title: book title (String)
        description: book description (String, optional)
        release_date: book release date (Date 'yyyy-mm-dd')
        authors: list of authors ( [String] )
        is_available: current availability in library [Boolean, default false]
    }
}

GET: get all books
query params:
- available (true/false)
- title (looks for all matches)
- releasedBefore (Date 'yyyy-mm-dd', might be just year)
- releasedAfter (Date 'yyyy-mm-dd', might be just year)
- author (looks for all matches)
- sort (author or release_date)
- order (for sorting, asc or desc)


```

## /api/books/:bookId
```
PATCH: update a book
{
    login: employee login (String)
    password: employee password (String)
    book: {
        title: book title (String)
        description: book description (String, optional)
        release_date: book release date (Date 'yyyy-mm-dd')
        authors: list of authors ( [String] )
        is_available: current availability in library [Boolean, default false]
    }
}

DELETE: remove a book
{
    login: employee login (String)
    password: employee password (String)
}

GET: get a single book



```
