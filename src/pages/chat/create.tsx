import GoogleFontLoader from 'react-google-font-loader';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Button, ButtonColor } from '~/components/button/button';
import { ChatDemo } from '~/components/chat/chat-demo/chat-demo';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { ChatSettings } from '~/components/chat/chat-settings/chat-settings';
import CodeEditor from '~/components/code-editor/code-editor';
import DemoContainer from '~/components/demo-container/demo-container';
import { Switch } from '~/components/forms/switch/switch';
import { useCreateChat } from '~/hooks/chat/use-create-chat';
import { defaultChatTheme } from '~/utils/chat/default-chat-theme';
import type { ChatTheme } from '~/types/schemas/chat';

export const ChatCreate = () => {
  const [settings, setSettings] = useState(defaultChatTheme);
  const [developerMode, setDeveloperMode] = useState(false);
  const { watch, getValues, control, handleSubmit } = useForm({
    defaultValues: settings as FieldValues,
  });

  const navigate = useNavigate();

  const { mutate: createChat } = useCreateChat();

  const onSubmit = handleSubmit((theme: FieldValues) => {
    createChat(theme as ChatTheme, {
      onSuccess: (data) => {
        navigate(`/chats/${data.id}/edit`);
      },
    });
  });

  useEffect(() => {
    const subscription = watch((value) => setSettings(value as ChatTheme));
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  return (
    <form onSubmit={onSubmit}>
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
      <div className="flex gap-10 p-10">
        <div className="w-[450px] shrink-0">
          <div className="mb-5 flex items-center justify-between">
            <h1 className="font-title text-4xl font-semibold">New chatbox</h1>
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
                defaultValue={'<div>test</div>'}
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
                defaultValue={'.test { color: red; }'}
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
};
