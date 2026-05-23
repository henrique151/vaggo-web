import { Report } from "@/classes/Report";
import { listMyReports } from "@/services/report.service";
import { useEffect, useState } from "react";

export default function useGetMyReports(): [Report[], boolean] {
  const [data, setData] = useState<Report[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const res = await listMyReports();
      if (res) {
        setData(res);
        setLoaded(true);
      }
    };
    load();
  }, []);

  return [data, loaded];
}
