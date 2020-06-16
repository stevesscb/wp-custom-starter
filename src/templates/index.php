<?php get_header(); ?>

  <?php if ( have_posts() ) : the_post(); ?>

    <div class="content-block">
      <div class="wrapper">

        <main id="main">

          <article <?php post_class(); ?>>

            <?php the_title( '<h1>', '</h1>' ); ?>

            <?php the_content(); ?>

            <?php wp_link_pages(); ?>

            <?php edit_post_link( __( 'Edit', 'grayscale' ), '<ul class="wp-article-links"><li>', '</li></ul>' ); ?>

          </article>

        </main>

        <?php get_sidebar(); ?>

      </div>
    </div>

  <?php endif; ?>

<?php get_footer(); ?>
