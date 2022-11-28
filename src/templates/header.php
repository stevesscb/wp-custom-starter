<!doctype html>
<html <?php language_attributes(); ?> class="no-js" data-site='custom'>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <?php wp_body_open(); ?>

  <a href="#main" class="screen-reader-text"><?php _e('Skip to content', 'custom'); ?></a>

  <div class="view">

    <header class="header">
      <div class="wrapper">

        <?php if (has_custom_logo()) : ?>

          <?php the_custom_logo(); ?>

        <?php endif; ?>

        <?php if (has_nav_menu('main')) : ?>
          <nav>
            <?php
            wp_nav_menu(array(
              'menu_class' => 'menu',
              'menu_id' => 'menu-main',
              'container' => false,
              'walker' => new GS_Header_Nav_Menu(),
              'theme_location' => 'main',
            ));
            ?>
          </nav>
        <?php endif; ?>

      </div>
    </header>