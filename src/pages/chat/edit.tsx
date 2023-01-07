import GoogleFontLoader from 'react-google-font-loader';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Button, ButtonColor } from '~/components/button/button';
import { ChatDemo } from '~/components/chat/chat-demo/chat-demo';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { ChatSettings } from '~/components/chat/chat-settings/chat-settings';
import CodeEditor from '~/components/code-editor/code-editor';
import DemoContainer from '~/components/demo-container/demo-container';
import { Switch } from '~/components/forms/switch/switch';
import { useChat } from '~/hooks/chat/use-chat';
import { useUpdateChat } from '~/hooks/chat/use-update-chat';
import { defaultChatTheme, defaultCss, defaultHtml } from '~/utils/chat/default-chat-theme';
import type { ChatTheme } from '~/types/schemas/chat';

export default function ChatEdit() {
  const [settings, setSettings] = useState<ChatTheme | null>(null);
  const [developerMode, setDeveloperMode] = useState(false);
  const { id } = useParams();
  const { data: theme, status, error } = useChat(id!);

  const { watch, getValues, control, handleSubmit, reset } = useForm({
    defaultValues: theme as FieldValues,
  });

  useEffect(() => {
    if (!theme) return;

    setSettings(theme);
    reset(theme);
    setDeveloperMode(theme.global.developer_mode || false);
  }, [theme]);

  useEffect(() => {
    if (!developerMode) return;

    const theme = getValues() as ChatTheme;

    if (theme.code?.html === null) {
      theme.code.html = defaultHtml;
    }

    if (theme.code?.css === null) {
      theme.code.css = defaultCss;
    }

    reset(theme);
  }, [developerMode]);

  const { mutate: updateChat } = useUpdateChat();

  const onSubmit = handleSubmit((theme: FieldValues) => {
    updateChat(theme as ChatTheme);
  });

  useEffect(() => {
    const subscription = watch((value) => setSettings(value as ChatTheme));
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  if (status === 'loading' || !settings) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      {settings?.name?.text.fontFamily && settings?.message?.text.fontFamily && (
        <GoogleFontLoader
          fonts={[
            {
              font: settings.name.text.fontFamily,
              weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
            },
            {
              font: settings.message.text.fontFamily,
              weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
            },
          ]}
        />
      )}
      <div className="flex gap-10 p-10">
        <div className="w-[450px] shrink-0">
          <div className="mb-5 flex items-center justify-between">
            <h1 className="font-title text-4xl font-semibold">Edit chatbox</h1>
            <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
              Save
            </Button>
          </div>
          <Controller
            name="global.developer_mode"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <Switch
                onChange={(checked) => {
                  onChange(checked);
                  setDeveloperMode(checked);
                }}
                checked={value}
                label="Developer mode"
                className="mb-5"
              />
            )}
          />
          <ChatSettings
            className="overflow-hidden"
            developerMode={developerMode}
            control={control}
          />
        </div>
        <div className="flex flex-1 gap-10">
          <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-dark-600 p-10">
            <ChatMessage
              settings={settings}
              message={{
                id: '1',
                username: 'Pseudo',
                twitch: 'pseudo',
                emotes: {},
                date: new Date(),
                message: 'Message content',
                badges: {
                  admin: true,
                  broadcaster: false,
                  moderator: true,
                  partner: true,
                  vip: false,
                  artist: false,
                },
                mod: true,
                subscriber: false,
                color: '#4287f5',
              }}
            />
          </div>
          <DemoContainer isDeveloperMode={developerMode}>
            <ChatDemo settings={settings} />
          </DemoContainer>
        </div>
      </div>
      {developerMode && (
        <div className="px-10 pb-10">
          <div className="box-border flex h-[350px] gap-5 rounded-2xl bg-dark-600 p-5">
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
          </div>
        </div>
      )}
    </form>
  );
}
