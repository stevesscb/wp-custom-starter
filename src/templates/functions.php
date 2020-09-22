<?php

require 'functions-core.php';
require 'functions-gutenberg.php';
require 'functions-widgets.php';

/* CONTENT */
  if ( ! isset( $content_width ) ) {
    $content_width = 1200;
  }

/* ENQUEUE */
  add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style(
      'client-theme',
      get_stylesheet_uri(),
      null,
      ( !defined( 'WP_ENV' ) || WP_ENV === 'production' ) ? wp_get_theme()->get( 'Version' ) : time()
    );

    wp_enqueue_script(
      'client-theme',
      get_stylesheet_directory_uri() . '/application.js',
      array( 'jquery' ),
      ( !defined( 'WP_ENV' ) || WP_ENV === 'production' ) ? wp_get_theme()->get( 'Version' ) : time(),
      true
    );
  } );

/* PRINT QR CODE */
  add_action( 'wp_footer', function() {
    if ( is_singular() && !is_front_page() ) {
      echo '<style>h1::after{content:url("https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=' . get_the_permalink() . '&choe=UTF-8&chld=L|0");position:absolute;top:0;right:0}@media print{h1{padding-right:200px;text-align:left}}@media screen{h1::after{opacity:0}}</style>';
    }
  }, 20 );
