Disclaimer & Licence
====================
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    Please see the license.txt file or http://www.gnu.org/licenses/ 
    for further details

Introduction
============

JS Bullet list is a Javascript library for creating a bullet point list the user can edit and add to.

The goal of this project is to establish a lightweight client side library for users to create, store and export their own lists.

Dependencies
============
JQuery 1.7.2

Usage
=====
1. Include the bullet list js file in your page header
   IE: <script src="javascript/bulletlist.js" type="text/javascript"></script>

2. Add a containing div to your web page with an id
   IE: <div id="divBulletList"></div>
   
3. Call JSBulletList.setupNewBulletList to setup a blank
   bullet list within the div placeholder:
   IE: JSBulletList.setupNewBulletList("divBulletList");
   
4. Call JSBulletList.setFocusOnFirstBulletPoint to focus
   the users cursor on the first point in the list
   (This is optional)
   IE: JSBulletList.setFocusOnFirstBulletPoint("divBulletList");
   
   
Compatibility
=============
Tested on:
	Google Chrome
	Mozilla Firefox
	Internet Explorer 9

JSFiddle
========
http://jsfiddle.net/ZAfpK/