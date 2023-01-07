import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import CodeEditor from './code-editor';

export default {
  component: CodeEditor,
  title: 'CodeEditor',
} as ComponentMeta<typeof CodeEditor>;

const Template: ComponentStory<typeof CodeEditor> = (args) => <CodeEditor {...args} />;
export const MultipleEditor = () => {
  const { control } = useForm({
    defaultValues: defaultChatTheme as FieldValues,
  });
  return (
    <PanelGroup direction="horizontal">
      <div className="w-full px-10 pb-10">
        <div className="box-border flex h-[350px] gap-5 rounded-2xl bg-dark-600 p-5">
          <Panel collapsible={true}>
            <div className="h-full flex-1">
              <p className="mb-3 font-bold">HTML</p>
              <Controller
                name="code.html"
                control={control}
                defaultValue={defaultChatTheme.code?.html}
                render={({ field: { onChange, value } }) => (
                  <CodeEditor
                    language="html"
                    initialValue={value}
                    onChange={onChange}
                    className="!h-[270px]"
                  />
                )}
              />
            </div>
          </Panel>
          <PanelResizeHandle className="flex flex-[0_0_1em]">
            <svg className="AzW8qW_HorizontalIcon OG5fOa_Icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18,16V13H15V22H13V2H15V11H18V8L22,12L18,16M2,12L6,16V13H9V22H11V2H9V11H6V8L2,12Z"
              ></path>
            </svg>
          </PanelResizeHandle>
          <Panel collapsible={true}>
            <div className="h-full flex-1">
              <p className="mb-3 font-bold">CSS</p>
              <Controller
                name="code.css"
                control={control}
                defaultValue={defaultChatTheme.code?.css}
                render={({ field: { onChange, value } }) => (
                  <CodeEditor
                    language="css"
                    initialValue={value}
                    onChange={onChange}
                    className="!h-[270px]"
                  />
                )}
              />
            </div>
          </Panel>
        </div>
      </div>
    </PanelGroup>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  initialValue: '<p>Coucou</p>',
  className: 'h-screen',
  language: 'css',
};
