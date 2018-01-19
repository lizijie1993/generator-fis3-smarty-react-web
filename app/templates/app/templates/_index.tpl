<!DOCTYPE html>
{%html framework="<%=name%>:app/static/scripts/libs/mod.js"%}
    {%head%}
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta charset="utf-8">
        <meta content="always" name="referrer">
        <title><%=name%></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <link rel="shortcut icon" type="image/png" href="/favicon.ico">
    {%/head%}
    {%body%}
        <div class="main"></div>
        {%script%}
            window.STATE_FROM_SERVER = {%json_encode($system)%}
            require('../index.jsx')
        {%/script%}
    {%/body%}
{%/html%}
