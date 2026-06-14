"use server";

import { AccessTokenClassInterface } from "@interfaces";
import { APIService } from "@services";
import { Spot } from "@classes";
import { map } from "@/mappers/spot.mapper";

export async function getAllAdmin(token: AccessTokenClassInterface) {
  try {
    const res = await APIService.request("admin/spots", token, {
      method: "GET",
    });

    if (res.ok) {
      const { data } = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching admin spots:", error);
  }
  return [];
}

export async function search(token: AccessTokenClassInterface, filters: Record<string, string>) {
  try {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) params.append(key, value);
    }

    const res = await APIService.request(`admin/spots/search?${params.toString()}`, token, {
      method: "GET",
    });

    if (res.ok) {
      const { data } = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Error searching admin spots:", error);
  }
  return [];
}

export async function evaluate(
  token: AccessTokenClassInterface,
  id: number,
  status: string,
  rejectionReason?: string
) {
  try {
    const res = await APIService.request(`admin/spots/${id}/evaluate`, token, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, rejectionReason }),
    });

    return res.ok;
  } catch (error) {
    console.error("Error evaluating spot:", error);
    return false;
  }
}

export async function toggleActive(
  token: AccessTokenClassInterface,
  id: number,
  isActive: boolean
) {
  try {
    const res = await APIService.request(`admin/spots/${id}`, token, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    });

    return res.ok;
  } catch (error) {
    console.error("Error toggling spot active status:", error);
    return false;
  }
}

export async function deleteSpot(
  token: AccessTokenClassInterface,
  id: number
) {
  try {
    const res = await APIService.request(`admin/spots/${id}`, token, {
      method: "DELETE",
    });

    return res.ok;
  } catch (error) {
    console.error("Error deleting spot:", error);
    return false;
  }
}
