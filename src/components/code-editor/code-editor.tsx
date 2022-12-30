import Editor, { useMonaco } from '@monaco-editor/react';
import { emmetHTML, emmetCSS, expandAbbreviation } from 'emmet-monaco-es';
import Theme from '~/assets/codetheme.json';

interface CodeEditorProps {
  initialValue: string;
  language?: 'html' | 'css';
  className?: string;
  editorClassName?: string;
  onChange?: (value: string) => void;
}

const CodeEditor = (props: CodeEditorProps) => {
  const { initialValue, language = 'html', className = '', editorClassName, onChange } = props;
  const monaco = useMonaco();
  const [customTheme, setCustomTheme] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    onChange?.(value || '');
  };

  useEffect(() => {
    if (monaco) {
      // Emmet
      language === 'html' ? emmetHTML(monaco, ['html', 'liquid']) : emmetCSS(monaco, ['css']);

      monaco.languages.register({ id: 'liquid' });

      monaco.languages.registerCompletionItemProvider('liquid', {
        provideCompletionItems: () => {
          const autocompleteProviderItems = [];
          const keywords = [
            'assign',
            'capture',
            'endcapture',
            'increment',
            'decrement',
            'if',
            'else',
            'elsif',
            'endif',
            'for',
            'endfor',
            'break',
            'continue',
            'limit',
            'offset',
            'range',
            'reversed',
            'cols',
            'case',
            'endcase',
            'when',
            'block',
            'endblock',
            'true',
            'false',
            'in',
            'unless',
            'endunless',
            'cycle',
            'tablerow',
            'endtablerow',
            'contains',
            'startswith',
            'endswith',
            'comment',
            'endcomment',
            'raw',
            'endraw',
            'editable',
            'endentitylist',
            'endentityview',
            'endinclude',
            'endmarker',
            'entitylist',
            'entityview',
            'forloop',
            'image',
            'include',
            'marker',
            'outputcache',
            'plugin',
            'style',
            'text',
            'widget',
            'abs',
            'append',
            'at_least',
            'at_most',
            'capitalize',
            'ceil',
            'compact',
            'concat',
            'date',
            'default',
            'divided_by',
            'downcase',
            'escape',
            'escape_once',
            'first',
            'floor',
            'join',
            'last',
            'lstrip',
            'map',
            'minus',
            'modulo',
            'newline_to_br',
            'plus',
            'prepend',
            'remove',
            'remove_first',
            'replace',
            'replace_first',
            'reverse',
            'round',
            'rstrip',
            'size',
            'slice',
            'sort',
            'sort_natural',
            'split',
            'strip',
            'strip_html',
            'strip_newlines',
            'times',
            'truncate',
            'truncatewords',
            'uniq',
            'upcase',
            'url_decode',
            'url_encode',
          ];

          for (let i = 0; i < keywords.length; i++) {
            autocompleteProviderItems.push({
              label: keywords[i],
              kind: monaco.languages.CompletionItemKind.Keyword,
            });
          }

          return { suggestions: autocompleteProviderItems };
        },
      });

      monaco.editor.defineTheme('ok', Theme);
      setCustomTheme(true);
    }
  }, [monaco]);

  return (
    <div className={`h-full w-full ${className}`}>
      <Editor
        defaultLanguage={language === 'html' ? 'liquid' : language}
        defaultValue={initialValue}
        theme={customTheme ? 'ok' : 'vs-dark'}
        className={editorClassName}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default CodeEditor;
