import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

export function usePreSignFileImportUrl() {
  return useMutation<string, AxiosError, { url: string; fileName: string }>(
    async ({ url, fileName }: { url: string; fileName: string }) => {
      const token = localStorage.getItem("authorization_token");

      const headers = token ? { Authorization: `Basic ${token}` } : undefined;

      return axios
        .get(url, {
          params: {
            name: fileName,
          },
          headers,
        })
        .then((res) => res.data);
    }
  );
}
