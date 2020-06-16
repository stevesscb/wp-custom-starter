<?php get_header(); ?>

  <?php if ( have_posts() ) : the_post(); ?>

    <div class="content-block">
      <div class="wrapper">

        <main id="main">

          <?php the_title( '<h1>', '</h1>' ); ?>

          <?php the_content(); ?>

          <?php edit_post_link( __( 'Edit', 'grayscale' ), '<ul class="wp-article-links"><li>', '</li></ul>' ); ?>

        </main>

        <?php get_sidebar(); ?>

      </div>
    </div>

  <?php endif; ?>

<?php get_footer(); ?>
