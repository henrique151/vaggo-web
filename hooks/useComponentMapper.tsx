import { useEffect, useMemo, useState } from "react";

export default function useComponentMapper(
  data: any[],
  mapper: (value: any, index: number, array: any[]) => React.ReactNode,
) {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  // const [loaded, setLoaded] = useState(false);

  const mapped = useMemo(() => {
    if (!data || data.length === 0) return [];
    // if (data && mapper && !loaded) {
    return data.map(mapper);
  }, [data, mapper]);

  return mapped;
}
