
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