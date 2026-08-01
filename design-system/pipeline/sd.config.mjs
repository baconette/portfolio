import StyleDictionary from 'style-dictionary';

export default {
  source: ['../tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          // theme.css intentionally keeps Tailwind's own spacing scale and
          // breakpoints/grid instead of adopting these — excluded here so
          // dist/tokens.css doesn't leak an unused parallel system into the
          // app's CSS import. tokens.json itself stays complete for other
          // consumers (Storybook, Figma).
          filter: (token) => token.path[0] !== 'spacing' && token.path[0] !== 'layout',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.flat.json',
          format: 'json/flat',
        },
      ],
    },
  },
};
