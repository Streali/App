import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  language?: 'html' | 'css';
  className?: string;
  editorClassName?: string;
  onChange?: (value: string) => void;
}

const CodeEditor = (props: CodeEditorProps) => {
  const { initialValue, language = 'html', className = '', editorClassName, onChange } = props;

  const handleEditorChange = (value: string | undefined) => {
    onChange?.(value || '');
  };

  return (
    <div className={`h-full w-full ${className}`}>
      <Editor
        defaultLanguage={language}
        defaultValue={initialValue}
        theme="vs-dark"
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
