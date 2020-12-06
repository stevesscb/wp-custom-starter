<?php

/* ENQUEUE */
  add_action( 'wp_enqueue_scripts', function() {
    if ( !is_admin() ) {
      wp_dequeue_style( 'wp-block-library' );
    }
  }, 99 );

  add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
      'blocks-core',
      get_template_directory_uri() . '/admin/blocks-core.js',
      array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
      time()
    );
  } );

/* FEATURES */
  add_action( 'after_setup_theme', function() {
    add_editor_style( 'editor.css' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'disable-custom-colors' );
    add_theme_support( 'disable-custom-font-sizes' );
    add_theme_support( 'disable-custom-gradients' );
    add_theme_support( 'editor-color-palette' );
    add_theme_support( 'editor-font-sizes' );
    add_theme_support( 'editor-gradient-presets' );
  } );
