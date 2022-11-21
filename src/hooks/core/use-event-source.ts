const mercureEndpoint = import.meta.env.VITE_MERCURE_ENDPOINT;

export function useEventSource<T = Record<string, unknown>>({
  onEventReceived,
}: {
  onEventReceived: (data: T) => void;
}) {
  function listen(topics: string[]) {
    const url = new URL(mercureEndpoint);

    for (const topic of topics) {
      url.searchParams.append('topic', topic);
    }

    const eventSource = new EventSource(`${mercureEndpoint}?${url.searchParams.toString()}`);

    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      onEventReceived(data);
    });

    return () => eventSource.close();
  }

  return { listen };
}
