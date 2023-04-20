import { useRouter } from "next/router";

export const useCustomRedirect = () => {
  const router = useRouter();

  const customRedirect = (pagePath: string) => {
    router.push(pagePath);
    return;
  };

  return {
    customRedirect,
  };
};
