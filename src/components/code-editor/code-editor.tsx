import Editor, { useMonaco } from '@monaco-editor/react';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';
import Theme from '~/assets/codetheme.json';
import { nunjucksConfig, nunjucksLanguage } from '~/components/code-editor/nunjucks';

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
    if (!monaco) return;

    language === 'html' ? emmetHTML(monaco, ['html', 'nunjucks']) : emmetCSS(monaco, ['css']);

    monaco.editor.defineTheme('streali', Theme);
    setCustomTheme(true);

    if (language === 'html') {
      monaco.languages.register({ id: 'nunjucks' });
      monaco.languages.setMonarchTokensProvider('nunjucks', nunjucksLanguage);
      monaco.languages.setLanguageConfiguration('nunjucks', nunjucksConfig);

      const completionDisposable = monaco.languages.registerCompletionItemProvider('nunjucks', {
        provideCompletionItems(model, position) {
          const word = model.getWordUntilPosition(position);

          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return {
            suggestions: [
              {
                label: 'Conditional',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'If statement',
                insertText: '{% if ${1:condition} %}\n\t$0\n{% endif %}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
              },
              {
                label: 'Loop',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'For loop',
                insertText: '{% for ${1:item} in ${2:items} %}\n\t$0\n{% endfor %}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
              },
              {
                label: 'Variable',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'Variable',
                insertText: '{{ ${1:variable} }}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
              },
              {
                label: 'displayBadges',
                kind: monaco.languages.CompletionItemKind.Variable,
                documentation: 'Array of badges',
                insertText: 'displayBadges',
                range,
              },
              {
                label: 'color',
                kind: monaco.languages.CompletionItemKind.Variable,
                documentation: 'Twitch Color of the user',
                insertText: 'color',
                range,
              },
              {
                label: 'message',
                kind: monaco.languages.CompletionItemKind.Variable,
                documentation: 'Message of the user',
                insertText: 'message',
                range,
              },
              {
                label: 'username',
                kind: monaco.languages.CompletionItemKind.Variable,
                documentation: 'Name of the user',
                insertText: 'username',
                range,
              },
            ],
          };
        },
      });

      return () => {
        completionDisposable?.dispose();
      };
    }
  }, [monaco]);

  return (
    <div className={`h-full w-full ${className}`}>
      <Editor
        defaultLanguage={language === 'html' ? 'nunjucks' : language}
        defaultValue={initialValue}
        theme={customTheme ? 'streali' : 'vs-dark'}
        className={editorClassName}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          lineHeight: 30,
          tabSize: 2,
          suggest: {
            insertMode: 'replace',
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
