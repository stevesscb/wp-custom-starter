/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  InspectorControls,
  InnerBlocks,
  RichText,
} = wp.blockEditor;
const {
  PanelBody,
  TextControl,
  ToggleControl,
} = wp.components;

/*
 * Register block
 */
registerBlockType( 'client/accordion', {
  title: __( 'Accordion', 'grayscale' ),
  description: __(
    'Show information in a condensed way that can be expanded or collapsed.',
    'grayscale'
  ),
  icon: 'excerpt-view',
  category: 'widgets',
  attributes: {
    multiExpand: {
      type: 'boolean',
      default: false,
    },
    allowAllClosed: {
      type: 'boolean',
      default: true,
    },
  },
  supports: {
    align: [],
  },
  edit: ( props ) => {
    const {
      attributes: {
        multiExpand,
        allowAllClosed,
      },
      className,
      clientId,
      setAttributes,
    } = props;

    return [
      <InspectorControls key="inspector">
        <PanelBody title={ __( 'Accordion Settings', 'grayscale' ) }>
          <ToggleControl
            label={ __( 'Multi-expand', 'grayscale' ) }
            checked={ multiExpand }
            onChange={ () => setAttributes( {
              multiExpand: ! multiExpand,
            } ) }
          />
          <ToggleControl
            label={ __( 'Allow all closed', 'grayscale' ) }
            checked={ allowAllClosed }
            onChange={ () => setAttributes( {
              allowAllClosed: ! allowAllClosed,
            } ) }
          />
        </PanelBody>
      </InspectorControls>,
      <div
        key={ clientId }
        className={ classnames( 'accordion', className ) }
        data-accordion
      >
        <InnerBlocks allowedBlocks={ [ 'client/accordion-item' ] } />
      </div>,
    ];
  },
  save: ( props ) => {
    const {
      multiExpand,
      allowAllClosed,
    } = props.attributes;
    return (
      <ul
        className={ classnames( 'accordion' ) }
        data-accordion
        data-multi-expand={ multiExpand ? 'true' : 'false' }
        data-allow-all-closed={ allowAllClosed ? 'true' : 'false' }
        data-deep-link="true"
        data-deep-link-smudge="true"
        data-update-history="true"
      >
        <InnerBlocks.Content />
      </ul>
    );
  },
} );

registerBlockType( 'client/accordion-item', {
  title: __( 'Accordion Item', 'grayscale' ),
  description: __( 'Content within the Accordion.', 'grayscale' ),
  icon: 'text',
  category: 'common',
  parent: [ 'client/accordion' ],
  attributes: {
    accordionTitle: {
      type: 'array',
      source: 'children',
      selector: '.accordion-title',
    },
    accordionAnchor: {
      type: 'string',
    },
    isOpen: {
      type: 'boolean',
      default: false,
    },
  },
  edit: ( props ) => {
    const {
      attributes: {
        accordionTitle, accordionAnchor, isOpen,
      },
      className,
      clientId,
      setAttributes,
    } = props;

    return [
      <InspectorControls key="inspector">
        <PanelBody title={ __( 'Item Settings', 'grayscale' ) }>
          <ToggleControl
            label={ __( 'Open on load', 'grayscale' ) }
            checked={ isOpen }
            onChange={ () => setAttributes( {
              isOpen: ! isOpen,
            } ) }
          />
          <TextControl
            label={ __( 'HTML Anchor', 'grayscale' ) }
            value={ accordionAnchor }
            onChange={ ( id ) => setAttributes( {
              anchor: id,
            } ) }
          />
        </PanelBody>
      </InspectorControls>,
      <div
        key={ clientId }
        className={ classnames( 'accordion-item', 'is-active', className ) }
        data-accordion-item
      >
        <RichText
          className="accordion-title"
          value={ accordionTitle }
          onChange={ ( title ) => setAttributes( {
            accordionTitle: title,
          } ) }
          tagName="a"
          placeholder={ __( 'Accordion Title', 'grayscale' ) }
          keepPlaceholderOnFocus="true"
          multiline="false"
          allowedFormats="false"
        />
        <div className="accordion-content" data-tab-content>
          <InnerBlocks
            allowedBlocks={ [
              'core/button',
              'core/buttons',
              'core/heading',
              'core/image',
              'core/list',
              'core/paragraph',
            ] }
          />
        </div>
      </div>,
    ];
  },
  save: ( props ) => {
    const {
      accordionTitle, accordionAnchor, isOpen,
    } = props.attributes;

    return (
      <li
        className={ classnames(
          'accordion-item',
          { 'is-active': isOpen },
        ) }
        data-accordion-item
      >
        <a
          href={ ( accordionAnchor ) ?
            '#' + accordionAnchor :
            '#' + accordionTitle[ 0 ].replace( /[^0-9|A-Z|a-z]/g, '-' )
              .replace( /-+/g, '-' )
              .toLowerCase()
          }
          className="accordion-title"
        >
          <RichText.Content value={ accordionTitle } />
        </a>
        <div
          id={ ( accordionAnchor ) ?
            accordionAnchor :
            accordionTitle[ 0 ].replace( /[^0-9|A-Z|a-z]/g, '-' )
              .replace( /-+/g, '-' )
              .toLowerCase()
          }
          className="accordion-content"
          data-tab-content
        >
          <InnerBlocks.Content />
        </div>
      </li>
    );
  },
} );
