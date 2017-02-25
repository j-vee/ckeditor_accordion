<?php
/**
 * @file
 * Contains \Drupal\ckeditor_accordion_uswds\Plugin\CKEditorPlugin\CKEditorAccordionUSWDS.
 */

namespace Drupal\ckeditor_accordion_uswds\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "CKEditorAccordion" plugin.
 *
 * @CKEditorPlugin (
 *   id = "ckeditor_accordion_uswds",
 *   label = @Translation("CKEditorAccordionUSWDS"),
 *   module = "ckeditor_accordion_uswds"
 * )
 */
class CKEditorAccordionUSWDS extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $config = array();
    return $config;
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return array();
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'ckeditor_accordion_uswds') . '/js/plugins/accordion/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $path = drupal_get_path('module', 'ckeditor_accordion_uswds') . '/js/plugins/accordion/icons';
    return array(
      'Accordion' => array(
        'label' => t('Add Accordion'),
        'image' => $path . '/accordion.png',
      ),
    );
  }

}
