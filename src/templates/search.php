<?php get_header(); ?>

<main id="main">

  <div class="content-block">
    <div class="wrapper">

      <?php if ($tmp = get_search_query()) : ?>
        <h1><?php printf(__('Search Results for “%s”', 'custom'), $tmp); ?></h1>
      <?php else : ?>
        <h1><?php _e('You might be interested in&hellip;', 'custom'); ?></h1>
      <?php endif; ?>

      <?php if (have_posts()) : ?>

        <?php while (have_posts()) : the_post(); ?>

          <article <?php post_class(); ?>>

            <p><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></p>

            <p class="article-meta">
              <small>
                <?php
                $date = '<time datetime="' . get_the_date('Y-m-d') . '">' . get_the_date() . '</time>';
                printf(__('Posted by %s on %s', 'custom'), esc_html(get_the_author()), $date);
                ?>
              </small>
            </p>

            <?php the_excerpt(); ?>

            <ul class="wp-article-links">
              <li><a href="<?php the_permalink(); ?>"><?php _e('Continue Reading &rarr;', 'custom'); ?></a></li>
              <?php if (comments_open() || get_comments_number()) : ?>
                <li><a href="<?php comments_link(); ?>"><?php comments_number('No Comments', '1 Comment', '% Comments'); ?></a></li>
              <?php endif; ?>
              <?php edit_post_link(__('Edit', 'custom'), '<li>', '</li>'); ?>
            </ul>

          </article>

        <?php endwhile; ?>

        <?php
        the_posts_pagination(array(
          'prev_text' => __('&larr;', 'custom'),
          'next_text' => __('&rarr;', 'custom'),
        ));
        ?>

      <?php else : ?>

        <p><?php _e('Sorry, we cannot find what you are looking for. Try something else?', 'custom'); ?></p>

        <?php get_search_form(); ?>

      <?php endif; ?>

    </div>
  </div>

</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>