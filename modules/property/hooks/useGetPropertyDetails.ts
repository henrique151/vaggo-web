"use client";
import { useEffect, useState } from "react";
import { Property } from "@classes";
import { BrowserService } from "@services";
import { PropertyController } from "@controllers";

export default function useGetPropertyDetails(
  id: number,
  withSpots?: boolean,
): [property: Property, loaded: boolean, refreshSpots: CallableFunction] {
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  // const token = BrowserService.getToken()
  // async function load() {

  // }
  async function refreshSpots(): Promise<void> {
    if (property && withSpots) {
      console.log("refreshing spots...");
      PropertyController.getSpots(BrowserService.getToken(), id).then(
        (spots) => {
          const p = property;
          p.setSpots(spots);
          setProperty(p);
        },
      );
      console.log("looks like they refreshed");
    } else {
      console.log(
        "execution not allowed. Property doesnt exists or withSpots function was not enabled",
      );
    }
  }

  useEffect(() => {
    const load = async () => {
      const data = await PropertyController.get(BrowserService.getToken(), id);
      const p = new Property(data);
      console.log(data);

      if (withSpots) {
        p.setSpots(
          await PropertyController.getSpots(BrowserService.getToken(), id),
        );
      }
      setProperty(p);
      setLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    console.log("property. possibly this migth appear some times");
    console.log(property);
  }, [property]);

  return [property, loaded, refreshSpots];
}
