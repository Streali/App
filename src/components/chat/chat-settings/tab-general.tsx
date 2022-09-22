import { Control, Controller } from 'react-hook-form';
import { Accordion } from '../../accordion/accordion';
import { Alignment } from '../../forms/alignment/alignment';
import { DnDList } from '../../forms/dnd-list/dnd-list';
import { Input } from '../../forms/input/input';
import { Select } from '../../forms/select/select';
import { Slider } from '../../forms/slider/slider';

export interface TabGeneralProps {
  control: Control;
}

export const TabGeneral = (props: TabGeneralProps) => {
  const { control } = props;

  return (
    <div className="p-6 bg-dark-600 rounded-2xl h-[calc(100vh_-_208px)] overflow-y-auto">
      <Accordion title="Title">
        <Controller
          name="title"
          control={control}
          defaultValue="Chat theme title"
          render={({ field: { onChange, value } }) => (
            <Input
              defaultValue={value}
              className="mb-3"
              type="text"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                onChange(target.value);
              }}
            />
          )}
        />
      </Accordion>
      <Accordion title="Space between messages">
        <Controller
          name="global.space_between_messages"
          control={control}
          defaultValue={0}
          render={({ field: { onChange, value } }) => (
            <Slider
              className="mb-3"
              max={100}
              min={0}
              onChange={(value) => onChange(value[0])}
              value={[value]}
              haveInput
              inputSuffix="px"
            />
          )}
        />
      </Accordion>
      <Accordion title="Alignment">
        <Controller
          name="global.alignment"
          control={control}
          defaultValue={'left'}
          render={({ field: { onChange, value } }) => (
            <Alignment className="mb-3" value={value} onChange={onChange} />
          )}
        />
      </Accordion>
      <Accordion title="Layout">
        <Controller
          name="global.layout"
          control={control}
          defaultValue={{ label: 'Stack', value: 'stack' }}
          render={({ field: { onChange, value } }) => (
            <Select
              defaultValue={value}
              onChange={onChange}
              className="mb-3"
              options={[
                { label: 'Stack', value: 'stack' },
                { label: 'Inline', value: 'inline' },
              ]}
            />
          )}
        />
      </Accordion>
      <Accordion title="Order">
        <Controller
          name="global.order"
          control={control}
          defaultValue={[
            { id: 'name', name: 'Name' },
            { id: 'message', name: 'Message' },
          ]}
          render={({ field: { onChange, value } }) => (
            <DnDList elements={value} onChange={onChange} />
          )}
        />
      </Accordion>
    </div>
  );
};
