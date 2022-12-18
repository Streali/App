import { Control } from 'react-hook-form';
import { Button, ButtonColor } from '~/components/button/button';
import { TabProps, Tabs } from '~/components/tabs/tabs';
import { TabContainer } from './tab-container';
import TabGeneral from './tab-general';
import TabLabel from './tab-label';
import TabValue from './tab-value';

interface LabelSettingsProps {
  className?: string;
  control: Control;
  onSubmit?: () => void;
}

const LabelSettings = (props: LabelSettingsProps) => {
  const { className = '', control, onSubmit } = props;

  const tabs: TabProps[] = [
    { title: 'General', content: <TabGeneral control={control} /> },
    { title: 'Container', content: <TabContainer control={control} /> },
    { title: 'Label', content: <TabLabel control={control} /> },
    { title: 'Value', content: <TabValue control={control} /> },
  ];

  return (
    <div className={className}>
      <form onSubmit={onSubmit}>
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-title text-4xl font-semibold">Create label</h1>
          <Button type="submit" iconLeft="save-line" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
        <Tabs content={tabs} />
      </form>
    </div>
  );
};

export default LabelSettings;
