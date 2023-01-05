export const nunjucksLanguage = {
  defaultToken: '',
  tokenPostfix: '',
  ignoreCase: true,

  keywords: ['for', 'if', 'endfor', 'endif', 'true', 'false', 'and', 'or', 'in'],

  typeKeywords: ['any', 'boolean', 'number', 'object', 'string', 'undefined'],

  tokenizer: {
    root: [
      // whitespace
      [/\s+/],

      // Nunjucks Tag Delimiters
      [/{#/, 'comment.nunjucks', '@commentState'],
      [/{%[-~]?/, 'delimiter.nunjucks', '@blockState'],
      [/{{[-~]?/, 'delimiter.nunjucks', '@variableState'],

      // HTML
      [/<!DOCTYPE/, 'metatag.html', '@doctype'],
      [/<!--/, 'comment.html', '@comment'],
      [/(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/, ['delimiter.html', 'tag.html', '', 'delimiter.html']],
      [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],
      [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],
      [/(<)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
      [/(<\/)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
      [/</, 'delimiter.html'],
      [/[^<]+/], // text
    ],

    /**
     * Comment Tag Handling
     */
    commentState: [
      [/#}/, 'comment.nunjucks', '@pop'],
      [/./, 'comment.nunjucks'],
    ],

    /**
     * Block Tag Handling
     */
    blockState: [
      [/[-~]?%}/, 'delimiter.nunjucks', '@pop'],
      // whitespace
      [/\s+/],
      // verbatim
      // Unlike other blocks, verbatim has its own state
      // transition to ensure we mark its contents as strings.
      [
        /(verbatim)(\s*)([-~]?%})/,
        ['keyword.nunjucks', '', { token: 'delimiter.nunjucks', next: '@rawDataState' }],
      ],
      { include: 'expression' },
    ],

    rawDataState: [
      // endverbatim
      [
        /({%[-~]?)(\s*)(endverbatim)(\s*)([-~]?%})/,
        [
          'delimiter.nunjucks',
          '',
          'keyword.nunjucks',
          '',
          { token: 'delimiter.nunjucks', next: '@popall' },
        ],
      ],
      [/./, 'string.nunjucks'],
    ],

    /**
     * Variable Tag Handling
     */
    variableState: [[/[-~]?}}/, 'delimiter.nunjucks', '@pop'], { include: 'expression' }],

    stringState: [
      // closing double-quoted string
      [/"/, 'string.nunjucks', '@pop'],
      // interpolation start
      [/#{\s*/, 'string.nunjucks', '@interpolationState'],
      // string part
      [/[^#"\\]*(?:(?:\\.|#(?!\{))[^#"\\]*)*/, 'string.nunjucks'],
    ],

    interpolationState: [
      // interpolation end
      [/}/, 'string.nunjucks', '@pop'],
      { include: 'expression' },
    ],

    /**
     * Expression Handling
     */
    expression: [
      // whitespace
      [/\s+/],
      // operators - math
      [/\+|-|\/{1,2}|%|\*{1,2}/, 'operators.nunjucks'],
      // operators - logic
      [/(and|or|not|b-and|b-xor|b-or)(\s+)/, ['operators.nunjucks', '']],
      // operators - comparison (symbols)
      [/==|!=|<|>|>=|<=/, 'operators.nunjucks'],
      // operators - comparison (words)
      [/(starts with|ends with|matches)(\s+)/, ['operators.nunjucks', '']],
      // operators - containment
      [/(in)(\s+)/, ['operators.nunjucks', '']],
      // operators - test
      [/(is)(\s+)/, ['operators.nunjucks', '']],
      // operators - misc
      [/\||~|:|\.{1,2}|\?{1,2}/, 'operators.nunjucks'],
      // names
      [
        /[^\W\d][\w]*/,
        {
          cases: {
            '@keywords': 'keyword.nunjucks',
            '@default': 'variable.nunjucks',
          },
        },
      ],
      // numbers
      [/\d+(\.\d+)?/, 'number.nunjucks'],
      // punctuation
      [/\(|\)|\[|\]|{|}|,/, 'delimiter.nunjucks'],
      // strings
      [/"([^#"\\]*(?:\\.[^#"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\'/, 'string.nunjucks'],
      // opening double-quoted string
      [/"/, 'string.nunjucks', '@stringState'],

      // misc syntactic constructs
      // These are not operators per se, but for the purposes of lexical analysis we
      // can treat them as such.
      // arrow functions
      [/=>/, 'operators.nunjucks'],
      // assignment
      [/=/, 'operators.nunjucks'],
    ],

    /**
     * HTML
     */
    doctype: [
      [/[^>]+/, 'metatag.content.html'],
      [/>/, 'metatag.html', '@pop'],
    ],

    comment: [
      [/-->/, 'comment.html', '@pop'],
      [/[^-]+/, 'comment.content.html'],
      [/./, 'comment.content.html'],
    ],

    otherTag: [
      [/\/?>/, 'delimiter.html', '@pop'],
      [/"([^"]*)"/, 'attribute.value.html'],
      [/'([^']*)'/, 'attribute.value.html'],
      [/[\w\-]+/, 'attribute.name.html'],
      [/=/, 'delimiter.html'],
      [/[ \t\r\n]+/], // whitespace
    ],

    // -- BEGIN <script> tags handling

    // After <script
    script: [
      [/type/, 'attribute.name.html', '@scriptAfterType'],
      [/"([^"]*)"/, 'attribute.value.html'],
      [/'([^']*)'/, 'attribute.value.html'],
      [/[\w\-]+/, 'attribute.name.html'],
      [/=/, 'delimiter.html'],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@scriptEmbedded',
          nextEmbedded: 'text/javascript',
        },
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(script\s*)(>)/,
        ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }],
      ],
    ],

    // After <script ... type
    scriptAfterType: [
      [/=/, 'delimiter.html', '@scriptAfterTypeEquals'],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@scriptEmbedded',
          nextEmbedded: 'text/javascript',
        },
      ], // cover invalid e.g. <script type>
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <script ... type =
    scriptAfterTypeEquals: [
      [
        /"([^"]*)"/,
        {
          token: 'attribute.value.html',
          switchTo: '@scriptWithCustomType.$1',
        },
      ],
      [
        /'([^']*)'/,
        {
          token: 'attribute.value.html',
          switchTo: '@scriptWithCustomType.$1',
        },
      ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@scriptEmbedded',
          nextEmbedded: 'text/javascript',
        },
      ], // cover invalid e.g. <script type=>
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <script ... type = $S2
    scriptWithCustomType: [
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@scriptEmbedded.$S2',
          nextEmbedded: '$S2',
        },
      ],
      [/"([^"]*)"/, 'attribute.value.html'],
      [/'([^']*)'/, 'attribute.value.html'],
      [/[\w\-]+/, 'attribute.name.html'],
      [/=/, 'delimiter.html'],
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    scriptEmbedded: [
      [/<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
      [/[^<]+/, ''],
    ],

    // -- END <script> tags handling

    // -- BEGIN <style> tags handling

    // After <style
    style: [
      [/type/, 'attribute.name.html', '@styleAfterType'],
      [/"([^"]*)"/, 'attribute.value.html'],
      [/'([^']*)'/, 'attribute.value.html'],
      [/[\w\-]+/, 'attribute.name.html'],
      [/=/, 'delimiter.html'],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@styleEmbedded',
          nextEmbedded: 'text/css',
        },
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(style\s*)(>)/,
        ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }],
      ],
    ],

    // After <style ... type
    styleAfterType: [
      [/=/, 'delimiter.html', '@styleAfterTypeEquals'],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@styleEmbedded',
          nextEmbedded: 'text/css',
        },
      ], // cover invalid e.g. <style type>
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <style ... type =
    styleAfterTypeEquals: [
      [
        /"([^"]*)"/,
        {
          token: 'attribute.value.html',
          switchTo: '@styleWithCustomType.$1',
        },
      ],
      [
        /'([^']*)'/,
        {
          token: 'attribute.value.html',
          switchTo: '@styleWithCustomType.$1',
        },
      ],
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@styleEmbedded',
          nextEmbedded: 'text/css',
        },
      ], // cover invalid e.g. <style type=>
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    // After <style ... type = $S2
    styleWithCustomType: [
      [
        />/,
        {
          token: 'delimiter.html',
          next: '@styleEmbedded.$S2',
          nextEmbedded: '$S2',
        },
      ],
      [/"([^"]*)"/, 'attribute.value.html'],
      [/'([^']*)'/, 'attribute.value.html'],
      [/[\w\-]+/, 'attribute.name.html'],
      [/=/, 'delimiter.html'],
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
    ],

    styleEmbedded: [
      [/<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
      [/[^<]+/, ''],
    ],
  },
};
export const nunjucksConfig = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,

  comments: {
    blockComment: ['{#', '#}'],
  },

  brackets: [
    ['{#', '#}'],
    ['{%', '%}'],
    ['{{', '}}'],
    ['(', ')'],
    ['[', ']'],

    // HTML
    ['<!--', '-->'],
    ['<', '>'],
  ],

  autoClosingPairs: [
    { open: '{# ', close: ' #}' },
    { open: '{% ', close: ' %}' },
    { open: '{{ ', close: ' }}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],

  surroundingPairs: [
    { open: '"', close: '"' },
    { open: "'", close: "'" },

    // HTML
    { open: '<', close: '>' },
  ],
};
