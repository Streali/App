import CSS from 'css';

export function scopeCSS(css: string, scope: string) {
  const ast = CSS.parse(css);

  if (!ast.stylesheet) {
    return '';
  }

  for (const rule of ast.stylesheet.rules) {
    if (isRule(rule)) {
      rule.selectors = rule.selectors?.map((selector) => `${scope} ${selector}`);
    }
  }

  return CSS.stringify(ast);
}

function isRule(rule: CSS.Rule): rule is CSS.Rule {
  return rule.type === 'rule';
}
