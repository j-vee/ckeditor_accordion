README.txt
==========

Allows users to create & display content in an accordion.
------------------------
Requires - Drupal 8


Overview:
--------
Adds a new button to Drupal's built in CKEditor which allows the user
to create & display any type of content in an accordion format.

The html structure and styling conforms to the US web design standards


INSTALLATION:
--------
1. Install & Enable the module
2. Open Administration > Configuration > Content authoring >
   Text formats and editors (admin/config/content/formats)
3. Edit a text format's settings (usually Basic HTML)
4. Drag n Drop the Add Accordion -button to the toolbar to show it to the users
5. Scroll down to the bottom to the input Allowed HTML tags
6.  add these to the list<ul type class><li data-index> <button class aria-*><div id class>
