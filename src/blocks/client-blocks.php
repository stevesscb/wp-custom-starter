<?php
/**
 * Plugin Name: Client Blocks
 * Description: Gutenberg blocks used by the custom theme.
 * Version: 1.0.0
 * Author: Team Grayscale
 * Author URI: https://grayscale.com.hk/
 * License: GNU General Public License v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: grayscale
*/

if ( !defined( 'ABSPATH' ) ) {
  exit;
}

/* REGISTER */
  add_action( 'init', function() {
    register_block_type( 'client/accordion' );
    register_block_type( 'client/accordion-item' );
    register_block_type( 'client/slick-slider' );
    register_block_type( 'client/testimonial' );
  } );

/* BACK-END CLIENT BLOCKS ASSETS */
  add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_style(
      'client-blocks-editor',
      plugins_url( 'client-blocks-editor.css', __FILE__ ),
      array( 'client-blocks' ),
      ( !defined( 'WP_ENV' ) || WP_ENV === 'production' ) ? false : time()
    );

    wp_enqueue_script(
      'client-blocks-editor',
      plugins_url( 'client-blocks-editor.js', __FILE__ ),
      array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ),
      ( !defined( 'WP_ENV' ) || WP_ENV === 'production' ) ? get_file_data( __FILE__, array( 'Version' ) )[0] : time()
    );
  } );

/* FRONT-END CLIENT BLOCKS ASSETS */
  add_action( 'enqueue_block_assets', function() {
    wp_enqueue_style(
      'client-blocks',
      plugins_url( 'client-blocks.css', __FILE__ ),
      null,
      ( !defined( 'WP_ENV' ) || WP_ENV === 'production' ) ? get_file_data( __FILE__, array( 'Version' ) )[0] : time()
    );
  } );

  add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_script(
      'client-blocks',
      plugins_url( 'client-blocks.js', __FILE__ ),
      array( 'jquery' ),
      ( !defined( 'WP_ENV' ) || WP_ENV === 'production' ) ? get_file_data( __FILE__, array( 'Version' ) )[0] : time(),
      true
    );
  } );
