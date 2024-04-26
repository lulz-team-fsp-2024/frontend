import type { FetchOptions } from "ofetch";
import HttpFactory from "../factory";
import type { Trip } from "~/types/trip";
import type { PaginatedResult } from "~/types/common/result";

export type GetParameterBag = {
  page: number;
  perPage: number;
};

class TripsModule extends HttpFactory {
  private Resource = "/trips";

  get(params: GetParameterBag) {
    const fetchOptions: FetchOptions<"json"> = {
      query: params,
    };
    return this.call<PaginatedResult<Trip>>(
      "GET",
      this.Resource,
      undefined,
      fetchOptions
    );
  }
}

export default TripsModule;