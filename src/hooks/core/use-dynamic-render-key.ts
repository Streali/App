export function useDynamicRenderKey(intervalInMs = 1_000 * 60) {
  const [renderKey, setRenderKey] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderKey(Date.now());
    }, intervalInMs);
    return () => clearInterval(interval);
  }, []);

  return {
    renderKey,
  };
}
