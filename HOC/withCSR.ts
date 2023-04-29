import {
  NextApiHandler,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

// Bypass getServerSideProps() call to api if page route change is by nextjs
export const withCSR =
  (next: NextApiHandler) => async (ctx: GetServerSidePropsContext) => {
    // check is it a client side navigation
    const isCSR = ctx.req.url?.startsWith("/_next");

    if (isCSR) {
      return {
        props: {},
      };
    }

    return next?.(ctx.req as NextApiRequest, ctx.res as NextApiResponse);
  };
