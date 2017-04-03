/**
 * @file
 * Functionality to enable accordion functionality in CKEditor.
 */

(function () {
  // Register plugin.
  CKEDITOR.plugins.add('ckeditor_accordion_uswds', {
    hidpi: true,
    icons: 'accordion',
    init: function (editor) {
      // Add single button.
      editor.ui.addButton('Accordion', {
        command: 'addAccordionCmd',
        icon: this.path + 'icons/accordion.png',
        label: Drupal.t('Insert accordion')
      });

      // Add CSS for edition state.
      var cssPath = this.path + 'accordion.css';
      editor.on('mode', function () {
        if (editor.mode === 'wysiwyg') {
          this.document.appendStyleSheet(cssPath);
        }
      });

      // Prevent nesting DLs by disabling button.
      editor.on('selectionChange', function (evt) {
        if (editor.readOnly) {
          return;
        }
        var command = editor.getCommand('addAccordionCmd');
        var commandList = editor.getCommand('bulletedlist');
        var element = evt.data.path.lastElement && evt.data.path.lastElement.getAscendant('ul', true);
        if (element) {
          command.setState(CKEDITOR.TRISTATE_DISABLED);
          commandList.setState(CKEDITOR.TRISTATE_DISABLED);
        }
        else {
          command.setState(CKEDITOR.TRISTATE_OFF);
          commandList.setState(CKEDITOR.TRISTATE_OFF);
        }
      });

      var allowedContent = 'ul(usa-accordion); li[data-index]; button(usa-accordion-button); button[aria-*]; div(accordion-content) div[id]';

      // Command to insert initial structure.
      editor.addCommand('addAccordionCmd', {
        allowedContent: allowedContent,

        exec: function (editor) {
          var newId = Math.random().toString();
          newId = newId.replace('.', '');
          var ul = new CKEDITOR.dom.element.createFromHtml(
            '<ul class="usa-accordion">' +
              '<li data-index="' + newId + '">' +
              '<button class="usa-accordion-button" aria-expanded="true" aria-controls="accordion_content_' + newId + '" >Accordion title 1</button>' +
              '<div id="accordion_content_' + newId + '" class="usa-accordion-content"><p>Accordion content 1.</p></dd>' +
              '</li>' +
              '<li data-index="' + (newId + 1) + '">' +
              '<button class="usa-accordion-button" aria-expanded="true" aria-controls="accordion_content_' + (newId + 1) + '">Accordion title 2</button>' +
              '<div id="accordion_content_' + (newId + 1) + '" class="usa-accordion-content"><p>Accordion content 2.</p></div>' +
            '</ul>');
          editor.insertElement(ul);
        }
      });

      // Other command to manipulate tabs.
      editor.addCommand('addAccordionTabBefore', {
        allowedContent: allowedContent,

        exec: function (editor) {
          var element = editor.getSelection().getStartElement();
          if (element.getAscendant('div', true)) {
            element = element.getAscendant('div', true).getParent();
          }
          else {
            element = element.getAscendant('button', true).getParent();
          }
          var newId = Math.random().toString();
          newId = newId.replace('.', '');
          var newHtml = '<li data-index="' + newId + '"><button class="usa-accordion-button" aria-expanded="true" aria-controls="accordion_content_' + newId + '">New accordion title</button>' +
          '<div id="accordion_content_' + newId + '" class="usa-accordion-content">' +
          '<p>New accordion content</p>' +
          '</div></li>';
          var newContent = new CKEDITOR.dom.element.createFromHtml(newHtml);
          newContent.insertBefore(element);
        }
      });
      editor.addCommand('addAccordionTabAfter', {
        allowedContent: allowedContent,

        exec: function (editor) {
          var element = editor.getSelection().getStartElement();
          if (element.getAscendant('button', true)) {
            element = element.getAscendant('button', true).getParent();
          }
          else {
            element = element.getAscendant('div', true).getParent();
          }
          var newId = Math.random().toString();
          newId = newId.replace('.', '');
          var newHtml = '<li data-index="' + newId + '"><button class="usa-accordion-button" aria-expanded="true" aria-controls="accordion_content_' + newId + '">New accordion title</button>' +
          '<div id="accordion_content_' + newId + '" class="usa-accordion-content">' +
          '<p>New accordion content</p>' +
          '</div></li>';
          var newContent = new CKEDITOR.dom.element.createFromHtml(newHtml);
          newContent.insertAfter(element);

        }
      });
      editor.addCommand('removeAccordionTab', {
        exec: function (editor) {
          var element = editor.getSelection().getStartElement();
          var a;
          if (element.getAscendant('button', true)) {
            a = element.getAscendant('button', true).getParent();
            a.remove();
          }
          else {
            a = element.getAscendant('div', true);
            if (a) {
              a.getParent().remove();
            }
            else {
              element.remove();
            }
          }
        }
      });

      // Context menu.
      if (editor.contextMenu) {
        editor.addMenuGroup('accordionGroup');
        editor.addMenuItem('accordionTabBeforeItem', {
          label: Drupal.t('Add accordion tab before'),
          icon: this.path + 'icons/accordion.png',
          command: 'addAccordionTabBefore',
          group: 'accordionGroup'
        });
        editor.addMenuItem('accordionTabAfterItem', {
          label: Drupal.t('Add accordion tab after'),
          icon: this.path + 'icons/accordion.png',
          command: 'addAccordionTabAfter',
          group: 'accordionGroup'
        });
        editor.addMenuItem('removeAccordionTab', {
          label: Drupal.t('Remove accordion tab'),
          icon: this.path + 'icons/accordion.png',
          command: 'removeAccordionTab',
          group: 'accordionGroup'
        });

        editor.contextMenu.addListener(function (element) {
          var parentEl = element.getAscendant('ul', true);
          if (parentEl && parentEl.hasClass('usa-accordion')) {
            return {
              accordionTabBeforeItem: CKEDITOR.TRISTATE_OFF,
              accordionTabAfterItem: CKEDITOR.TRISTATE_OFF,
              removeAccordionTab: CKEDITOR.TRISTATE_OFF
            };
          }
        });
      }
    }
  });
})();
