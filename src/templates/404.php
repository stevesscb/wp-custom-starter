<?php get_header(); ?>

<main id="main">

  <div class="content-block">
    <div class="wrapper">

      <h1><?php _e('Page Not Found', 'custom'); ?></h1>

      <p><?php _e('The page you are looking for does not exist. Try something else?', 'custom'); ?></p>

      <?php get_search_form(); ?>

      <p><a href="<?php echo home_url(); ?>"><?php _e('&larr; Return Home', 'custom'); ?></a></p>

    </div>
  </div>

</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>