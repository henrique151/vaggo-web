import AccessToken from "@/classes/AccessToken";
import DatePeriod from "@/classes/data/DatePeriod";
import PropertyService from "@/services/property.service";

type getPropertyFlags = {
  withSpots?: boolean;
  withReviews?: boolean;
  withReports?: boolean;
};

export default class PropertyController {
  public static async register(token: AccessToken, form: FormData) {}

  /**
   *
   * Return user-owned properties or somebody's else with an ID provided.
   */
  public static async get(token: AccessToken);
  public static async get(token: AccessToken, flags: getPropertyFlags);
  public static async get(token: AccessToken, id: number);
  public static async get(
    token: AccessToken,
    id: number,
    flags: getPropertyFlags,
  );
  public static async get(
    token: AccessToken,
    idOrFlags?: number | getPropertyFlags,
    flags?: getPropertyFlags,
  ) {
    const id = typeof idOrFlags === "number" ? idOrFlags : undefined;
    const flagsParam = flags ?? (idOrFlags as getPropertyFlags);

    const res = await PropertyService.get(token, id);

    // const spots = flagsParam.withSpots && await PropertyService.getSpots(1)
    // const reviews = flagsParam.withReviews && await ReviewService.get()
    // const reports = flagsParam.withReports && await ReportService.get()

    //get reviews, reports and spots with flags
  }

  // public static async getFromUser(token: AccessToken) {

  // }

  public static async getSpots(id: number) {}

  public static async generateSpots(id: number, form: FormData) {}

  public static async updateSpotStatus(id: number) {}

  public static async deleteSpot(id: number) {}
}
