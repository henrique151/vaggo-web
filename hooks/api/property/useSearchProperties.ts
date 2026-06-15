import { SearchResult } from "@/classes/SearchResult";
import DatePeriod from "@/classes/data/DatePeriod";
import { useState, useEffect, useRef } from "react";
import request from "@/services/api.service";

type stateProps = {
  address: string;
  datePeriod?: DatePeriod;
  cep?: string;
};

type stateReturnProps = [
  result: SearchResult | undefined,
  loading: boolean,
  success: boolean,
];

export function useSearchProperties({
  address,
  datePeriod,
  cep,
}: stateProps): stateReturnProps {
  const [result, setResult] = useState<SearchResult | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Usa ref para rastrear a query anterior e detectar mudanças
  const lastQuery = useRef<string>("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (address) params.set("address", address);

    if (datePeriod) {
      const dateString = datePeriod.toString();
      params.set("startDate", dateString.start);
      params.set("endDate", dateString.end);
    }

    if (cep) params.set("cep", cep);

    const queryString = params.toString();
    const uri = `reservations/search/address${queryString ? `?${queryString}` : ""}`;

    // Se a query não mudou, não refaz a requisição
    if (lastQuery.current === uri) return;
    lastQuery.current = uri;

    // Sem query, não busca
    if (!address && !cep) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setSuccess(false);
      setResult(undefined);

      try {
        const res = await request({
          url: uri,
          useToken: true,
          req: {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        });

        if (cancelled) return;

        if (!res.ok) {
          console.warn("[useSearchProperties] API retornou erro:", res.status);
          setSuccess(false);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (cancelled) return;

        // Protege contra resposta sem dados de origem (endereço não encontrado)
        if (!data || !data.searchOrigin) {
          setSuccess(false);
          setLoading(false);
          return;
        }

        setResult(new SearchResult(data));
        setSuccess(true);
      } catch (err) {
        if (!cancelled) {
          console.error("[useSearchProperties] Erro na busca:", err);
          setSuccess(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [address, cep, datePeriod]);

  return [result, loading, success];
}
