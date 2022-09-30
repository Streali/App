import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertElementsList } from '../../components/alert/alert-elements-list/alert-element-list';
import { AlertSettings } from '../../components/alert/alert-settings/alert-settings';
import { Milliseconds } from '../../types/types/custom';
import { AlertEditorContainer } from '../../components/alert/alert-editor-container/alert-editor-container';
import { AlertElementSettings } from '../../components/alert/alert-element-settings/alert-element-settings';
import { defaultTextElementSettings } from '../../utils/alert/default-element-settings';

export const AlertCreate = () => {
  const [settings, setSettings] = useState<{ [x: string]: any }>({
    title: 'Test new alert',
    width: 500,
    height: 500,
    duration: 5000,
  });
  const [elements, setElements] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const { handleSubmit, watch, getValues, control } = useForm();

  const handleDeleteElement = (id: string) => {
    const allElements = [...elements];
    const filterElements = allElements.filter((element) => element.id !== id);
    if (filterElements.length === 0) setSelectedElement(null);
    setElements(filterElements);
  };

  const handleColorChange = (id: string, color: string) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, color };
        }
        return element;
      })
    );
  };

  const handleDurationChange = (id: string, duration: Milliseconds) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, duration };
        }
        return element;
      })
    );
  };

  const handleStartChange = (id: string, startTime: Milliseconds) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, startTime };
        }
        return element;
      })
    );
  };

  useEffect(() => {
    const subscription = watch((value) => setSettings(value));
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10">
        <div className="w-[350px] shrink-0">
          <AlertSettings
            title="New alert"
            control={control}
            addElement={(type) => {
              if (type === 'text') {
                setElements((prev) => [...prev, defaultTextElementSettings()]);
              }
            }}
          />
        </div>
        <div className="flex-1">
          <AlertEditorContainer
            width={settings.width}
            height={settings.height}
            elements={elements}
          />
        </div>
        {selectedElement && (
          <div className="w-[400px] shrink-0">
            <AlertElementSettings
              element={elements.find((element) => element.id === selectedElement)}
              onSettingsChange={(key, settings) => {
                setElements((prev) =>
                  prev.map((element) => {
                    if (element.id === selectedElement) {
                      return {
                        ...element,
                        settings: { ...element.settings, [key]: settings },
                      };
                    }
                    return element;
                  })
                );
              }}
              onTitleChange={(title) => {
                setElements((prev) =>
                  prev.map((element) => {
                    if (element.id === selectedElement) {
                      return { ...element, title };
                    }
                    return element;
                  })
                );
              }}
            />
          </div>
        )}
      </div>
      <div>
        <AlertElementsList
          elements={elements}
          totalTime={settings.duration}
          onDeleteElement={handleDeleteElement}
          onColorChange={handleColorChange}
          onDurationChange={handleDurationChange}
          onStartChange={handleStartChange}
          onElementClick={(id) => {
            console.log(id);
            setSelectedElement(id);
          }}
        />
      </div>
    </div>
  );
};
