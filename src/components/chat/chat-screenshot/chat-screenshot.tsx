import { motion } from 'framer-motion';
import { ChatMessage } from '~/components/chat/chat-message/chat-message';
import { generateTwitchMessage } from '~/utils/chat/generate-chat-message';
import type { ChatTheme, TwitchMessage } from '~/types/schemas/chat';
import { Input } from '~/components/forms/input/input';
import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { useExportElementToPng } from '~/hooks/use-export-element-to-png';

export interface ChatScreenshotProps {
  settings: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme;
}

export const ChatScreenshot = (props: ChatScreenshotProps) => {
  const { settings } = props;
  const [numberOfMessages, setNumberOfMessages] = useState(5);
  const [messages, setMessages] = useState<TwitchMessage[]>([]);

  const { exportElement } = useExportElementToPng();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const takeScreenshot = () => {
    if (messagesContainerRef.current) {
      exportElement(messagesContainerRef.current);
    }
  };

  useEffect(() => {
    setMessages(new Array(numberOfMessages).fill(0).map(generateTwitchMessage));
  }, [numberOfMessages]);

  return (
    <div className="flex">
      <div className="w-1/2" ref={messagesContainerRef}>
        {messages.map((message: TwitchMessage) => (
          <motion.div
            key={message.id}
            className="w-full"
            layout={settings.global.animation !== 'none'}
          >
            <ChatMessage settings={settings} message={message} />
          </motion.div>
        ))}
      </div>
      <div className="w-1/2 space-y-4 pl-4">
        <Input
          label="Number of messages"
          onChange={(event) =>
            setNumberOfMessages(Number((event.target as HTMLInputElement).value))
          }
          value={numberOfMessages}
        />
        <Button
          iconLeft="file-copy-line"
          color={ButtonColor.Primary}
          onClick={takeScreenshot}
          size={ButtonSize.Small}
        >
          Take a screenshot
        </Button>
      </div>
    </div>
  );
};
