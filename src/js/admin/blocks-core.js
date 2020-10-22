wp.domReady(function() {
  const whitelistedCoreBlocks = [
    'core/block',
    'core/button',
    'core/buttons',
    'core/embed',
    'core/freeform',
    'core/gallery',
    'core/heading',
    'core/image',
    'core/list',
    'core/paragraph',
    'core/quote',
  ];

  const whitelistedCoreStyles = [
  ];

  // Display statuses of Core Blocks and Block Styles
  console.group('Gutenberg Core Blocks and Core Styles');
  wp.blocks.getBlockTypes().forEach((blockType) => {
    const isCoreBlock = blockType.name.includes('core');
    const isWhitelistedBlock = whitelistedCoreBlocks.includes(blockType.name);

    if (isCoreBlock && !isWhitelistedBlock) {
      console.log(`%c✘ ${blockType.name}`, 'color: orangered');
    } else if (isCoreBlock && 'styles' in blockType) {
      console.group(`%c✔ ${blockType.name}`, 'color: lime');

      blockType.styles = blockType.styles.filter((style) => {
        return !style.isDefault;
      });

      blockType.styles.forEach((blockStyle) => {
        const isWhitelistedStyle =
          whitelistedCoreStyles.some((whitelistedStyle) => {
            return whitelistedStyle[0] === blockType.name &&
                whitelistedStyle[1] === blockStyle.name;
          });

        if (!isWhitelistedStyle) {
          console.log(
              `%c✘ ${blockType.name}, ${blockStyle.name}`,
              'color: orangered'
          );
        } else {
          console.log(
              `%c✔ ${blockType.name}, ${blockStyle.name}`,
              'color: lime'
          );
        }
      });

      console.groupEnd();
    } else if (isCoreBlock) {
      console.log(`%c✔ ${blockType.name}`, 'color: lime');
    }
  });
  console.groupEnd();

  // Disable unwanted Core Blocks and Block Styles
  wp.blocks.getBlockTypes().forEach((blockType) => {
    const isCoreBlock = blockType.name.includes('core');
    const isWhitelistedBlock = whitelistedCoreBlocks.includes(blockType.name);

    if (isCoreBlock && !isWhitelistedBlock) {
      // unregister core Blocks that are not whitelisted
      wp.blocks.unregisterBlockType(blockType.name);
    } else if (isCoreBlock && 'styles' in blockType) {
      // for the remaining core Blocks, process only the non-default Block Style
      blockType.styles = blockType.styles.filter((style) => {
        return !style.isDefault;
      });

      // unregister core Block Styles that are not whitelisted
      blockType.styles.forEach((blockStyle) => {
        const isWhitelistedStyle =
          whitelistedCoreStyles.some((whitelistedStyle) => {
            return whitelistedStyle[0] === blockType.name &&
                whitelistedStyle[1] === blockStyle.name;
          });

        if (!isWhitelistedStyle) {
          wp.blocks.unregisterBlockStyle(blockType.name, blockStyle.name);
        }
      });
    }
  } );
});
