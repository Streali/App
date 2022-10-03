import * as AccordionLib from '@radix-ui/react-accordion';
import { Icon } from '~/components/icon/icon';
import './accordion.scss';

export interface AccordionProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export const Accordion = (props: AccordionProps) => {
  const { title, className = '', children } = props;

  return (
    <AccordionLib.Root
      defaultValue="accordion"
      type="single"
      collapsible
      className={`accordion w-full ${className}`}
    >
      <AccordionLib.Item value="accordion" className="w-full">
        <AccordionLib.Header>
          <AccordionLib.Trigger className="w-full">
            <div className="mb-2 flex w-full items-center justify-between">
              <h4 className="font-medium">{title}</h4>
              <Icon
                name="arrow-down-s-line"
                className="accordion__arrow transition-all duration-300"
              />
            </div>
          </AccordionLib.Trigger>
        </AccordionLib.Header>
        <AccordionLib.Content forceMount className="accordion__content">
          <div>{children}</div>
        </AccordionLib.Content>
      </AccordionLib.Item>
    </AccordionLib.Root>
  );
};
