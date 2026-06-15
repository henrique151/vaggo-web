"use server";
import { AccessTokenClassInterface, ReportClassInterface } from "@interfaces";
import { APIService } from "@services";
import map from "./mappers/report.service.interface.mapper";

export async function register(
  token: AccessTokenClassInterface,
  form: FormData,
): Promise<boolean> {
  try {
    const res = await APIService.request("reports", token, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("[ReportService] Erro ao registrar denúncia:", body);
      return false;
    }

    return true;
  } catch (e) {
    console.error("[ReportService] Exceção ao registrar denúncia:", e);
    return false;
  }
}

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReportClassInterface[]> {
  try {
    const res = await APIService.request("reports/my", token);

    if (!res.ok) {
      console.error("[ReportService] Erro ao buscar denúncias:", res.status);
      return [];
    }

    const { data } = await res.json();
    return data.map(map);
  } catch (e) {
    console.error("[ReportService] Exceção ao buscar denúncias:", e);
    return [];
  }
}

export async function getAll(
  token: AccessTokenClassInterface,
): Promise<ReportClassInterface[]> {
  try {
    const res = await APIService.genericGetRequest(
      token,
      "admin/reports",
      map,
    );
    return res ?? [];
  } catch (e) {
    console.error("[ReportService] Exceção ao buscar todas as denúncias:", e);
    return [];
  }
}

export async function requestReanalysis(
  token: AccessTokenClassInterface,
  id: number,
  description: string
): Promise<boolean> {
  try {
    const res = await APIService.request(`reports/${id}/reanalysis`, token, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("[ReportService] Erro ao solicitar reanálise:", body);
      return false;
    }

    return true;
  } catch (e) {
    console.error("[ReportService] Exceção ao solicitar reanálise:", e);
    return false;
  }
}