import { Control, Controller } from 'react-hook-form';
import { Accordion } from '../../accordion/accordion';
import { BorderRadius } from '../../forms/border-radius/border-radius';
import { Border } from '../../forms/border/border';
import { Color } from '../../forms/color/color';
import { Shadow } from '../../forms/shadow/shadow';
import { Spacing } from '../../forms/spacing/spacing';
import { TextStyle } from '../../forms/text-style/text-style';

export interface TabGeneralProps {
  control: Control;
}

export const TabMessage = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="p-6 bg-dark-600 rounded-2xl h-[calc(100vh_-_208px)] overflow-y-auto custom-scrollbar">
      <Accordion title="Text style">
        <Controller
          name="message.text"
          control={control}
          //defaultValue={}
          render={({ field: { onChange, value } }) => (
            <TextStyle onChange={onChange} settings={value} />
          )}
        />
      </Accordion>
      <Accordion title="Box background">
        <Controller
          name="message.background"
          control={control}
          defaultValue={'#000000'}
          render={({ field: { onChange, value } }) => (
            <Color value={value} onColorChange={onChange} containerClassName="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Box Shadow">
        <Controller
          name="message.shadow"
          control={control}
          defaultValue={{
            shadowColor: '#000000',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
          }}
          render={({ field: { onChange, value } }) => (
            <Shadow settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Box border">
        <Controller
          name="message.border"
          control={control}
          //defaultValue={'left'}
          render={({ field: { onChange, value } }) => (
            <Border className="mb-3" onChange={onChange} settings={value} />
          )}
        />
      </Accordion>
      <Accordion title="Outer margin">
        <Controller
          name="message.margin"
          control={control}
          //defaultValue={}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Inner margin">
        <Controller
          name="message.padding"
          control={control}
          //defaultValue={}
          render={({ field: { onChange, value } }) => (
            <Spacing settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
      <Accordion title="Border radius">
        <Controller
          name="message.radius"
          control={control}
          //defaultValue={}
          render={({ field: { onChange, value } }) => (
            <BorderRadius settings={value} onChange={onChange} className="mb-3" />
          )}
        />
      </Accordion>
    </div>
  );
};
