function renderHtmlHomePage() {
  return "./homePage.html";
}//end renderHtmlHomePage()

function renderHtmlAuthenticationPage() {
  return "./authenticationPage.html";
}//end renderHtmlAuthenticationPage()

function renderHtmlMainPage() {
  return "./mainPage.html";
}//end renderHtmlMainPage()

function renderHtmlTodoListPage(todos) {
    var responseHtml = `<!DOCTYPE html> <style> 
                        body {background-color: silver;}
                        h2   {color: black;}
                        h3   {color: blue;}
                        p    {color: black;}
                        table, th, td {border:1px solid black;}
                        .button {
                           background-color: green;
                           border: none;
                           color: beige;
                           padding: 8px 38px;
                           text-align: center;
                           text-decoration: none;
                           display: inline-block;
                           font-size: 16px;
                           margin: 4px 2px;
                           cursor: pointer;
                        } </style>`
    + '<head> <title>SUD312--- Architectures logicielles et middlewares  </title> </head>' 
    + `<body> <header> <h2>Lab1.8: Experimenting Securing Applications in NodeJS </h2> </header>`;

    responseHtml += '</head><body class="container">'
                  +  '<div class="row">'
                  +  '<h3>Your Todo List till Now </h3>';

    responseHtml+= `<ol>`;
    todos.forEach(todo =>{
      responseHtml+= `<li> ${todo} </li>`;
    });
    responseHtml+= `</ol>`;
    responseHtml+= '</div>';
    
    responseHtml+= '<form method="post">';
    responseHtml+= '<div class="container">';
    responseHtml+= '<button class = "button" type="submit" id = "addTodo"         formaction = "/addTodoRequest">  Add new todo </button>';
    responseHtml+= '<button class = "button" type="submit" id = "displayTodoList" formaction = "/todoListRequest"> Display todo list </button>';
    responseHtml+= '<button class = "button" type="submit" id = "Cancel"          formaction = "/cancelRequest">   Cancel </button>';
    responseHtml+='</form></body></html>';
    return responseHtml;
}//end renderHtmlTodoListPage()

function renderHtmlAboutPage() {
    var responseHtml = `<!DOCTYPE html> <style> 
                        body {background-color: silver;}
                        h2   {color: black;}
                        h3   {color: black;}
                        p    {color: black;}
                        table, th, td {border:1px solid black;}
                        .button {
                           background-color: green;
                           border: none;
                           color: beige;
                           padding: 8px 38px;
                           text-align: center;
                           text-decoration: none;
                           display: inline-block;
                           font-size: 16px;
                           margin: 4px 2px;
                           cursor: pointer;
                        } </style>`
    + '<head> <title>SUD312--- Architectures logicielles et middlewares  </title> </head>' 
    + `<body> <header> <h1>Lab1.8: Experimenting Securing Applications in NodeJS </h1> </header>`;

    responseHtml += '<h2>Welcome! This application is about ... </h2> <a href="/userCancel"> Go Home</a>'
                  +  '</body></html>';

    return responseHtml;
}//end renderHtmlAboutPage()

function renderHtmlRegistrationPage() {
    var responseHtml = `<!DOCTYPE html> <style> 
                        body {background-color: silver;}
                        h2   {color: black;}
                        h3   {color: black;}
                        p    {color: black;}
                        table, th, td {border:1px solid black;}
                        .button {
                           background-color: green;
                           border: none;
                           color: beige;
                           padding: 8px 38px;
                           text-align: center;
                           text-decoration: none;
                           display: inline-block;
                           font-size: 16px;
                           margin: 4px 2px;
                           cursor: pointer;
                        } </style>`
    + '<head> <title>SUD312--- Architectures logicielles et middlewares  </title> </head>' 
    + `<body> <header> <h1>Lab1.8: Experimenting Securing Applications in NodeJS </h1> </header>`;

    responseHtml += '<h2>Welcome! Registration would be available soon ... </h2> <a href="/userCancel"> Go Home</a>'
                  +  '</body></html>';

    return responseHtml;
}//end renderHtmlRegistrationPage()

module.exports = {
  renderHtmlHomePage, 
  renderHtmlAboutPage, 
  renderHtmlAuthenticationPage,
  renderHtmlRegistrationPage, 
  renderHtmlMainPage,
  renderHtmlTodoListPage  // Add this!
};