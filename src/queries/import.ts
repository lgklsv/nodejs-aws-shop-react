import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

export function usePreSignFileImportUrl() {
  return useMutation<string, AxiosError, { url: string; fileName: string }>(
    async ({ url, fileName }: { url: string; fileName: string }) => {
      return axios
        .get(url, {
          params: {
            name: fileName,
          },
          headers: {
            Authorization: `Basic ${localStorage.getItem(
              "authorization_token"
            )}`,
          },
        })
        .then((res) => res.data);
    }
  );
}
